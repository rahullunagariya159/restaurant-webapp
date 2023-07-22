import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateRestaurant } from '../graphql/mutations';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loading from './Loading';
import TextField from '@material-ui/core/TextField';
import {useRestaurant} from "../Context/RestaurantContext";
import BulkImageUpload from './../Components/Dialog/BulkImageUpload';
import {getFileName, sortByName} from "../utils";
import ImageListWrapper from "./Common/ImageList";
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {useDialog} from "../Context/DialogProvider";
import {toast} from "react-toastify";
import {useQuery} from '@apollo/client';
import {getRestaurantBulkImages} from '../graphql/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  imgUploader: {
    maxWidth: '500px',
  },
  submitBtn: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  icon: {
    color: 'white',
  },
  top: {
    marginTop: '25px',
  },
}));

const BulkUploadImages = () => {
  const limit = 10;
  const classes = useStyles();
  const { restaurant={}, reFetchRestaurant } = useRestaurant();
  const { bulkImages = []} = restaurant || {};

  const [existingBulkPictures, setExistingBulkPictures] = useState(bulkImages);
  const [searchText, setSearchText] = useState('');

  // Loading State
  const [loading, setLoading] = useState(true);

  const [openDialog, closeDialog] = useDialog();
  const [deleting, setDeleting] = useState(false);

  const [nextToken, setNextToken] = useState(undefined);
  const [nextNextToken, setNextNextToken] = useState();
  const [previousTokens, setPreviousTokens] = useState([]);
  const [page, setPage] = useState(0);

  const rewardsVariables = {
    filter: {id: {eq: restaurant?.id}},
    limit: limit,
    nextToken
  }

  const getRestaurantBulkImagesResponse = useQuery(getRestaurantBulkImages, {
    variables: rewardsVariables,
    onCompleted: (res) => {
      setNextNextToken(res?.listRestaurants?.nextToken);
      setLoading(false)
    }
  });

  const reFetchRecords = (id) => {
    const rewardsInputVar = {
      filter: {id: {eq: id}},
      limit: limit,
      nextToken
    };
    getRestaurantBulkImagesResponse.refetch && getRestaurantBulkImagesResponse.refetch(rewardsInputVar)
  }

  useEffect(() => {
    if (restaurant?.id) {
      reFetchRecords(restaurant?.id)
    }
  }, [restaurant]);

  useEffect(() => {
    if(restaurant?.bulkImages){
      setExistingBulkPictures(sortByName(restaurant?.bulkImages))
    }

    if(restaurant && loading){
      setLoading(false);
    }
  }, [restaurant, loading]);


  useEffect(() => {
    if(bulkImages && bulkImages.length){
      const filterImages = bulkImages.filter(img => {
        const fileName = getFileName(img.key);
        return fileName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || img.key.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      })
      setExistingBulkPictures(sortByName(filterImages))
    }
  }, [searchText])

  const onOpenDeleteConfirmationDialog = (name, id, onDeleteItem) => {
    openDialog({
      children: (
        <>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <div dangerouslySetInnerHTML={{__html: name}}></div>
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

  const onUploadSuccess = (images) => {
    setExistingBulkPictures(images)
  }

  const updateRestaurantDetails  = async (input) => {
    const result = await API.graphql(graphqlOperation(updateRestaurant, { input }));
    onUploadSuccess(input.bulkImages)
    reFetchRestaurant();
    return result;
  }

  const deleteUplodedImage = async (item) => {
    try {
      setDeleting(true)
      const images = existingBulkPictures.filter((j) => j.key !== item.key);
      setExistingBulkPictures(images);
      await updateRestaurantDetails({
        id: restaurant.id,
        bulkImages: images
      })
      toast.success('Image deleted successfully');
      closeDialog();
    } catch (error) {
      console.log({error})
    } finally{
      setDeleting(false)
    }
  }

  const deleteImages = async (item) => {
    const filename = getFileName(item?.key || 'Hello')
    onOpenDeleteConfirmationDialog(`Are you sure you want to delete image <b>${filename}</b>`,item,  deleteUplodedImage)
  }

  if (loading || !restaurant) {
    return <Loading title={'Loading..Please wait'} />;
  }

  return (
    <Container maxWidth="lg">
       {
        deleting &&
        <Loading title={'Deleting Image... Please wait'}/>
      }
      <div className={classes.top}>
        <strong>{restaurant.name}</strong>
        <p>
          <span>{restaurant.address}</span>
          <br />
          <span>{restaurant.city}</span>,<span>{restaurant.zip}</span>
        </p>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        {/* New Uploader */}
	      <Grid container spacing={3}>
          <Grid item xs={6}>
            <BulkImageUpload restaurant={restaurant} updateRestaurantDetails={updateRestaurantDetails} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth id="search-image" label="Search Image" onChange={(e) => setSearchText(e.target.value)} />
          </Grid>
        </Grid>

        {/* Existing Pictures */}
        <div className={classes.existing}>
          <ImageListWrapper deleteImages={deleteImages} images={existingBulkPictures} />
        </div>
      </form>
    </Container>
  );
};

export default BulkUploadImages;
