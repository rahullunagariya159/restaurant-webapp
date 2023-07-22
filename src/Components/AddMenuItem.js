import { useState, useMemo,useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { CheckCircleOutlined } from "@material-ui/icons";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageUpload from "../Components/ImageUpload";
import { emitCustomEvent } from "react-custom-events";
import Chip from "./Chip";
import ChipInput from "./ChipInput";
import Loading from "./Loading";
import { CF_URL } from "consts";
import { useQuery } from "@apollo/client";
import { useRestaurant } from "../Context/RestaurantContext";
import { sendEmailToAdmin,createCardPoint } from "../graphql/mutations";
import { listCuisines, listDiets, listDeliveries, listMoods } from "../graphql/queries";
import DialogClose from "./Dialog/DialogClose";
import { getFileName, sortByName, sortBy, uploadPics } from "../utils";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  imgUploader: {
    // maxWidth: '500px',
    width: "100%",
  },
  submitBtn: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  top: {
    // marginLeft: theme.spacing(11),
    marginTop: "25px",
  },
  icon: {
    color: "white",
  },
  uploadImageError: {
    color: "#f44336",
    fontSize: "0.75rem",
    fontWeight: "400",
    textAlign: "center",
  },
  formControl: {
    width: "100%",
    maxWidth: "425px",
  },
  moodTitle: {
    color: "#3f51b5",
    fontSize: "15px",
    fontWeight: "500",
  },
  DialogTitle: {
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
}));

