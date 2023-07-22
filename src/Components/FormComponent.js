import { useState, useMemo, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { CheckCircleOutlined } from '@material-ui/icons';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageUpload from '../Components/ImageUpload';
import Chip from './Chip';
import Loading from './Loading';
import MessageBox from './MessageBox';
import { CF_URL } from 'consts';
import {useQuery} from "@apollo/client";
import {useRestaurant} from "../Context/RestaurantContext";
import {sendEmailToAdmin, updateCardPoint} from '../graphql/mutations';
import {
  listCuisines,
  listDiets,
  listDeliveries,
  listMoods,
} from '../graphql/queries';
import DialogClose from "./Dialog/DialogClose";
import {getFileName, sortByName, sortBy, uploadPics} from "../utils";
import {emitCustomEvent} from "react-custom-events";
import {toast} from "react-toastify";
import ChipInput from './ChipInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  imgUploader: {
    // maxWidth: '500px',
    width: '100%'
  },
  submitBtn: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  top: {
    // marginLeft: theme.spacing(11),
    marginTop: '25px',
  },
  icon: {
    color: 'white',
  },
  uploadImageError: {
    color: '#f44336',
    fontSize: '0.75rem',
    fontWeight: '400',
    textAlign: 'center'
  },
  formControl: {
    width: '100%',
    maxWidth: '425px'
  },
  moodTitle: {
    color: '#3f51b5',
    fontSize: '15px',
    fontWeight: '500',
  },
  PriceField: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  }
}));

