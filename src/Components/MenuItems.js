import {useState, useMemo} from 'react';
import EnhancedTable from './Table'
import {useQuery} from '@apollo/client';
import LinesEllipsis from 'react-lines-ellipsis'
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Chip from "@material-ui/core/Chip";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { getCardsByResturantId } from '../graphql/queries';
import MessageBox from './MessageBox';
import LightBoxCell from './Table/LightBoxCell';
import {useRestaurant} from '../Context/RestaurantContext';
import FormComponent from "./FormComponent";
import AddMenuItem from "./AddMenuItem";
import {useDialog} from "../Context/DialogProvider";
import DialogClose from "./Dialog/DialogClose";
import {getStatusNameFromTag} from "../utils";
import {CF_URL} from "../consts";
import Loading from "./Loading";
import {useMutation} from "@apollo/react-hooks";
import {deleteCardPoint} from "../graphql/mutations";
import {useCustomEventListener} from "react-custom-events";
import {toast} from "react-toastify";

const useStyles = makeStyles({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
  },
  wrapperBlock: {
    display: 'inline-block',
    gridTemplateColumns: 'auto auto auto'
  },
  APPROVED: {
    background: 'rgb(102, 187, 106)',
    color: 'white'
  },
  DISABLE: {
    background: 'red',
    color: 'white'
  },
  PENDING: {
    background: '#f29700'
  }
});