const AddMenuItem = ({ handleClose,item }) => {
  const classes = useStyles();
  const {
    getRestaurantResponse,
    preselectedCuisine,
    selectedDelivery,
    setSelectedDelivery,
    uploadedPictures,
    selectedMenus,
    setSelectedMenus,
    menus,
    restaurant,
    setMenus,
    setUploadedPictures,
    setRestaurant
  } = useRestaurant();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [restaurantID, setRestaurantID] = useState('');
  const [selectedMood, setSelectedMood] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({});
  const [selectedCuisines, setSelectedCuisines] = useState([]);

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
    setRestaurantID(item?.id || restaurant?.id);
    if(item?.id)
    {
        setRestaurant(item);
        // restaurantID = item?.id;
        setSelectedCuisines(item?.cuisine);
			  setUploadedPictures(item?.bulkImages || item?.file || []);

        const prePopulateMenus = item?.menus || [];
        if(prePopulateMenus && item){
          const currentMenus = prePopulateMenus.map(
            (menu) => menu.name,
          );
          setSelectedMenus(currentMenus);
        }
        setMenus(prePopulateMenus);
    }
  },[item])

  useMemo(() => {
        if(preselectedCuisine?.length > 0)
        {
          setSelectedCuisines(preselectedCuisine)
        }
  },[])

  // Moods State
  let moods = [];
  try {
    const listMoodsResponse = useQuery(listMoods);
    if (!listMoodsResponse.loading && !listMoodsResponse.error) {
      moods = listMoodsResponse.data.listMoods.items;
    }
  } catch (error) {
    console.log(error);
  }

  // Cuisine State
  let cuisines = [];
  try {
    const listCuisinesResponse = useQuery(listCuisines);
    if (!listCuisinesResponse.loading && !listCuisinesResponse.error) {
      listCuisinesResponse.data.listCuisines.items.forEach((i) => {
        cuisines.push(i.name);
      });
    }
  } catch (error) {
    console.log(error);
  }

  // Diets State
  let diets = [];
  try {
    const listDietsResponse = useQuery(listDiets);
    if (!listDietsResponse.loading && !listDietsResponse.error) {
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
    if (!listDeliveriesResponse.loading && !listDeliveriesResponse.error) {
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
  const availableMenus = useMemo(() => {
    if (menus) {
      return menus.map((menu) => menu.name);
    }
  });

  //select images
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectImagesDialogOpen, setSelectImagesDialogOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

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
    if (!selectedImages?.length && !pictures?.length) {
      error.pictures = "Please Choose Image";
    } else {
      error.pictures = "";
    }
    return error;
  };

  const onDrop = (picture) => {
    setPictures(picture);
    setError({ ...error, pictures: "" });
  };
  const addOrUpdateItems = () => {
    if (!name || !price || !description || (!selectedImages?.length && !pictures?.length)) {
      setError(validation());
      return false;
    }
    createItem();
  };

  const onAprrovedItem = async (card) => {
    let input = {
      name: card.name,
      description: card.description,
      restaurantID: restaurant.id,
      cardPointFile: card.picture,
      zip: restaurant?.zip,
      city: restaurant?.city,
      price: card.price ? parseFloat(card.price).toFixed(2) : 20,
      cuisine: card.cuisine,
      diets: card.diets,
      orderOptionUrls: card.orderOptionUrls,
      menus: card.menus,
      cardPointMoodId: card.unapprovedItemMoodId,
      delivery: card.delivery,
      location: {
        lat: restaurant?.lat || restaurant?.location?.lat,
        lon: restaurant?.lng || restaurant?.location?.lon || 0.000000,
      },
      isActive:true,
      isPendingReview:false
    };
    try {
      const result = await API.graphql(
        graphqlOperation(createCardPoint, { input }),
      );
    } catch (error) {
      console.log('Encountered Error', error);
      throw error;
    }
  };

  const createItem = async () => {
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
    const allMenus =
      menus &&
      menus
        .filter((menu) => selectedMenus.includes(menu.name))
        .map(({ id, name, description }) => ({
          id,
          name,
          description,
        }));

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
        console.log("---->>> allURLs",allURLs)
      /** TODO: End **/

      const filesFromRestaurant = uploadedPictures && uploadedPictures.filter((pic) => selectedImages.includes(pic.key));

    let input = {
      name,
      description,
      restaurantID,
      picture: [].concat(filesFromRestaurant, files).filter((item) => {
        return {
          bucket: item.bucket,
          key: item.key,
          region: item.region,
        };
      }),
      isApproved: "APPROVED",
      cuisine: selectedCuisines,
      diets: selectedDiets,
      price,
      menus: allMenus,
      delivery: selectedDelivery,
      orderOptionUrls: allURLs,
      unapprovedItemMoodId: selectedMood ? selectedMood : null,
      location: {
        lat: restaurant?.lat || restaurant?.location?.lat,
        lon: restaurant?.lng || restaurant?.location?.lon || 0.000000,
      },
    };
    try {
      // const unapprrovedResult = await API.graphql(graphqlOperation(createUnapprovedItem, { input }));
      await onAprrovedItem(input);

      // Send Email
      let cardInfoo = JSON.stringify({
        context: "ADD",
        email: "admin@fooddiscoveryapp.com",
        restaurant: restaurant.name,
        name,
        description,
        link: `https://main.d11dtbgh84vt88.amplifyapp.com/pending/${restaurantID}`,
      });

      setName("");
      setPrice("");
      setDescription("");
      setSelectedImages([]);
      setSelectedDelivery([]);
      setSelectedUrls([]);
      setSelectedCuisines([]);
      setSelectedDiets([]);
      setSelectedMenus([]);
      setSelectedMood(null);
      emitCustomEvent("new-pending-item-added");
      toast.success("New item has been created successfully");
      await API.graphql(graphqlOperation(sendEmailToAdmin, { cardInformation: cardInfoo }));
      setLoading(false);
      handleClose && handleClose();
    } catch (error) {
      console.log("Encountered Error", error);
      setLoading(false);
      toast.error("Error while adding item");
    }
  };

  const removeSelectedImage = (image) => {
    setSelectedImages(selectedImages.filter((j) => j !== image));
  };

  if (!restaurant) {
    return <Loading title={"Loading..Please wait"} />;
  }

  // if (!getRestaurantResponse?.data?.getRestaurant) {
  //   return <Loading title={"Loading..Please wait"} />;
  //   // return <Redirect to="/add-restaurant"/>
  // }

  if (restaurant) {
    return (
      <Container maxWidth="md">
        {loading && <Loading title={"Loading..Please wait"} />}

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
              error={error.title}
              name="title"
              id="menuTitle"
              label="Title"
              value={name}
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
                setError({ ...error, title: "" });
              }}
              helperText={error.title}
            />
          </div>
          <div>
            <TextField
              error={error.description}
              name="description"
              id="menuDescription"
              label="Description"
              value={description}
              multiline={4}
              fullWidth
              onChange={(e) => {
                setDescription(e.target.value);
                setError({ ...error, description: "" });
              }}
              helperText={error.description}
            />
          </div>

          <div>
            <TextField
              error={error.price}
              name="price"
              id="price"
              label="Price"
              value={price}
              onWheel={(e) =>{e.target.blur()}}
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
                setError({ ...error, price: "" });
              }}
              helperText={error.price}
            />
          </div>
          {/* New Uploader */}
          <div className={classes.imgUploader}>
            <ImageUpload
              onDrop={onDrop}
              acceptType={["jpg", "png", "jpeg", "gif"]}
              buttonText="Choose image"
              label={"Upload Images (jpg and png format only)"}
              maxFileSize={10242880}
              name="uploadMenuItemImg"
              isMultiple={true}
              fileTypeError="is not supported file extension"
            />
          </div>
          <Typography className={classes.uploadImageError}>{error.pictures}</Typography>

          {/* end */}

          <Paper style={{ minHeight: "100px", width: "100%" }}>
            <ImageList rowHeight={180} cols={3}>
              {sortBy(selectedImages).map((image) => (
                <ImageListItem key={image}>
                  <img src={`${CF_URL}/${image}`} alt={image} />
                  <ImageListItemBar
                    title={getFileName(image || "Hello")}
                    actionIcon={
                      <IconButton className={classes.icon} onClick={() => removeSelectedImage(image)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="default"
                id="btnChooseMenuItemImg"
                style={{ marginTop: "20px", marginBottom: "20px" }}
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                  setSelectImagesDialogOpen(true);
                }}
              >
                Choose Images On File
              </Button>
            </div>
          </Paper>
          {/* end */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* Cuisine */}
              <ChipInput
                id="menuSpecifyCuisine"
                items={cuisines}
                placeholder="Specify Cuisine"
                onOptionChange={(val) => setSelectedCuisines(val)}
                selectedItems={selectedCuisines}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Diets */}
              <ChipInput
                id="menuSpecifyDiets"
                placeholder={"Specify Diets"}
                items={diets}
                onOptionChange={(val) => setSelectedDiets(val)}
                selectedItems={selectedDiets}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* Order Options */}
              <Chip
                id="menuOrderingOption"
                title={"Ordering option"}
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
                id="menuSpecifyMenu"
                selectedItems={selectedMenus}
                placeholder={"Specify Menu"}
                items={availableMenus}
                onOptionChange={(val) => {
                  setSelectedMenus(val);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} style={{display: 'flex', alignItems: 'center'}}>
              <FormControl className={classes.formControl}>
                <InputLabel id="card-mood-select-label" className={classes.moodTitle}>
                  Mood
                </InputLabel>
                <Select
                  labelId="card-mood-select-label"
                  id="menu-card-mood-select"
                  name="cardPointMoodId"
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                >
                  <MenuItem value={""}>---</MenuItem>
                  {moods.map((mood) => (
                    <MenuItem key={mood.id} value={mood.id}>
                      {mood.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className={classes.submitBtn}>
            <Button id="saveMenuItem" variant="contained" onClick={addOrUpdateItems}>
              Save Item
            </Button>
          </div>
        </form>

        <Dialog
          open={selectImagesDialogOpen}
          onClose={() => {
            setSelectImagesDialogOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"className={classes.DialogTitle}>
            Select Images for Card
            <DialogClose
              onClose={() => {
                setSelectImagesDialogOpen(false);
              }}
            />
          </DialogTitle>
          <DialogContent>
            <ImageList id="menuItemImgList" rowHeight={180} cols={3}>
              {uploadedPictures &&
                sortByName(uploadedPictures).map((item, index) => (
                  <ImageListItem className="menuItemImg" key={item.key}>
                    <img src={`${CF_URL}/${item.key}`} alt={item.title} />
                    <ImageListItemBar
                      title={getFileName(item?.key || "Hello")}
                      actionIcon={
                        <IconButton className={classes.icon}>
                          {selectedImages.includes(item.key) ? (
                            <CheckCircleOutlined
                              style={{ color: "white" }}
                              onClick={() => {
                                setSelectedImages(selectedImages.filter((i) => i !== item.key));
                              }}
                            />
                          ) : (
                            <AddCircleOutline
                              id={"addMenuItemImg" + index}
                              style={{ color: "white" }}
                              onClick={() => {
                                setSelectedImages([...selectedImages, item.key]);
                                setError({ ...error, pictures: "" });
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
              id="btnSelMenuItem"
              onClick={() => {
                setSelectImagesDialogOpen(false);
              }}
              color="primary"
              autoFocus
            >
              Add Selected Images
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
};

export default AddMenuItem;
