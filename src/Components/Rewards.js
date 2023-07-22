import {useEffect, useMemo, useState} from 'react';
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
import {getRewardsByRestaurantId} from '../graphql/queries';
import MessageBox from './MessageBox';
import {useRestaurant} from '../Context/RestaurantContext';
import {useDialog} from "../Context/DialogProvider";
import DialogClose from "./Dialog/DialogClose";
import Loading from "./Loading";
import {useMutation} from "@apollo/react-hooks";
import {deleteRewardsById} from "../graphql/mutations";
import {useCustomEventListener} from "react-custom-events";
import {toast} from "react-toastify";
import AddRewards from "./AddRewards";
import LightBoxCell from './Table/LightBoxCell';
import { Typography } from '@material-ui/core';
import format from "date-fns/format";
import CopyToClipboard from "react-copy-to-clipboard"

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
  },
  editurl: {
    cursor: "pointer",
    '&:hover': {
      color:'#4a4acf',
    }
  }
});

const Rewards = ({restaurantDetails}) => {
  const limit = 10;
  const classes = useStyles();
  const {userdetails, restaurant, setRestaurant} = useRestaurant();
  let id = userdetails.restaurantContact;
  const [loading, setLoading] = useState(true)
  const [skipPageReset] = useState(false)
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [modeOfOperation, setModeOfOperation] = useState('add')
  const [itemOnOperation, setItemOnOperation] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [openDialog, closeDialog] = useDialog();
  const [deleteRewardById] = useMutation(deleteRewardsById)

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
      await deleteRewardById({
        variables: {
          input : { id: id}
        }
      })
      closeDialog()
      reFetchRecords()
      toast.success('Rewards has been deleted successfully');
    } catch (e) {
      toast.error('Error while deleting the Item');
    } finally {
      setDeleting(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (restaurantDetails?.id) {
      setRestaurant(restaurantDetails);
    }
  }, [restaurantDetails]);

  useCustomEventListener('new-reward-created', data => {
    reFetchRecords(data)
  });

  const performOperation = (row, operation = 'view') => {
    setItemOnOperation(row)
    setModeOfOperation(operation)
    setOpen(true)
  }

  const [showmessage, setShowmessage] = useState(false);
  const rewardsVariables = {
    restaurantID: restaurant?.id,
    limit: limit,
    nextToken
  }

  const getRewardsByRestaurantIdResponse = useQuery(getRewardsByRestaurantId, {
    variables: rewardsVariables,
    onCompleted: (res) => {
      setNextNextToken(res.getRewardsByRestaurantId.nextToken);
      setLoading(false)
    }
  });

  let items = getRewardsByRestaurantIdResponse?.data?.getRewardsByRestaurantId?.items || [];

  const reFetchRecords = (id) => {
    const rewardsInputVar = {
      restaurantID: id?.data ||restaurant?.id
    };
    getRewardsByRestaurantIdResponse.refetch && getRewardsByRestaurantIdResponse.refetch(rewardsInputVar)
  }

  useEffect(() => {
    if (restaurant && restaurant.id) {
      reFetchRecords()
    }
  }, [restaurant]);

  const onItemStatusDropDownChange = (e) => {
    setStatusFilter(e.target.value)
  }

  const deleteMultipleItemHandler = async (ids) => {
    try {
      setDeleting(true)

      const promises = ids.map(id => deleteRewardById({
        variables: {
          input : { id: id }
        }
      }));

      let deleteAll = await Promise.all(promises);

      closeDialog()
      reFetchRecords()
      toast.success('Rewards has been deleted successfully');
    } catch (e) {
      console.log({
        e
      })

    } finally {
      setDeleting(false)
    }
  }

  const onCopy = (e) => {
		toast.success("Promo url copied to clipboard", { position: "top-right" })
  };

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

  const ActionCell = ({value, row}) => {

    return <div style={{minWidth: 150}}>
      <IconButton id="btnEditReward" color="success" aria-label="edit" onClick={() => performOperation(row, 'edit')}>
        <EditIcon/>
      </IconButton>
      <IconButton
        id="btnDeleteReward"
        color="error" aria-label="delete"
        onClick={() => onOpenDeleteConfirmationDialog(`Are you sure you want to delete <b>${row?.values?.name}</b> item`, row.original.id, deleteItem)}>
        <DeleteIcon/>
      </IconButton>
    </div>
  }

const handleDateFormat = (date) => {
  return format(new Date(date),"dd/MM/yyyy")
}

  const columns = useMemo(() => [
    {
      Header: "Reward title",
      accessor: 'name',
      Cell:({value}) => {return  <Typography variant='body'>{value || "-"}</Typography>}
    },
    {
      Header: "Reward Availablity",
      accessor: 'radiusAvailableMiles',
      Cell:({value}) => {return  <Typography variant='body'>{value > 0 ? `Available to Everyone ${value} Miles` : "Available to restaurant followers"}</Typography>}
    },
    {
      Header: "Start date(dd/mm/yyyy)",
      accessor: 'startDate',
      Cell:({value}) => {
        return  <Typography variant='body'>{handleDateFormat(value)}</Typography>}
    },
    {
      Header: "Expiration date(dd/mm/yyyy)",
      accessor: 'expirationDate',
      Cell:({value}) => {
        return  <Typography variant='body'>{handleDateFormat(value)}</Typography>}
    },
    {
      Header: "Number of rewards",
      accessor: 'maxRewardsAvailable',
      Cell:({value}) => {return  <Typography variant='body'>{value || "-"}</Typography>}
    },
    {
      Header: "Promo Code",
      accessor: 'promoCode',
      Cell:({value}) => {
        return  <Typography variant='body'>{value || "-"}</Typography>}
    },
    {
      Header: "Promo URL",
      accessor: 'promoUrl',
      Cell: ({ value }) => {
        return <div>
          {value ? (
            <CopyToClipboard text={`${value}`} className={classes.editurl}>
              <Typography variant='body' onClick={onCopy}>
                      {value}
              </Typography>
            </CopyToClipboard>
          ) : (
            <Typography variant='body'>
                {"-"}
            </Typography>
          )}
        </div>
      }
    },
    {
      Header: "Image",
      accessor: 'file',
      Cell:({value,row}) => <LightBoxCell value={[value]} row={row} />
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
      <h3>Rewards</h3>
      {
        deleting &&
        <Loading title={'Deleting Items... Please wait'}/>
      }

      <div className={classes.wrapperBlock}>
        <EnhancedTable
          id="rewardsList"
          columns={columns}
          data={items}
          skipPageReset={skipPageReset}
          setStatusFilter={onItemStatusDropDownChange}
          statusFilter={statusFilter}
          loading={loading}
          AddItem={AddRewards}
          // deleteMultipleItemHandler={deleteMultipleItemHandler}
          deleteMultipleItemHandler={(ids) => onOpenDeleteConfirmationDialog(`Are you sure you want to delete items`, ids, deleteMultipleItemHandler)}
          handleClose={handleClose}
          buttonLabel="Add Rewards"
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
          {modeOfOperation.charAt(0).toUpperCase() + modeOfOperation.substr(1).toLowerCase()} Reward
          <DialogClose onClose={handleClose}/>
        </DialogTitle>
        <DialogContent>
          {
              <AddRewards existingRewards={itemOnOperation?.original} modeOfOperation={modeOfOperation}
              handleClose={handleClose} />
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default Rewards;
