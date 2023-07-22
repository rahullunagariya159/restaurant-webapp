import { useEffect,useMemo, useState} from 'react';
import EnhancedTable from './Table'
import {useQuery} from '@apollo/client';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {listRestaurantCustomMenus} from '../graphql/queries';
import MessageBox from './MessageBox';
import {useRestaurant} from '../Context/RestaurantContext';
import AddCustomMenuItem from "./AddCustomMenuItem";
import {useDialog} from "../Context/DialogProvider";
import DialogClose from "./Dialog/DialogClose";
import {CUSTOMER_FACING_APP_URL} from "../consts";
import Loading from "./Loading";
import {useMutation} from "@apollo/react-hooks";
import {deleteRestaurantCustomMenu} from "../graphql/mutations";
import {useCustomEventListener} from "react-custom-events";
import {toast} from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LightBoxCell from './Table/LightBoxCell';
import Typography from '@material-ui/core/Typography';

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
  },
  customUrlText : {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  }
});

const CustomMenu = () => {
  const limit = 10;
  const classes = useStyles();
  const {userdetails, restaurant} = useRestaurant();
  let id = userdetails.restaurantContact;
  const [loading, setLoading] = useState(true)
  const [skipPageReset] = useState(false)
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [modeOfOperation, setModeOfOperation] = useState('add')
  const [itemOnOperation, setItemOnOperation] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [nextToken, setNextToken] = useState(null);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, closeDialog] = useDialog();
  const [deleteRestaurantCustomMenuById] = useMutation(deleteRestaurantCustomMenu)

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
            <Button id="btnConfDelete" color="primary" disabled={deleting} onClick={() => onDeleteItem(id)}>
              Sure
            </Button>
          </DialogActions>
        </>
      )
    });
  };

  const deleteItem = async (id) => {
    try {
      setDeleting(true)
      await deleteRestaurantCustomMenuById({
        variables: {
          input: {
            id: id
          }
        }
      })
      closeDialog()
      reFetchRecords()
      toast.success('Menu has been deleted successfully');
    } catch (e) {
      toast.error('Error while deleting the Item');
    } finally {
      setDeleting(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useCustomEventListener('custom-menu-updated', data => {
    reFetchRecords()
  });


  const performOperation = (row, operation = 'view') => {
    setItemOnOperation(row)
    setModeOfOperation(operation)
    setOpen(true)
  }

  const [showmessage, setShowmessage] = useState(false);

  const customMenuVariables = {
    filter: {
      restaurantID: {eq: restaurant?.id},
    },
    limit: limit,
    nextToken
  }
  const getCustomMenuCardsByRestaurantIdResponse = useQuery(listRestaurantCustomMenus, {
    variables: customMenuVariables,
    onCompleted: ({listRestaurantCustomMenus}) => {
      setNextNextToken(listRestaurantCustomMenus.nextToken);
      setLoading(false)
    }
  });

  let items = getCustomMenuCardsByRestaurantIdResponse?.data?.listRestaurantCustomMenus?.items || [];
  const reFetchRecords = () => {
    getCustomMenuCardsByRestaurantIdResponse.refetch && getCustomMenuCardsByRestaurantIdResponse.refetch({
      customMenuVariables
    })
  }

  useEffect(() => {
    if (restaurant && restaurant.id) {
      reFetchRecords()
    }
  }, [restaurant]);

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

  const onItemStatusDropDownChange = (e) => {
    setStatusFilter(e.target.value)
  }

  const handlePageChange = (page) => {
    if (page === 'nextButton') {
      gotonext();
    }else {
      gotoPrev();
    }
  }

  const deleteMultipleItemHandler = async (ids) => {
    try {
      setDeleting(true)

      const promises = ids.map(id => deleteRestaurantCustomMenuById({
        variables: {
          input: {
            id: id
          }
        }
      }));

      let deleteAll = await Promise.all(promises);

      closeDialog()
      reFetchRecords()
    } catch (e) {
      console.log({
        e
      })

    } finally {
      setDeleting(false)
    }
  }

  const onCopy = (e) => {
		toast.success("Menu url copied to clipboard", { position: "top-right" })
	};

  const ActionCell = ({value, row}) => {

    return <div style={{minWidth: 150}}>
      <IconButton color="primary" aria-label="view" onClick={onCopy}>
        <CopyToClipboard text={`${CUSTOMER_FACING_APP_URL}${row?.original?.cityNameSlug}/${row?.original?.restaurantUrl}/${row?.original?.customMenuUrl}`}>
            <ContentCopyIcon color="primary" />
        </CopyToClipboard>
      </IconButton>
      <IconButton id="btnEditCustomMenu" color="success" aria-label="edit" onClick={() => performOperation(row, 'edit')}>
        <EditIcon/>
      </IconButton>
      <IconButton
        id="btnDeleteCustomMenu"
        color="error" aria-label="delete"
        onClick={() => onOpenDeleteConfirmationDialog(`Are you sure you want to delete <b>${row?.values?.customMenuName}</b> item`, row.original.id, deleteItem)}>
        <DeleteIcon/>
      </IconButton>
    </div>
  }


  const columns = useMemo(() => [
    {
      Header: "Menu Name",
      accessor: 'customMenuName',
    },
    {
      Header: "Image",
      accessor: 'cards.items',
      Cell:({value}) => {
        const valueCardItems  = [];
        const rowCardItems = [];
        value.map((item) => {
          valueCardItems.push(item?.cardPoint?.cardPointFile[0])
          rowCardItems.push(item?.cardPoint)
        })
        return (
          <LightBoxCell value={valueCardItems} row={rowCardItems} />
        )
      },
    },
    {
      Header: "Total Cards",
      accessor: 'cards',
      Cell:({value}) => {
          return (
            <Typography variant="body2">
              {value?.items?.length}
            </Typography>
          )
      }
    },
    {
      Header: "Menu URL",
      accessor: 'customMenuUrl',
      Cell:({value,row}) => {
        return (
            <Typography variant="body2" className={classes.customUrlText}>
                  {CUSTOMER_FACING_APP_URL}{row?.original?.cityNameSlug}/{row?.original?.restaurantUrl}/{row?.original?.customMenuUrl}
            </Typography>
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
      <h3>Custom Menu</h3>
      {
        deleting &&
        <Loading title={'Deleting Items... Please wait'}/>
      }

      <div className={classes.wrapperBlock}>
        <EnhancedTable
          id="customMenuList"
          columns={columns}
          data={items}
          skipPageReset={skipPageReset}
          setStatusFilter={onItemStatusDropDownChange}
          statusFilter={statusFilter}
          loading={loading}
          AddItem={AddCustomMenuItem}
          // deleteMultipleItemHandler={deleteMultipleItemHandler}
          deleteMultipleItemHandler={(ids) => onOpenDeleteConfirmationDialog(`Are you sure you want to delete items`, ids, deleteMultipleItemHandler)}
          handleClose={handleClose}
          buttonLabel="Add Custom menu"
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
              <AddCustomMenuItem  customMenuItem={itemOnOperation?.original} modeOfOperation={modeOfOperation}
              handleClose={handleClose} />
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default CustomMenu;
