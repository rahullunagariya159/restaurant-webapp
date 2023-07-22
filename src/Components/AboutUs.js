import {useState, useMemo, useEffect} from 'react';
import EnhancedTable from './Table'
import {useQuery} from '@apollo/client';
import LinesEllipsis from 'react-lines-ellipsis'
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "@material-ui/core/Link";
import {getStoryByRestaurantUrl} from '../graphql/queries';
import LightBoxCell from './Table/LightBoxCell';
import VideoLightBoxCell from './Table/VideoLightBoxCell';
import {useRestaurant} from '../Context/RestaurantContext';
import AddAboutUsStoryItem from "./AddAboutUsStoryItem";
import {useDialog} from "../Context/DialogProvider";
import DialogClose from "./Dialog/DialogClose";
import {getStatusNameFromTag} from "../utils";
import {CUSTOMER_FACING_APP_URL} from "../consts";
import Loading from "./Loading";
import {useMutation} from "@apollo/react-hooks";
import {deleteRestaurantStory} from "../graphql/mutations";
import {toast} from "react-toastify";
import {useCustomEventListener} from "react-custom-events";

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
  topHeading:{

    display:'flex',
    alignItems  :'center',
    "& h3":{
      marginLeft: '5px',
      marginRight : '5px',
    }
  },
  headViewIcon:{
    marginLeft : '5px',
    cursor:'pointer'
  },

});

const AboutUs = () => {
  const limit = 10;
  const classes = useStyles();
  const {restaurant} = useRestaurant();
  const [loading, setLoading] = useState(true)
  const [skipPageReset] = useState(false)
  const [open, setOpen] = useState(false)
  const [modeOfOperation, setModeOfOperation] = useState('add')
  const [itemOnOperation, setItemOnOperation] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [deleting, setDeleting] = useState(false)

  const [openDialog, closeDialog] = useDialog();
  const [deleteRestaurantStoryById] = useMutation(deleteRestaurantStory)

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (restaurant && restaurant.restaurantUrl) {
      reFetchRecords()
    }
  }, [restaurant]);

  useCustomEventListener('story-item-updated', () => {
    reFetchRecords()
  });

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

  const handleClose = () => {
    setOpen(false)
    if (modeOfOperation === 'edit') {
      reFetchRecords()
    }
  }

  const performOperation = (row, operation = 'view') => {
    setItemOnOperation(row)
    setModeOfOperation(operation)
    setOpen(true)
  }

  const deleteItem = async (id) => {
    await deleteMultipleItemHandler([id])
  }
  const deleteMultipleItemHandler = async (ids) => {
    try{
      setDeleting(true)

      const promises = ids.map(id => deleteRestaurantStoryById({
        variables: {
          input: {
            id: id
          }
        }
      }));

      await Promise.all(promises);

      closeDialog()
      reFetchRecords()
      toast.success('Story has been deleted successfully');
    } catch (e) {
      console.log({
        e
      })
      toast.error('Error while deleting the story');

    } finally{
      setDeleting(false)
    }
  }


  const variables = {
    restaurantUrl:restaurant?.restaurantUrl,
    filter: { cityNameSlug: { eq: restaurant?.cityNameSlug } },
    limit: limit,
    nextToken
  }
  // const [fetchItemsByResturantId] = useLazyQuery(getItemsByResturantId, { fetchPolicy: "cache-and-network" });
  const getStoryByRestaurantUrlResponse = useQuery(getStoryByRestaurantUrl, {
    variables,
    onCompleted: (res) => {
      setNextNextToken(res.getStoryByRestaurantURL.nextToken);
      setLoading(false)
    }
  });

  let items = getStoryByRestaurantUrlResponse?.data?.getStoryByRestaurantURL?.items || [];

  const reFetchRecords = () => {
    getStoryByRestaurantUrlResponse.refetch()
  }

  const onItemStatusDropDownChange = (e) => {
    setStatusFilter(e.target.value)
  }
  const ActionCell = ({row}) => {
    return <div style={{minWidth: 150}}>
      <IconButton component={Link} color="primary" aria-label="view"
                  href={`${CUSTOMER_FACING_APP_URL}${row?.original?.restaurant?.cityNameSlug}/${row?.original?.restaurant?.restaurantUrl}/about-us`}
                  target='_blank'>
        <VisibilityIcon/>
      </IconButton>
      <IconButton id="btnEditStory" color="success" aria-label="edit" onClick={() => performOperation(row, 'edit')}>
        <EditIcon/>
      </IconButton>
      <IconButton id="btnDeleteStory" color="error" aria-label="delete"
                  onClick={() => onOpenDeleteConfirmationDialog(`Are you sure you want to delete <b>${row?.values?.title}</b> item`, row.original.id, deleteItem)}>
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
      accessor: 'title',
    },
    {
      Header: "Image/video",
      accessor: 'storyFile',
      Cell: ({value, row}) => {
        const isMediaTypeVideo = row?.original.isMediaTypeVideo;
          // LightBoxCell
          if(isMediaTypeVideo){
            return(<VideoLightBoxCell value={value} row={row} />)
          } else{
            return(<LightBoxCell value={value} row={row} />)
          }

      }
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
      Header: "Action",
      accessor: 'status',
      Cell: ActionCell,
    },
  ], [])

  return (
    <div className={classes.wrap}>
      <div className={classes.topHeading}>
        <h3>Story</h3>
        <Button color='primary' LinkComponent={Link} target='_blank' href={`${CUSTOMER_FACING_APP_URL}${restaurant?.cityNameSlug}/${restaurant?.restaurantUrl}/about-us`} startIcon={<VisibilityIcon />}>View stories</Button>
      </div>
      {
        getStoryByRestaurantUrlResponse.loading && !loading && false &&
        <Loading title={'Loading..Please wait'}/>
      }

      {
        deleting &&
        <Loading title={'Deleting Story... Please wait'}/>
      }

      <div className={classes.wrapperBlock}>
        <EnhancedTable
          id="storiesList"
          columns={columns}
          data={items}
          skipPageReset={skipPageReset}
          setStatusFilter={onItemStatusDropDownChange}
          statusFilter={statusFilter}
          loading={loading}
          AddItem={AddAboutUsStoryItem}
          buttonLabel={'Add Story'}
          handleClose={handleClose}
          deleteMultipleItemHandler={(ids) => onOpenDeleteConfirmationDialog(`Are you sure you want to delete items`, ids, deleteMultipleItemHandler)}
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
          {modeOfOperation.charAt(0).toUpperCase() + modeOfOperation.substr(1).toLowerCase()} Story
          <DialogClose onClose={handleClose}/>
        </DialogTitle>
        <DialogContent>
          {
            `${modeOfOperation}`.toLowerCase() === 'view' || `${modeOfOperation}`.toLowerCase() === 'edit' ?
              <AddAboutUsStoryItem item={itemOnOperation?.original}
                                   modeOfOperation={`${modeOfOperation}`.toLowerCase()} handleClose={handleClose}/> :
              <AddAboutUsStoryItem/>
          }
        </DialogContent>
      </Dialog>

    </div>
  )
}


export default AboutUs;
