import {useState, useMemo} from 'react';
import EnhancedTable from './Table'
import {useQuery} from '@apollo/client';
import LinesEllipsis from 'react-lines-ellipsis'
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Chip from "@material-ui/core/Chip";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {getItemsByResturantId} from '../graphql/queries';
import MessageBox from './MessageBox';
import LightBoxCell from './Table/LightBoxCell';
import {useRestaurant} from '../Context/RestaurantContext';
import ViewPendingItem from "./ViewPendingItem";
import DialogClose from "./Dialog/DialogClose";
import {getTagNameFromStatus} from "../utils";
import AddMenuItem from "./AddMenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDialog} from "../Context/DialogProvider";
import Loading from "./Loading";
import {useMutation} from "@apollo/react-hooks";
import { useCustomEventListener } from 'react-custom-events';
import {deleteUnapprovedItem} from "../graphql/mutations";
import {toast} from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CUSTOMER_FACING_APP_URL} from "../consts";

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
  const classes = useStyles();
  const {userdetails,restaurant} = useRestaurant();
  let id = userdetails.restaurantContact;
  const [skipPageReset] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [open, setOpen] = useState(false)
  const [itemOnOperation, setItemOnOperation] = useState()

  const [openDialog, closeDialog] = useDialog();
  const [deleteCardPointById] = useMutation(deleteUnapprovedItem)

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
            <Button color="primary" onClick={() => onDeleteItem(id)}>
              Sure
            </Button>
          </DialogActions>
        </>
      )
    });
  };

  const handleClose = () => {
    setOpen(false)
  }

  const performOperation = (row) => {
    setItemOnOperation(row)
    setOpen(true)
  }

  // const [items, setItems] = useState([]);
  const [showmessage, setShowmessage] = useState(false);
  // const [fetchItemsByResturantId] = useLazyQuery(getItemsByResturantId, { fetchPolicy: "cache-and-network" });
  const getItemsByResturantIdResponse = useQuery(getItemsByResturantId, {
    variables: {
      restaurantID: id,
      "filter": {
        "isApproved": {
          "eq": "PENDING"
        }
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  });
  const items = getItemsByResturantIdResponse?.data?.getItemsByResturantId?.items || []

  const reFetchRecords = () => {
    getItemsByResturantIdResponse.refetch && getItemsByResturantIdResponse.refetch({restaurantID: id})
  }

  const deleteItem = async (id) => {
    await deleteMultipleItemHandler([id])
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
      toast.success('Menu items has been deleted successfully');
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

  const onCopy = (e) => {
		toast.success("Card profile url copied to clipboard", { position: "top-right" })
	};

  const ActionCell = ({value, row}) => {
    return <div style={{minWidth: 150}}>
      <IconButton color="primary" aria-label="view" onClick={onCopy}>
        <CopyToClipboard text={`${CUSTOMER_FACING_APP_URL}${restaurant?.cityNameSlug}/${restaurant?.restaurantUrl}/items/${row?.original?.id}`}>
            <ContentCopyIcon color="primary" />
        </CopyToClipboard>
      </IconButton>
      <IconButton color="primary" aria-label="view" onClick={() => performOperation(row, 'view')}>
        <VisibilityIcon/>
      </IconButton>
      <IconButton
        id="btnDeletePendingMenuItem"
        color="error" aria-label="delete"
        onClick={() => onOpenDeleteConfirmationDialog(`Are you sure you want to delete <b>${row?.values?.name}</b> item`, row.original.id, deleteItem)}>
        <DeleteIcon/>
      </IconButton>
    </div>
  }

  useCustomEventListener('new-pending-item-added', data => {
    reFetchRecords()
  });

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
      imgAccessor: "picture",
      emailAccessor: "email",
    },
    {
      Header: "Image",
      accessor: 'picture',
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
      Header: "Price",
      accessor: 'price',
    },
    {
      Header: "Status",
      accessor: 'isApproved',
      Cell: ({value}) => {
        return (
          <Chip label={getTagNameFromStatus(value)} className={classes[value]} color="success"></Chip>
        )
      }
    },
    {
      Header: "Action",
      accessor: 'status',
      Cell: ActionCell,
    },
  ], [])

  if (showmessage) {
    return <MessageBox content={"Requested to Disable Item"}
                       action={() => setShowmessage(false)}
    />
  }

  return (
    <div className={classes.wrap}>
      <h3>Pending Menu Items</h3>
      {
        deleting &&
        <Loading title={'Deleting Items... Please wait'}/>
      }

      <div className={classes.wrapperBlock}>
        <EnhancedTable
          id="pendingMenuItemsList"
          columns={columns}
          data={items}
          skipPageReset={skipPageReset}
          showDropDownFilter={false}
          loading={loading}
          AddItem={AddMenuItem}
          deleteMultipleItemHandler={(ids) => onOpenDeleteConfirmationDialog(`Are you sure you want to delete items`, ids, deleteMultipleItemHandler)}
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
          View Pending Item
          <DialogClose onClose={handleClose}/>
        </DialogTitle>
        <DialogContent>
          <ViewPendingItem item={itemOnOperation?.original} modeOfOperation={'view'}/>
        </DialogContent>
      </Dialog>

    </div>
  )
}


export default MenuItems;
