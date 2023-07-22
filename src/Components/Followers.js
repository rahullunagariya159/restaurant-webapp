import React,{useState} from "react";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { red } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useQuery } from "@apollo/client";
import { listRestaurantFollowers } from "../graphql/queries";
import {useRestaurant} from '../Context/RestaurantContext';
import Loading from "./Loading";
import { CF_URL } from 'consts';

const useStyles = makeStyles({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
  },
  wrapperBlock: {
    display: "inline-block",
    gridTemplateColumns: "auto auto auto",
  },
  cardGrid: {
    padding: "8px",
  },
});

const Followers = () => {
  const {userdetails} = useRestaurant();
  let id = userdetails.restaurantContact;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const getListRestaurantFollowers = useQuery(listRestaurantFollowers, {
    variables: {
      filter: { restaurantID: { eq: id } }
    },
    onCompleted: () => {
      setLoading(false)
    },
    onError: (e) => {
      console.log({"---->>> e":e})
      setLoading(false);
    }
  });

  let items = getListRestaurantFollowers?.data?.listRestaurantFollowers?.items || [];

  const reFetchRecords = () => {
    getListRestaurantFollowers.refetch && getListRestaurantFollowers.refetch({id: id})
  }

  const followersList = () => {
    return (
      <Grid container>
        {items?.length > 0 && items?.map((item) => {
          const name = (item?.userProfile?.firstname + " " + item?.userProfile?.lastname) || "";
          return (
            <Grid key={item?.restaurantID} item xs={12} className={classes.cardGrid} sm={6} md={3} lg={2}>
              <Card sx={{ maxWidth: 445 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={name}
                      sx={{ bgcolor: red[500] }}
                      src={`${CF_URL}/${item?.file?.key}`}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title={name}
                  subheader={item?.userProfile?.email || ""}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div className={classes.wrap}>
      {loading  && <Loading title={'Loading..Please wait'}/> }
      <h3>Followers</h3>
      {!loading && items?.length > 0 && followersList()}
      {!loading && items?.length === 0 && <div style={{width: '100%',marginTop: '80px'}}>
              <Typography align='center'>Followers not found!</Typography>
            </div>}
    </div>
  );
};

export default Followers;
