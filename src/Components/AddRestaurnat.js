import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  listCuisines,
  listDeliveries,
  getPendingRestaurantContact,
  listRestaurantMenus,
} from '../graphql/queries';
import { createRestaurantUnapproved, deleteRestaurantUnapproved } from '../graphql/mutations';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../Components/ImageUpload';
import ChipInput from './ChipInput';
import Chip from './Chip';
import LoadingButton from '@mui/lab/LoadingButton';
import Cancel from '@mui/icons-material/Cancel';
import Add from '@mui/icons-material/Add';
import uuid from 'uuid-random';
import aws_exports from '../aws-exports';
import { GOOGEL_GEOCODE_API } from 'consts';
import slugify from "slugify";
import Loading from './Loading';
import Grid from '@material-ui/core/Grid';
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
  },
  container: {
    padding: theme.spacing(4),
    background: '#ffffff',
    margin:  theme.spacing(4),
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    '@media(max-width: 768px)' : {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
  },
  txtField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: '100%'
  },
  txtFull: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '100%',
  },
  input: {
    display: 'none',
  },

  upLabel: {
    marginTop: theme.spacing(3),
  },
  label: {
    marginRight: theme.spacing(2),
  },
  mltiline: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    textAlign:'bottom'
  },
  row: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  col: {
    display: 'flex',
    width: '100%',
  },
  row2: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    marginTop: theme.spacing(2),
  },
  submitBtn: {
    textTransform: 'none',
  },
  paper: {
    padding: theme.spacing(4),
  },
  loaderWrap: {
    minWidth: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addRestaurantImage: {
    color: 'red',
    position: 'absolute',
    bottom: '-5px',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.75rem'
  },
  imgUploader: {
    position: 'relative'
  },
  errorText: {
    color: 'red',
    fontSize: '0.75rem',
    marginTop: 0
  }
}));

const InitialState = {
  resturantName: '',
  resturantAddress: '',
  description: '',
  city: '',
  zip: '',
  contact: '',
  specifymenu: '',
  specifyCuisine: '',
  orderingoption:'',
};

const slugOptions = {
  replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
  lower: true,      // convert to lower case, defaults to `false`
  strict: true,     // strip special characters except replacement, defaults to `false`
  // locale: 'vi',       // language code of the locale to use
  trim: false         // trim leading and trailing replacement chars, defaults to `true`
}


