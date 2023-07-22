import {useEffect, useMemo, useState} from 'react'
import {searchRestaurants} from "../../graphql/queries";
import {useLazyQuery} from "@apollo/react-hooks"
import {useRestaurant} from "../../Context/RestaurantContext";
import LightBoxCell from "../Table/LightBoxCell";
import LinesEllipsis from "react-lines-ellipsis";
import {makeStyles} from "@material-ui/core/styles";
import EnhancedTable from "../Table";

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

function Restaurant() {
  const limit = 10;
  const classes = useStyles();
  const {userdetails} = useRestaurant();
  const [data, setData] = useState([]);
  const [loading, setLoadings] = useState(true);

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);

  const photographerInput = (userdetails?.photographer?.items && userdetails?.photographer?.items[0]) || {
    photographedRestaurants: [],
    uploadedBulkImages: []
  }

  const [getRestaurantByIds] = useLazyQuery(searchRestaurants)

  const getRestaurants = async () => {
    try {

      const photographedRestaurants = photographerInput.photographedRestaurants || [];
      const filter = photographedRestaurants.map(id => {
        return {id: {eq: id}}
      })

      if(photographedRestaurants?.length > 0)
      {
        const {data} = await getRestaurantByIds({
          variables: {
            "filter": { or: filter },
            limit: limit,
            nextToken:nextToken,
          }
        })
        setNextNextToken(data.searchRestaurants.nextToken);
        const items = data?.searchRestaurants?.items || [];
        setData(items)
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
    getRestaurants()
  }, [photographerInput.photographedRestaurants,nextToken]);

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

  const ActionCell = ({value, row}) => {
    return <div style={{minWidth: 120}}></div>
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
      Header: "",
      accessor: 'status',
      Cell: ActionCell,
    },
    {
      Header: "",
      accessor: 'data',
      Cell: ActionCell,
    },
  ], [])


  return (
    <div className={classes.wrap}>
      <h3>Restaurants</h3>
      <div className={classes.wrapperBlock}>
        <EnhancedTable
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
    </div>
  );
}

export default Restaurant;
