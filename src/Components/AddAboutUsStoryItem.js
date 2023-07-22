import { useEffect, useState, useMemo } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import Loading from "./Loading";
import { CF_URL } from "consts";
import { useRestaurant } from "../Context/RestaurantContext";
import { createRestaurantStory, sendEmailToAdmin, updateRestaurantStory } from "../graphql/mutations";
import DialogClose from "./Dialog/DialogClose";
import { getFileName, sortBy, sortByName, uploadPics,uploadVideo } from "../utils";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { emitCustomEvent } from "react-custom-events";
import { Typography } from "@material-ui/core";
import  FileUpload from "./FileUpload";

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
}));

const AddAboutUsStoryItem = ({ modeOfOperation = "add", item, handleClose }) => {
  const classes = useStyles();
  const { getRestaurantResponse, uploadedPictures, restaurant, restaurantID } = useRestaurant();

  const [createRestaurantStoryCard] = useMutation(createRestaurantStory);
  const [updateRestaurantStoryCard] = useMutation(updateRestaurantStory);

  const isView = `${modeOfOperation}`.toLowerCase() === "view";
  const isEdit = `${modeOfOperation}`.toLowerCase() === "edit";
  const NAME_CHARACTER_LIMIT = 50;
  const DESCRIPTION_CHARACTER_LIMIT = 100;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  //select images
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectImagesDialogOpen, setSelectImagesDialogOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [videoDuration,setVideDuration] = useState(0.0)
  // Loading State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isVideoUpload,setIsVideoUpload] = useState(false);

  useEffect(() => {
    if (item?.id) {
      setName(item?.title);
      setDescription(item?.description);

      const picture = item?.storyFile || [];
      setSelectedImages(picture.map((item) => item.key));

      setVideDuration(item?.videoDuration || false);
      setIsVideoUpload(item?.isMediaTypeVideo || false);
    }
  }, [item]);

  useMemo(() => {
    if (selectedImages?.length > 0 || pictures?.length > 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [selectedImages, pictures]);

  const onSelectedImages = (item) => {
    setSelectedImages([item.key]);
    setPictures([]);
  };

  const onVideoLoadedMetadata = (event,videoPlayerRef) => {
    setVideDuration(videoPlayerRef?.current?.duration);
  }

  const hanldeValidation = () => {
    if (!name) {
      setError({ key: "title", message: "Please enter a title" });
      return false
    } else if (!description) {
      setError({ key: "description", message: "Please enter a description" });
      return false
    }
    else if(!selectedImages?.length && !pictures?.length) {
      setError({ key: "picture", message: "Please choose image" });
      return false
    }
    return true
  };


  const onDrop = (picture) => {
    setPictures(picture);
    setSelectedImages([]);
    setError({});
    setIsVideoUpload(!isVideoUpload);
  };
  const addOrUpdateItems = () => {
   if(hanldeValidation()){
     createStory();
   }
  };

  const createStory = async () => {
    // Uplaod all the images first
    setLoading(true);
    let input = {};
    input = {
      // "createdAt": "$createdAt",
      description,
      restaurantID,
      title: name,
      restaurantUrl: restaurant.restaurantUrl,
      cityNameSlug: restaurant.cityNameSlug,
    };
    let files = [];
    if (pictures[0]?.type?.split('/')[0] === 'video') {
      files = await uploadVideo(pictures);
      input.isMediaTypeVideo = true;
      input.videoDuration = videoDuration;
    }
    else if(pictures[0]?.type?.split('/')[0] === "image")
    {
      files = await uploadPics(pictures);
      input.isMediaTypeVideo = false;
    }
    else if(selectedImages?.length > 0)
    {
      input.isMediaTypeVideo = isVideoUpload;
    }
    const filesFromRestaurant = uploadedPictures && uploadedPictures.filter((pic) => selectedImages.includes(pic.key));

    if(filesFromRestaurant?.length > 0 || files?.length > 0)
    {
      input.storyFile = [].concat(filesFromRestaurant, files).filter((item) => {
        return {
          bucket: item.bucket,
          key: item.key,
          region: item.region,
        };
      })
    }

    try {
      if (isEdit) {
        input.id = item?.id;
        await updateRestaurantStoryCard({
          variables: {
            input,
          },
        });
        toast.success("Story has been edited successfully");
      } else {
        await createRestaurantStoryCard({
          variables: {
            input,
          },
        });
        // Send Email
        let cardInfoo = JSON.stringify({
          context: "ADD",
          email: "admin@fooddiscoveryapp.com",
          restaurant: restaurant.name,
          name,
          description,
          link: `https://main.d11dtbgh84vt88.amplifyapp.com/pending/${restaurantID}`,
        });

        API.graphql(graphqlOperation(sendEmailToAdmin, { cardInformation: cardInfoo }));
        toast.success("New story has been added");
      }
      emitCustomEvent("story-item-updated", { data: input });
      handleClose && handleClose();
    } catch (error) {
      console.log("Encountered Error", error);
      toast.error(isEdit ? "Error while updating story" : "Error while adding story");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const removeSelectedImage = (image) => {
    setSelectedImages(selectedImages.filter((j) => j !== image));
  };

  const renderFileUpload = useMemo(() => {
    return  (<FileUpload inputName="uploadStoryImg" onHandleDrop={onDrop} urls={(isVideoUpload && selectedImages) || []} disable={isDisable} onVideoLoadMetaData={onVideoLoadedMetadata} />)
 },[selectedImages,isDisable])

  if (getRestaurantResponse.loading || !restaurant) {
    return <Loading title={"Loading..Please wait"} />;
  }

  if (!getRestaurantResponse.data.getRestaurant) {
    return <Loading title={"Loading..Please wait"} />;
    // return <Redirect to="/add-restaurant"/>
  }

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
              disabled={isView}
              id="standard-basic"
              name="title"
              label="Title"
              value={name}
              fullWidth
              error={error?.key === "title" ? true : false}
              onChange={(e) => {setName(e.target.value);setError({})}}
              inputProps={{ maxLength: NAME_CHARACTER_LIMIT }}
              helperText={error?.key === "title" ? error?.message : ` ${name.length}/${NAME_CHARACTER_LIMIT}`}
              required
            />
          </div>
          <div>
            <TextField
              disabled={isView}
              name="description"
              id="standard-basic"
              label="Description"
              value={description}
              multiline={4}
              fullWidth
              error={error?.key === "description" ? true : false}
              onChange={(e) => {setDescription(e.target.value);setError({})}}
              inputProps={{ maxLength: DESCRIPTION_CHARACTER_LIMIT }}
              helperText={error?.key === "description" ? error?.message : `${description.length}/${DESCRIPTION_CHARACTER_LIMIT}`}
              required
            />
          </div>

          {/* New Uploader */}
          {!isView && (
            <div className={`${classes.imgUploader}`}>
              {renderFileUpload}
            </div>
          )}
          {/* end */}
          <Typography style={{color:'red'}}  align="center">
                {error?.key === "picture" ? error?.message : ""}
              </Typography>
          <Paper style={{ minHeight: "100px", width: "100%" }}>
           { !isVideoUpload &&
            <ImageList rowHeight={180} cols={3}>
              {sortBy(selectedImages).map((image) => (
                <ImageListItem key={image}>
                  <img src={`${CF_URL}/${image}`} alt={image} />
                  <ImageListItemBar
                    title={getFileName(image || "Hello")}
                    actionIcon={
                      isView ? (
                        <></>
                      ) : (
                        <IconButton id="btnCancelFile" className={classes.icon} onClick={() => removeSelectedImage(image)}>
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}

            </ImageList>
            }
            {!isView && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  id="btnChooseStoryImg"
                  variant="contained"
                  color="default"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    setSelectImagesDialogOpen(true);
                  }}
                  disabled={isDisable ? true : false}
                >
                  Choose Image On File
                </Button>
              </div>
            )}

          </Paper>
          {/* end */}
          {!isView && (
            <div className={classes.submitBtn}>
              <Button variant="contained" onClick={addOrUpdateItems} id="btnSaveStory">
                {isEdit ? "Update Story" : "Save Story"}
              </Button>
            </div>
          )}
        </form>

        <Dialog
          open={selectImagesDialogOpen}
          onClose={() => {
            setSelectImagesDialogOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Select Images for Card
            <DialogClose
              onClose={() => {
                setSelectImagesDialogOpen(false);
              }}
            />
          </DialogTitle>
          <DialogContent>
            <ImageList rowHeight={180} cols={3}>
              {uploadedPictures &&
                sortByName(uploadedPictures).map((item, index) => (
                  <ImageListItem key={item.key} className="storyImgItem">
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
                              id={"addStoryImage" + index}
                              style={{ color: "white" }}
                              onClick={() => onSelectedImages(item)}
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
              id="addSelectedImg"
            >
              Add Selected Image
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
};

export default AddAboutUsStoryItem;
