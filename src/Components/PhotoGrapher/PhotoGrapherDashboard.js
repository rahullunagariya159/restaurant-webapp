import {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CircularProgress, Container, Divider, Grid, TextField} from '@material-ui/core';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {getRestaurant} from "../../graphql/queries";
import ImageListWrapper from "../Common/ImageList";
import {getFileName, sortByName} from "../../utils";
import BulkImageUpload from "../Dialog/BulkImageUpload";
import {API, graphqlOperation} from "aws-amplify";
import {updatePhotographer, updateRestaurant} from "../../graphql/mutations";
import {CF_URL} from "../../consts";
import Typography from "@material-ui/core/Typography";
import {useRestaurant} from "../../Context/RestaurantContext";

function Dashboard() {
  const [values, setValues] = useState({
    restaurantId: '',
    loading: false,
  });
  const {userdetails} = useRestaurant();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isValidRestaurantId, setIsValidRestaurantId] = useState(false);

  const [getRestaurantById] = useLazyQuery(getRestaurant);
  const [restaurant, setRestaurant] = useState(null);
  const {bulkImages = []} = restaurant || {};
  const [existingBulkPictures, setExistingBulkPictures] = useState([]);
  console.log({userdetails});

  const photographerInput = (userdetails?.photographer?.items && userdetails?.photographer?.items[0]) || {
    photographedRestaurants: [],
    uploadedBulkImages: []
  }

  const [updatePhotographerById] = useMutation(updatePhotographer)

  useEffect(() => {
    if (restaurant && restaurant.bulkImages) {
      setExistingBulkPictures(sortByName(restaurant.bulkImages))
    }

  }, [restaurant]);

  useEffect(() => {
    if (bulkImages.length) {
      const filterImages = bulkImages.filter(img => {
        const fileName = getFileName(img.key);
        return fileName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || img.key.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      })
      setExistingBulkPictures(sortByName(filterImages))
    }
  }, [searchText])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setHasError(false)
    setIsValidRestaurantId(false);
  };

  const fetchRecords = async () => {
    try {
      const {data} = await getRestaurantById({variables: {id: values.restaurantId}});
      const restaurant = data.getRestaurant || {};
      // setExistingBulkPictures(sortByName(restaurant.bulkImages))
      if (restaurant && !restaurant.id) {
        setIsValidRestaurantId(true);
      } else {
        setRestaurant(restaurant);
      }
    } catch (e) {

    }
  }

  const onValidate = async () => {
    try {
      setLoading(true)
      setIsValidRestaurantId(false);
      if (!values.restaurantId) {
        setHasError(true)
      } else {
        await fetchRecords()
      }
      //4c5f8cce-6fed-4c6e-ab89-447781cbcac6

    } catch (e) {
      console.log({e});
    } finally {
      setLoading(false)
    }
  }

  const OnUpdateImages = async (input, newFiles) => {
    setExistingBulkPictures(input.bulkImages)
    await API.graphql(graphqlOperation(updateRestaurant, {input}));
    // photographerInput
    if(photographerInput?.id && restaurant?.id){
      let photographedRestaurants = photographerInput?.photographedRestaurants || [];
      photographedRestaurants = photographedRestaurants.concat(restaurant.id)
      photographedRestaurants = [ ...new Set(photographedRestaurants)]

      let uploadedBulkImages = photographerInput?.uploadedBulkImages || [];
      uploadedBulkImages = uploadedBulkImages.concat(newFiles)
      uploadedBulkImages = [ ...new Set(uploadedBulkImages)]

      await updatePhotographerById({
        variables: {
          input: {
            photographedRestaurants,
            uploadedBulkImages,
            id: photographerInput.id
          }
        }
      })
    }

    await fetchRecords()
  }

  let restaurantImage = '/images/placeholder-image.jpeg';
  if (restaurant && restaurant.file && restaurant.file.length > 0) {
    restaurantImage = `${CF_URL}/${restaurant.file[0].key}`
  }

  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid item lg={10} md={10}sm={12} xs={12}>
                  <TextField
                    fullWidth
                    helperText={isValidRestaurantId ? "Please specify the correct restaurant Id " : "Please specify the restaurant Id"}
                    label="Restaurant ID"
                    name="restaurantId"
                    onChange={handleChange}
                    required
                    value={values.restaurantId}
                    variant="outlined"
                    error={hasError || isValidRestaurantId}
                  />
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 2
                    }}
                  >
                    <Button
                      color={loading ? "" : "primary"}
                      variant="contained"
                      disabled={loading}
                      onClick={onValidate}
                      id="phBtnValidateRestaurant"
                    >
                      {
                        loading ? <CircularProgress size={18}/> : ''
                      }
                      Validate
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Box>
      {
        restaurant && restaurant.id ?
          <div>
            <Grid container spacing={3} style={{marginBottom: 5}}>
              <Grid item xs={12}>
                <Grid container spacing={3} style={{marginBottom: 5}}>
                  <Grid item xs={3}>
                    <img src={restaurantImage} style={{width: '100%', maxHeight: '150px', objectFit: 'contain'}}
                         alt=''/>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" component="h2">
                      {restaurant?.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {restaurant?.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider/>
              </Grid>
              <Grid item xs={6}>
                <BulkImageUpload restaurant={restaurant} updateRestaurantDetails={OnUpdateImages}/>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth id="search-image" label="Search Image"
                           onChange={(e) => setSearchText(e.target.value)}/>
              </Grid>
            </Grid>
            <ImageListWrapper images={existingBulkPictures}/>
          </div> : null
      }
    </Container>
  );
}

export default Dashboard;