const FormComponent = ({modeOfOperation, item,handleClose}) => {
  const classes = useStyles();
  const {
    getRestaurantResponse,
    selectedDelivery,
    setSelectedDelivery,
    uploadedPictures,
    selectedMenus,
    setSelectedMenus,
    menus,
    restaurant,
    restaurantID
  } = useRestaurant();

  const isView = `${modeOfOperation}`.toLowerCase() === 'view';
  const isEdit = `${modeOfOperation}`.toLowerCase() === 'edit';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState({});

  // Moods State
  let moods = []
  try {
    const listMoodsResponse = useQuery(listMoods);
    if(!listMoodsResponse.loading && !listMoodsResponse.error){
      moods = listMoodsResponse.data.listMoods.items;
    }
  } catch (error) {
    console.log(error);
  }

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
  ];

  useEffect(() => {
    if(item && item.id){
      console.log({
        item
      })

      setName(item?.name)
      setDescription(item?.description)
      setPrice(item?.price)
      setSelectedCuisines(item?.cuisine)
      setSelectedDiets(item?.diets)
      setSelectedDelivery(item?.delivery)
      setSelectedMood(item?.cardPointMoodId || item?.mood?.id)
      setSelectedMenus((item?.menus || []).map(item => item.name))
      const listOpt = {};
      (item?.orderOptionUrls || []).map(opt => {
        listOpt[opt.name] = opt.url;
      })
      setSelectedUrls(listOpt)

      const picture = item?.cardPointFile || [];
      setSelectedImages(picture.map(item => item.key))
    }
  }, [item]);


  // Cuisine State
  let cuisines = [];
  try {
    const listCuisinesResponse = useQuery(listCuisines);
    if(!listCuisinesResponse.loading && !listCuisinesResponse.error){
      listCuisinesResponse.data.listCuisines.items.forEach((i) => {
        cuisines.push(i.name);
      });
    }
  } catch (error) {
    console.log(error);
  }
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  // Diets State
  let diets = [];
  try {
    const listDietsResponse = useQuery(listDiets);
    if(!listDietsResponse.loading && !listDietsResponse.error){
      listDietsResponse.data.listDiets.items.forEach((i) => {
        diets.push(i.name);
      });
    }

  } catch (error) {
    console.log(error);
  }
  const [selectedDiets, setSelectedDiets] = useState([]);

  //delivery state
  let delivery = [];
  let orderingAllOption = [];
  try {
    const listDeliveriesResponse = useQuery(listDeliveries);
    if(!listDeliveriesResponse.loading && !listDeliveriesResponse.error){
      orderingAllOption = listDeliveriesResponse.data.listDeliveries.items;
      listDeliveriesResponse.data.listDeliveries.items.forEach((i) => {
        delivery.push(i.name);
      });
    }

  } catch (error) {
    console.log(error);
  }
  const [selectedUrls, setSelectedUrls] = useState([]);

  // Menu State
  const availableMenus = useMemo(() => { if (menus) {return menus.map((menu) => menu.name)}});

  //select images
  const [selectedImages, setSelectedImages] =useState([]);
  const [selectImagesDialogOpen, setSelectImagesDialogOpen] =
    useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Message State
  const [showmessage, SetShowmessage] = useState(false);

  const onDrop = (picture) => {
    setPictures(picture);
    setError({ ...error, pictures: ''})
  };

  const validation = () => {
    let error = {};
    if (!name.trim()) {
      error.title = "Please Enter Title";
    }
    if (!price.trim()) {
      error.price = "Please Enter Price";
    }
    if (!description.trim()) {
      error.description = "Please Enter Description";
    }
    if(!selectedImages?.length && !pictures?.length){
      error.pictures = "Please Choose Image";
    } else {
      error.pictures = "";
    }
    return error;
  };

  const addOrUpdateItems = () => {
    if(!name || !price || !description || (!selectedImages?.length && !pictures?.length)) {
      setError(validation())
      return false;
    }

    if(item && item.id) {
      updateItem()
    }
  }

  console.log("------>>selectedMenus",selectedMenus);


  const updateItem = async () => {
    // Uplaod all the images first
    setLoading(true);
    let files = await uploadPics(pictures);
    // check for url
    let allURLs = [];
    for (const [key, value] of Object.entries(selectedUrls)) {
      allURLs.push({
        name: key,
        url: value,
      });
    }

    allURLs = allURLs.filter((uu) => selectedDelivery.includes(uu.name));

    /** TODO: Filter selected dilivery option based on name from list of all delivery options */
    let newUrls = [];
    allURLs = orderingAllOption.filter((item) => allURLs.some((i) => {
      if (i.name === item.name)
        {
          const urlObj = {
            name: item.name,
            url: i.url,
            backgroundColor:item?.backgroundColor,
            fontColor:item?.fontColor,
            file:item?.file
          };
          newUrls.push(urlObj)
          return urlObj;
        }
    }));
    allURLs = newUrls;

    console.log("------>>allURLs",allURLs);
    /** TODO: End **/

    const allMenus = menus && menus.filter(menu => (selectedMenus.includes(menu.name))).map(({id, name, description})=>({id, name, description }))
    console.log(allMenus)
    const filesFromRestaurant = item?.cardPointFile?.filter((pic) => {
      return selectedImages.includes(pic.key)
    });

    const filesFromRestaurantList = uploadedPictures?.filter((pic) => {
      return selectedImages.includes(pic.key)
    });
    console.log({price})

    let input = {
      id: item.id, //'71d0de32-8072-43b5-ae45-01c1d2cdfaa7',
      name,
      description,
      cardPointFile: [].concat(filesFromRestaurant, filesFromRestaurantList,files).filter(item=>{
        return{
          bucket: item.bucket,
          key: item.key,
          region: item.region,
        }
      }),
      // isApproved: 'PENDING',
      cuisine: selectedCuisines,
      diets: selectedDiets,
      price,
      menus: allMenus,
      delivery: selectedDelivery,
      orderOptionUrls: allURLs,
      // unapprovedItemMoodId: selectedMood ? selectedMood : null,
      cardPointMoodId:selectedMood ? selectedMood : null,
    };

    try {
      await API.graphql(graphqlOperation(updateCardPoint, { input }));

      // Send Email
      let cardInfoo = JSON.stringify({
        context: 'UPDATE',
        email: 'admin@fooddiscoveryapp.com',
        restaurant: restaurant.name,
        name,
        description,
        link: `https://main.d11dtbgh84vt88.amplifyapp.com/pending/${restaurantID}`,
      });

      const resultEmail = await API.graphql(
        graphqlOperation(sendEmailToAdmin, { cardInformation: cardInfoo })
      );
      setLoading(false);

      emitCustomEvent('approved-item-updated', {data: input});

      console.log('---->>>', resultEmail);
      handleClose();
      toast.success('Item edited successfully');
    } catch (error) {
      console.log('Encountered Error', error);
      setLoading(false);
    }
  };
  const removeSelectedImage = (image) => {
    setSelectedImages(selectedImages.filter((j) => j !== image))
  }

  if(getRestaurantResponse.loading || !restaurant){
    return <Loading title={'Loading..Please wait'} />;
  }

  if(!getRestaurantResponse.data.getRestaurant){
    return <Loading title={'Loading..Please wait restaurant'} />;
    // return <Redirect to="/add-restaurant"/>
  }

  if(restaurant){
    return (
      <Container maxWidth="md">
        { loading && <Loading title={'Loading..Please wait'} /> }
        {
          showmessage && <MessageBox
            content={'A new item has been updated'}
            action={() => SetShowmessage(false)}
          />
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
          <div>
            <TextField
              error={error?.title}
              disabled={isView}
              id="standard-basic"
              label="Title"
              name="title"
              value={name}
              fullWidth
              onChange={(e) => {setName(e.target.value);setError({...error, title: ''})}}
              helperText={error?.title}
            />
          </div>
          <div>
            <TextField
              error={error?.description}
              disabled={isView}
              id="standard-basic"
              label="Description"
              name="description"
              value={description}
              multiline={4}
              fullWidth
              onChange={(e) => {setDescription(e.target.value);setError({...error, description: ''})}}
              helperText={error?.description}
            />
          </div>


          <div>
            <TextField
              className={classes.PriceField}
              error={error?.price}
              disabled={isView}
              id="price"
              onWheel={(e) =>{e.target.blur()}}
              label="Price"
              value={price}
              type="number"
              name="price"
              onChange={(e) => {setPrice(e.target.value);setError({...error, price: ''})}}
              helperText={error?.price}
            />
          </div>
          {/* New Uploader */}
          {
            !isView &&
            <div className={classes.imgUploader}>
               <ImageUpload
                    onDrop={onDrop}
                    acceptType={["jpg", "png", "jpeg","gif"]}
                    buttonText="Choose image"
                    maxFileSize={10242880}
                    label={'Upload Images (jpg and png format only)'}
                    isMultiple={true}
                    name="formImageUploader"
                  />
            </div>
          }
          <Typography className={classes.uploadImageError}>{error?.pictures}</Typography>
          {/* end */}

          <Paper style={{ minHeight: '100px', width: '100%' }}>
            <ImageList rowHeight={180}  cols={3}>
              {sortBy(selectedImages).map((image, index) => (
                <ImageListItem key={image+index}>
                  <img src={`${CF_URL}/${image}`} alt={image} />
                  <ImageListItemBar
                    title={getFileName(image || 'Hello')}
                    actionIcon={
                      isView ? <></> :
                      <IconButton className={classes.icon} onClick={() => removeSelectedImage(image)}>
                        <DeleteIcon/>
                      </IconButton>
                    }
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            {
              !isView &&
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Button
                  variant="contained"
                  color="default"
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    setSelectImagesDialogOpen(true);
                  }}
                  id="btnChooseDefaultItemImg"
                  >
                  Choose Images On File
                </Button>
              </div>
            }

          </Paper>
          {/* end */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* Cuisine */}
              <ChipInput
                id="specifyCuisine"
                disabled={isView}
                items={cuisines}
                placeholder="Specify Cuisine"
                onOptionChange={(val) => setSelectedCuisines(val)}
                selectedItems={selectedCuisines}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Diets */}
              <ChipInput
                id="specifyDiets"
                disabled={isView}
                placeholder={'Specify Diets'}
                items={diets}
                onOptionChange={(val) => setSelectedDiets(val)}
                selectedItems={selectedDiets}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* Order Options */}
              <Chip
                id="orderingOption"
                disabled={isView}
                title={'Ordering option'}
                items={delivery}
                currentval={(val) => setSelectedDelivery(val)}
                selectedItems={selectedDelivery}
                hasText
                currentText={(val) => setSelectedUrls(val)}
                selectedText={selectedUrls}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ChipInput
                disabled={isView}
                selectedItems={selectedMenus}
                placeholder={'Specify Menu'}
                items={availableMenus}
                onOptionChange={(val) => {
                  setSelectedMenus(val);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'center'}}>
              <FormControl className={classes.formControl}>
                <InputLabel id="card-mood-select-label" className={classes.moodTitle}>Mood</InputLabel>
                <Select
                  disabled={isView}
                  labelId="card-mood-select-label"
                  id="card-mood-select"
                  name="cardPointMoodId"
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                >
                  <MenuItem value={''}>---</MenuItem>
                  {moods.map((mood) => (
                    <MenuItem key={mood.id} value={mood.id}>{mood.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>


          {
            ! isView ?
              <div className={classes.submitBtn}>
                <Button variant="contained" onClick={addOrUpdateItems} id="btnAddEdit">
                  {
                    isEdit ? 'Update' : 'Save'
                  }
                </Button>
              </div>
              : null
          }

        </form>

        <Dialog
          open={selectImagesDialogOpen}
          onClose={() => {
            setSelectImagesDialogOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Select Images for Card
            <DialogClose onClose={() => {setSelectImagesDialogOpen(false); }}/>
          </DialogTitle>
          <DialogContent>
            <ImageList rowHeight={180}  cols={3}>
              {uploadedPictures && sortByName(uploadedPictures).map((item) => (
                <ImageListItem key={item.key}>
                  <img src={`${CF_URL}/${item.key}`} alt={item.title} />
                  <ImageListItemBar
                    title={getFileName(item?.key || 'Hello')}
                    actionIcon={
                      <IconButton className={classes.icon}>
                        {selectedImages.includes(item.key) ? (
                          <CheckCircleOutlined
                            style={{color: 'white'}}
                            onClick={() => {
                              setSelectedImages(
                                selectedImages.filter((i) => i !== item.key),
                              );
                            }}
                          />
                        ) : (
                          <AddCircleOutline
                            style={{color: 'white'}}
                            onClick={() => {
                              setSelectedImages([...selectedImages, item.key]);
                              setError({...error, pictures: ''})
                            }}
                          />
                        )}
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectImagesDialogOpen(false);
              }}
              color="primary"
              autoFocus
              id="btnSelDefaultImg"
              >
              Add Selected Images
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }


};

export default FormComponent;