const MenuItems = () => {
  const limit = 10;
  const classes = useStyles();
  const { userdetails } = useRestaurant();
  let id = userdetails.restaurantContact;
  const [loading, setLoading] = useState(true)
  const [skipPageReset] = useState(false)
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [modeOfOperation, setModeOfOperation] = useState('add')
  const [itemOnOperation, setItemOnOperation] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [openDialog, closeDialog] = useDialog();
  const [deleteCardPointById] = useMutation(deleteCardPoint)

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);

  const onOpenDeleteConfirmationDialog = (title, id, onDeleteItem) => {
    openDialog({
      children: (
        <>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <div dangerouslySetInnerHTML={{__html: title}}></div>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => closeDialog()}>
              Cancel
            </Button>
            <Button color="primary" disabled={deleting} onClick={() => onDeleteItem(id)}>
              Sure
            </Button>
          </DialogActions>
        </>
      )
    });
  };

  const deleteItem = async (id) => {
    try{
      setDeleting(true)
      await deleteCardPointById({
        variables: {
          input: {
            id: id
          }
        }
      })
      closeDialog()
      reFetchRecords()
      toast.success('Item has been deleted successfully');
    } catch (e) {
      toast.error('Error while deleting the Item');
    } finally {
      setDeleting(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useCustomEventListener('approved-item-updated', data => {
    reFetchRecords()
  });

  useCustomEventListener('new-pending-item-added', data => {
    reFetchRecords()
  });

  const performOperation = (row, operation = 'view') => {
    setItemOnOperation(row)
    setModeOfOperation(operation)
    setOpen(true)
  }

  const [showmessage, setShowmessage] = useState(false);
  const getCardsByRestaurantIdResponse = useQuery(getCardsByResturantId, {
    variables: {
      restaurantID: id,
      limit: limit,
      nextToken,
    },
    onCompleted: (res) => {
      setNextNextToken(res.getCardsByResturantId.nextToken);
      setLoading(false)
    }
  });

  let items = getCardsByRestaurantIdResponse?.data?.getCardsByResturantId?.items || [];

  const reFetchRecords = () => {
    getCardsByRestaurantIdResponse.refetch && getCardsByRestaurantIdResponse.refetch({id: id})
  }

  const onItemStatusDropDownChange = (e) => {
    setStatusFilter(e.target.value)
  }

  const deleteMultipleItemHandler = async (ids) => {
    try{
      setDeleting(true)

      const promises = ids.map(id => deleteCardPointById({
        variables: {
          input: {
            id: id
          }
        }
      }));

      await Promise.all(promises);

      closeDialog()
      reFetchRecords()
    } catch (e) {
      console.log({
        e
      })

    } finally{
      setDeleting(false)
    }
  }

  const ActionCell = ({value, row}) => {
    return <div style={{minWidth: 150}}>
      <IconButton color="primary" aria-label="view" onClick={() => performOperation(row, 'view')}>
        <VisibilityIcon/>
      </IconButton>
      <IconButton color="success" id="btnEditMenuItem" ria-label="edit" onClick={() => performOperation(row, 'edit')}>
        <EditIcon/>
      </IconButton>
      <IconButton
        id="btnDeleteMenuItem"
        color="error" aria-label="delete"
        onClick={() => onOpenDeleteConfirmationDialog(`Are you sure you want to delete <b>${row?.values?.name}</b> item`, row.original.id, deleteItem)}>
        <DeleteIcon/>
      </IconButton>
    </div>
  }

  items = items.filter(item => {

    if (statusFilter.toLowerCase() === 'all') {
      return true;
    }

    return item.isApproved === getStatusNameFromTag(statusFilter);
  })

  const gotonext = () => {
    setPreviousTokens((prev) => [...prev, nextToken]);
    setNextToken(nextNextToken);
    setNextNextToken(null);
    setLoading(true);
    setPage(page + 1);
  };

  const gotoPrev = () => {
    setNextToken(previousTokens.pop());
    setPreviousTokens([...previousTokens]);
    setNextNextToken(null);
    setPage(page - 1);
  };

  const handlePageChange = (page) => {
    if (page === 'nextButton') {
      gotonext();
    }else {
      gotoPrev();
    }
  }

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
      imgAccessor: "picture",
      emailAccessor: "email",
    },
    {
      Header: "Image",
      accessor: 'cardPointFile',
      Cell: LightBoxCell
    },
    {
      Header: "Description",
      accessor: 'description',
      Cell: ({value}) => {
        return (
          <LinesEllipsis
            text={value}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        )
      }
    },
    {
      Header: "Delivery",
      accessor: 'orderOptionUrls',
      Cell: ({value}) => {
        return (
          <div style={{width: 200}}>
            {value.filter(image => image?.file?.key).map(image => {
              return (
                <a href={image?.url} target="_blank">
                  <img src={`${CF_URL}/${image?.file?.key}`} style={{width: 40, padding: 5}} alt={image?.name}/>
                </a>
              )
            })}
          </div>
        )
      }
    },
    {
      Header: "Price",
      accessor: 'price',
      Cell: props => <div> ${props.value} </div>
    },
    {
      Header: "Status",
      accessor: 'isApproved',
      Cell: () => {
        return (
          <Chip className={classes.APPROVED} color="success" label="Active"> </Chip>
        )
      }
    },
    {
      Header: "Action",
      accessor: 'status',
      Cell: ActionCell,
    },
  ], [])

  return (
    <div className={classes.wrap}>
      {
        showmessage && <MessageBox content={"Requested to Disable Item"} action={() => setShowmessage(false)}/>
      }
      <h3>Menu Items</h3>
      {
        getCardsByRestaurantIdResponse.loading && !loading && false &&
        <Loading title={'Loading..Please wait'}/>
      }
      {
        deleting &&
        <Loading title={'Deleting Items... Please wait'}/>
      }

      <div className={classes.wrapperBlock}>
        <EnhancedTable
           id="listMenuItems"
          columns={columns}
          data={items}
          skipPageReset={skipPageReset}
          setStatusFilter={onItemStatusDropDownChange}
          statusFilter={statusFilter}
          loading={loading}
          AddItem={AddMenuItem}
          // deleteMultipleItemHandler={deleteMultipleItemHandler}
          deleteMultipleItemHandler={(ids) => onOpenDeleteConfirmationDialog(`Are you sure you want to delete items`, ids, deleteMultipleItemHandler)}
          handleClose={handleClose}
          handlePageChange={handlePageChange}
          Currentpage={page}
          nextPage={!nextNextToken}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
          {modeOfOperation.charAt(0).toUpperCase() + modeOfOperation.substr(1).toLowerCase()} Item
          <DialogClose onClose={handleClose}/>
        </DialogTitle>
        <DialogContent>
          {
            `${modeOfOperation}`.toLowerCase() === 'view' || `${modeOfOperation}`.toLowerCase() === 'edit' ?
              <FormComponent item={itemOnOperation?.original} modeOfOperation={modeOfOperation} handleClose={handleClose} /> :
              <AddMenuItem/>
          }
        </DialogContent>
      </Dialog>

    </div>
  )
}


export default MenuItems;