const AddRestaurnat = () => {
  const classes = useStyles();

  // Cuisine State
  const [cuisines, setCuisines] = React.useState([]);
  const [selectedCuisines, setSelectedCuisines] = React.useState([]);
  // Delivery State
  const [delivery, setDelivery] = React.useState([]);
  const [orderImage, setOrderImage] = React.useState([]);

  // Menu State
  const [menus, setMenus] = React.useState([]);
  const [selectedMenus, setSelectedMenus] = React.useState([]);
  const availableMenus = React.useMemo(() => menus.map((menu) => menu.name), [menus]);

  const [selectedDelivery, setSelectedDelivery] = React.useState([]);

  const [pictures, setPictures] = React.useState([]);

  const [state, setState] = React.useState(InitialState);
  const [error, setError] = React.useState({});

  const [selectedUrls, setSelectedUrls] = React.useState([]);
  const [didMount,setDidMount] =  React.useState(true);
  // Loading API response
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRequest,setIsRequest] = React.useState(false);
  const [pending, setPending] = React.useState([]);
  const [createdRestaurantId,setCreatedRestaurantId] = React.useState("");

  React.useEffect(() => {
    pendingRestaurant();
    getcuisine();
    getAllDelivery();
    getAllMenus();
  }, []);

  const validation = (state) => {
    let error = {};
    if (!state.resturantName) {
      error.resturantName = "Please Enter Restaurant Name";
    }
    if (!state.resturantAddress) {
      error.resturantAddress = "Please Enter Restaurant Address";
    }
    if (!state.description) {
      error.description = "Please Enter description";
    }
    if (!state.city) {
      error.city = "Please Enter City name";
    }
    if (!state.zip) {
      error.zip = "Please Enter Zip Code";
    }
    if (!pictures?.length) {
      error.addRestaurantImg = "Please Choose image";
    }
    if (!selectedMenus?.length) {
      error.specifymenu = 'Please Choose Specify Menu';
    }
    if (!state.specifyCuisine) {
      error.specifyCuisine = 'Please Choose Specify cuisine';
    }
    if (!state.orderingoption) {
      error.orderingoption = 'Please Choose ordering option'
    }
    return error;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
    setError({
      ...error,
      [event.target.name]: '',
    })
  };

  /**
   * Gets all menus
   */
  const getAllMenus = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listRestaurantMenus));
      setMenus(result.data.listRestaurantMenus.items);
    } catch (error) {
      console.log(error);
    }
  };

  const pendingRestaurant = async () => {
    try {
      setIsLoading(true);
      const userInfo = await Auth.currentAuthenticatedUser();
      const ress = await API.graphql(
        graphqlOperation(getPendingRestaurantContact, {
          contact: userInfo.attributes['email'],
        })
      );
      setPending(ress.data.getPendingRestaurantContact.items);
      setDidMount(false)
    } catch (error) {
      console.log('===<><><', error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const deleteResquest = async () => {
    try {
      setIsRequest(true)
      await API.graphql(
        graphqlOperation(deleteRestaurantUnapproved, {
          input: {
            id: pending[0].id,
          },
        })
      );
      await pendingRestaurant();
      setIsRequest(false)
    } catch (error) {
      console.log('===<><><', error);
    }
  };

  const currentChips = (val) => {
    const value = val[0];
    setState({
      ...state,
      specifyCuisine: value,
    });
    setError({
      ...error,
      specifyCuisine: '',
    });
    setSelectedCuisines(val);
  };

  const currentspecifyMenu = (val) => {
    const value = val[0];
    setState({
      ...state,
      specifymenu: value,
    });
    setError({
      ...error,
      specifymenu: '',
    });
    setSelectedMenus(val)
  };

  const currentDelivery = (val) => {
    const value = val[0];
    setState({
      ...state,
      orderingoption: value,
    });
    setError({
      ...error,
      orderingoption: '',
    });
    setSelectedDelivery(val);
    setSelectedUrls(val)
  };

  const currentText = (val) => {
    console.log('Selected URLs', selectedUrls);
    setSelectedUrls(val);
  };

  const getcuisine = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listCuisines));
      let allCusines = [];
      result.data.listCuisines.items.forEach((i) => {
        allCusines.push(i.name);
      });
      setCuisines(allCusines);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDelivery = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listDeliveries));
      let allDelivery = [];
      let allDeliveryPic = [];
      result.data.listDeliveries.items.forEach((i) => {
        allDelivery.push(i.name);
        if (i.file) {
          allDeliveryPic.push({
            name: i.name,
            file: i.file,
            backgroundColor: i.backgroundColor,
            fontColor: i.fontColor,
          });
        }
      });
      setDelivery(allDelivery);
      setOrderImage(allDeliveryPic);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!state.resturantName || !state.resturantAddress || !state.city || !state.zip || !state.description || !pictures?.length || !state.specifyCuisine || !state.specifymenu || !state.orderingoption) {
      setError(validation(state));
      return;
    }

    setIsLoading(true);
    setIsRequest(true);
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${state.address},+${state.city},+${state.zip}&key=${GOOGEL_GEOCODE_API}`
    );
    let geoCode = await response.json();

    const promises = [];

    if (pictures.length > 0) {
      pictures.forEach((pic) => {
        const filename = `${uuid()}${Date.now()}`;
        promises.push(
          Storage.put(filename, pic, {
            contentType: pic.type,
          })
        );
      });
    }

    let files = [];

    let uploads = await Promise.all(promises);

    if (uploads.length > 0) {
      uploads.forEach((u) => {
        files.push({
          key: u.key,
          bucket: aws_exports.aws_user_files_s3_bucket,
          region: aws_exports.aws_project_region,
        });
      });
    }

    // check for url
    let allURLs = [];
    for (const [key, value] of Object.entries(selectedUrls)) {
      let file = null;
      let backgroundColor = null;
      let fontColor = null;
      orderImage.forEach((im) => {
        if (im.name === key) {
          file = im.file;
          fontColor = im.fontColor;
          backgroundColor = im.backgroundColor;
        }
      });
      allURLs.push({
        name: key,
        url: value,
        file,
        backgroundColor,
        fontColor,
      });
    }

    allURLs = allURLs.filter((uu) => selectedDelivery.includes(uu.name));
console.log("---->> allURLs",allURLs);
// return false;
    const allMenus = menus
      .filter((menu) => selectedMenus.includes(menu.name))
      .map(({ id, name, description }) => ({ id, name, description }));

    console.log('ALL URLS', allURLs);

    const userInfo = await Auth.currentAuthenticatedUser();

    // Create Unapproved Restaurant
    const input = {
      name: state.resturantName,
      address: state.resturantAddress,
      city: state.city,
      cityNameSlug: slugify(state.city.trim(), slugOptions),
      zip: state.zip,
      file: files,
      menus: allMenus,
      location: {
        lat: geoCode?.results[0]?.geometry?.location?.lat,
        lon: geoCode?.results[0]?.geometry?.location?.lng,
      },
      cuisine: selectedCuisines,
      delivery: selectedDelivery,
      description: state.description,
      contact: userInfo.attributes['email'],
      orderOptionUrls: allURLs,
    };
    try {
      console.log("restaurant input ----->",input)
      const result = await API.graphql(graphqlOperation(createRestaurantUnapproved, { input }));
      setCreatedRestaurantId(result?.data?.createRestaurantUnapproved?.id);
      setState(InitialState);
      setSelectedCuisines([]);
      await pendingRestaurant();
      setIsLoading(false);
      setIsRequest(false);
    } catch (error) {
      // @TODO make better error ui
      toast.error("Something went wrong during add restaurant!")
      console.log(error);
      setIsLoading(false);
      setIsRequest(false);
    }
  };

  const onDrop = (picture) => {
    setPictures(picture);
    setError({...error, addRestaurantImg : ''})
  };

  if (pending.length > 0) {
    return (
      <div className={classes.wrap}>
        <h3>Your Restaurant Is Pending Review</h3>
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <div>
              <span>
                <b>Restaurant Name:</b> {pending[0].name}
              </span>
              <br />
              <span>
                <b>Address:</b> {pending[0].address}
              </span>
              <br />
              <span>
                <b>City:</b> {pending[0].city}
              </span>
              <br />
              <span>
                <b>Zip:</b> {pending[0].zip}
              </span>
            </div>
            <div className={classes.row} data-id={createdRestaurantId} id="btnCancelRequest">
              <LoadingButton
                variant="contained"
                color="primary"
                component="span"
                className={classes.submitBtn}
                onClick={deleteResquest}
                loading={isRequest}
                loadingPosition="start"
                startIcon={<Cancel />}
              >
               {isRequest ? "Canceling Request...": "Cancel Request"}
              </LoadingButton>
            </div>
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loading isLinearProgress={true}  />}
      <div className={classes.wrap}>
      {!didMount &&
        <>
          <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <h1>Add your restaurant</h1>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="resturantName"
                    label="Restaurant Name"
                    className={classes.txtFull}
                    value={state.resturantName}
                    onChange={handleChange}
                    error={error.resturantName}
                    helperText={error.resturantName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="resturantAddress"
                    label="Restaurant Address"
                    className={classes.txtFull}
                    value={state.resturantAddress}
                    onChange={handleChange}
                    error={error.resturantAddress}
                    helperText={error.resturantAddress}

                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    className={classes.mltiline}
                    maxRows={5}
                    value={state.description}
                    onChange={handleChange}
                    error={error.description}
                    helperText={error.description}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    name="city"
                    label="City"
                    className={classes.txtField}
                    value={state.city}
                    onChange={handleChange}
                    error={error.city}
                    helperText={error.city}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    name="zip"
                    label="Zip Code"
                    className={classes.txtField}
                    value={state.zip}
                    onChange={handleChange}
                    error={error.zip}
                    helperText={error.zip}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.imgUploader}>
                    {/* New Uploader */}
                    <ImageUpload
                      onDrop={onDrop}
                      acceptType={["jpg", "png", "jpeg","gif"]}
                      buttonText="Choose image"
                      maxFileSize={10242880}
                      isMultiple={true}
                      name="addRestaurantImg"
                    />
                    <p className={classes.addRestaurantImage}> {error.addRestaurantImg} </p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <ChipInput
                    id="specifyCuisine"
                    items={cuisines}
                    placeholder="Specify Cuisine"
                    onOptionChange={currentChips}
                  />
                  <p className={classes.errorText}>{error.specifyCuisine} </p>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <ChipInput
                    id="specifyMenu"
                    items={availableMenus}
                    selectedItems={selectedMenus}
                    onOptionChange={currentspecifyMenu}
                    placeholder={'Specify Menu'}
                  />
                  <p className={classes.errorText}> {error.specifymenu} </p>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <ChipInput
                    id="orderingOption"
                    placeholder={'Ordering option'}
                    items={delivery}
                    onOptionChange={currentDelivery}
                    selectedItems={selectedDelivery}
                  />
                  <p className={classes.errorText}> {error.orderingoption} </p>
                </Grid>
                <Grid item xs={12}>
                  {selectedDelivery.length > 0 ? (
                    <Chip
                      id="selectUrls"
                      title={'Select Urls'}
                      items={delivery}
                      currentval={currentDelivery}
                      selectedItems={selectedDelivery}
                      hasText
                      currentText={currentText}
                      selectedText={selectedUrls}
                      disableSelect
                    />
                  ) : null}
                </Grid>
              </Grid>
            </form>
            <div className={classes.row}>
              <LoadingButton
                variant="contained"
                color="primary"
                component="span"
                className={classes.submitBtn}
                onClick={handleSubmit}
                loading={isRequest}
                loadingPosition="start"
                startIcon={<Add />}
                id="addRestaurant"
              >
                Request to Add Restaurant
              </LoadingButton>
            </div>
          </div>
        </>
        }
    </div>
    </>
  );
};

export default AddRestaurnat;
