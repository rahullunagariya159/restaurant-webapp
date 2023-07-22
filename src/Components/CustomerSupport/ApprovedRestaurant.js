import {useEffect, useMemo, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {searchRestaurants} from "../../graphql/queries";
import {useLazyQuery} from "@apollo/react-hooks"
import {useRestaurant} from "../../Context/RestaurantContext";
import LightBoxCell from "../Table/LightBoxCell";
import LinesEllipsis from "react-lines-ellipsis";
import {makeStyles} from "@material-ui/core/styles";
import EnhancedTable from "../Table";
import {useCustomEventListener} from "react-custom-events";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogClose from "../Dialog/DialogClose";
import {useDialog} from "../../Context/DialogProvider";
import AddMenuItem from "../AddMenuItem";
import Rewards from 'Components/Rewards';
import AddRewards from '../AddRewards';
import ActionCell from './ActionCell';

const useStyles = makeStyles((theme) => ({
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
  btnActionContainer:{
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

function ApprovedRestaurant() {
  const limit = 10;
  const classes = useStyles();
  let location = useLocation()
  const {userdetails,reFetchRestaurant} = useRestaurant();
  const [data, setData] = useState([]);
  const [loading, setLoadings] = useState(true);
  const customerServiceRepInput = (userdetails?.customerServiceRep?.items && userdetails?.customerServiceRep?.items[0]) || {
    approvedRestaurants: [],
  }

  const [getRestaurantByIds] = useLazyQuery(searchRestaurants)
  const [open, setOpen] = useState(false)
  const [openDialog, closeDialog] = useDialog();
  const [itemOnOperation, setItemOnOperation] = useState('')
  const [rewards, setRewards] = useState(false);
  const [addRewards, setAddRewards] = useState(false);

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);

  const getRestaurants = async () => {
    try {

      const customerServiceRepRestaurants = customerServiceRepInput.approvedRestaurants || [];
      if(customerServiceRepRestaurants && customerServiceRepRestaurants.length){
        const filter = customerServiceRepRestaurants.map(id => {
          return {id: {eq: id}}
        })
        if(customerServiceRepRestaurants?.length > 0)
        {
          const {data} = await getRestaurantByIds({
            variables: {
              "filter": { or: filter },
              limit: limit,
              nextToken,
            }
          })
          setNextNextToken(data.searchRestaurants.nextToken);
          const items = data?.searchRestaurants?.items || [];
          setData(items)
        }
      } else {
        setData([])
      }

    } catch (e) {
      console.log(e, {
        e
      })
    } finally {
      setLoadings(false)
    }
  }

  useEffect(() => {
    reFetchRestaurant()
    getRestaurants()
  }, [location]);

  useEffect(() => {
    getRestaurants();
  },[nextToken])

  const performOperation = (row, operation = 'view') => {
    setItemOnOperation(row);
    setOpen(true);
  }

  const viewRewardsbutton = (row) => {
    setItemOnOperation(row);
    setOpen(true);
    setRewards(true);
  }

  const addRewardsbutton = (row) => {
    setItemOnOperation(row);
    setOpen(true);
    setAddRewards(true);
  }

  const handleClose = () => {
    console.log("handle close");
    setOpen(false)
  }
  const handlerewardspopupClose = () => {
    setOpen(false);
    setRewards(false);
    setAddRewards(false);
  }

  const gotonext = () => {
    setPreviousTokens((prev) => [...prev, nextToken]);
    setNextToken(nextNextToken);
    setNextNextToken(null);
    setPage(page + 1);
    setLoadings(true);
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
      accessor: 'file',
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
      Header: "Action",
      accessor: 'status',
      Cell: ({ value,row }) => {
        return (
          <ActionCell
              performOperation = {() => performOperation(row)}
              addRewardsbutton = {() => addRewardsbutton(row)}
              viewRewardsbutton = {() => viewRewardsbutton(row)}
              row={row}
          />
        )
      },
    }
  ], [])

  useCustomEventListener('restaurant-approved', data => {
    reFetchRestaurant()
  });

  return (
    <div className={classes.wrap}>
      <h3>Approved Restaurant</h3>
      <div className={classes.wrapperBlock}>
        <EnhancedTable
          id="approvedRestaurantList"
          columns={columns}
          data={data}
          skipPageReset={false}
          showDropDownFilter={false}
          loading={loading}
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
        maxWidth={(rewards) ? false : "md" }
      >
        <DialogTitle id="form-dialog-title">
          {(rewards || addRewards) ? 'Add Rewards' :'Add Card'}
          <DialogClose onClose={() =>
            {(rewards || addRewards) ? handlerewardspopupClose() : handleClose()}}/>
        </DialogTitle>
        <DialogContent>
          {rewards ? (
            <Rewards restaurantDetails={itemOnOperation?.original}/>
          ) :
          addRewards ? (<AddRewards restaurantDetails={itemOnOperation?.original} handleClose={handlerewardspopupClose}/>) : (
               <AddMenuItem item={itemOnOperation?.original} handleClose={handleClose} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApprovedRestaurant;

