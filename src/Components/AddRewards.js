import React, { useState, useEffect, useRef,useMemo } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Storage, API, graphqlOperation, Auth } from "aws-amplify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import { Button } from "@material-ui/core";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ImageUpload from "Components/ImageUpload";
import DialogClose from "Components/Dialog/DialogClose";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import EditIcon from "@mui/icons-material/Edit";
import { useRestaurant } from "../Context/RestaurantContext";
import Autocomplete from "@mui/material/Autocomplete";
import uuid from "uuid-random";
import aws_exports from "../aws-exports";
import { emitCustomEvent } from "react-custom-events";
import { createReward,updateRestaurantRewardsById } from "../graphql/mutations";
import { toast } from "react-toastify";
import Loading from "./Loading";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Paper from "@material-ui/core/Paper";
import { getFileName, sortBy} from "../utils";
import { CF_URL } from "consts";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  main: {
    width: "100%",
    padding: "20px",
    "@media (max-width:450px)": {
      padding: "0 0 20px",
    },
  },
  tabContainer: {
    width: "100%",
    borderBottom: "1px solid gray",
  },
  tabcontent: {
    marginTop: "20px",
  },
  textfield: {
    marginBottom: "20px",
  },
  inputfieldcontainer: {
    marginTop: "20px",
    position: "relative",
  },
  calenderElement: {
    position: "absolute",
    top: 85,
    border: "1px solid #ccc",
    zIndex: 999,
    "@media(max-width:450px)": {
      width: "-webkit-fill-available",
    },
    "& .rdrMonthAndYearWrapper": {
      "@media(max-width:370px)": {
        height: "unset",
        display: "initial",
      },
    },
  },
  header: {
    marginBottom: 10,
  },
  dateRangePicker: {
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
  },
  inputlabel: {
    marginTop: 8,
    fontWeight: "500 !important",
    marginLeft: 10,
  },
  placeholder: {
    color: "#aaa",
    textOverflow: "ellipsis",
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  description: {
    display: "flex",
    flexDirection: "Row",
    justifyContent: "space-between",
    backgroundColor: "#c6cbff80",
    marginTop: 5,
    borderRadius: 5,
    "& .MuiInputLabel-root": {
      color: "#5959d8",
    },
  },
  dialogcontent: {
    minWidth: "400px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width : 465px)": {
      minWidth: "330px",
    },
    "@media (max-width : 400px)": {
      minWidth: "300px",
    },
    "@media (max-width : 360px)": {
      minWidth: "280px",
    },
    "@media (max-width : 340px)": {
      minWidth: "250px",
    },
  },
  DialogTitle: {
    "& h2": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "@media (max-width : 465px)": {
        fontSize: "16px",
        width: "100%",
      },
    },
  },
  modaltextfield: {
    width: "90%",
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
  },
  icon: {
		color: 'white !important',
	},
}));

const InitialState = {
  rewardTitle: "",
  rewards: "",
  redeemReward: "",
  pictures: "",
  redeemRewardDescription:"",
};

const AddRewards = ({ restaurantDetails, modeOfOperation, handleClose, existingRewards }) => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [calender, setCalender] = useState(false);
  const [modalopen, setModalopen] = useState(false);
  const [title, setTitle] = useState(false);
  const [modalinputvalue, setModalinputvalue] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [modalheader, setmodalheader] = useState("");
  const [radiovalue, setRadioValue] = useState("");
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState({});
  const [radiobuttonvalue, setRadiobuttonvalue] = useState("");
  const [state, setState] = React.useState(InitialState);
  const [fielderror, setFieldError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages,setSelectedImages] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  const refOne = useRef(null);
  const classes = useStyles();
  const isEdit = `${modeOfOperation}`.toLowerCase() === 'edit';
  const isView = `${modeOfOperation}`.toLowerCase() === "view";

  const { restaurant, setRestaurant } = useRestaurant();

  useEffect(() => {
    document.addEventListener("click", hideonOutsideClick, true);
  }, []);

  useMemo(() => {
        if(existingRewards?.id)
        {
          console.log(existingRewards,'exisiting rewards');
          let inputValue = {};
          inputValue.rewardTitle = existingRewards?.name;
          inputValue.rewards = existingRewards?.maxRewardsAvailable ===  "Unlimited" ? "Unlimited" :"Specify Number";
          inputValue.redeemReward = existingRewards?.promoCode ? "Code" : "Link";
          inputValue.redeemRewardDescription = existingRewards?.promoCode || existingRewards?.promoUrl;

          if(existingRewards?.maxRewardsAvailable !==  "Unlimited")
          {
            setRewardDescription(existingRewards?.maxRewardsAvailable);
          }

          const startDate = existingRewards?.startDate?.toLocaleString();
          const endDate = existingRewards?.expirationDate?.toLocaleString();

          setDate([{
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: "selection",
          }])

          setState(inputValue);
          setModalinputvalue(existingRewards?.maxRewardsAvailable !== "Unlimited" ? existingRewards?.maxRewardsAvailable : "")
          setRadioValue(existingRewards?.isPromoAvailableToFlollowers ? "" : "Available to Everyone");
          setRadiobuttonvalue(existingRewards?.radiusAvailableMiles > 0 ? existingRewards?.radiusAvailableMiles : "");
          setModalopen(false);


          const image = existingRewards?.file || [];
          setSelectedImages([image]?.map((item) => item.key));
        }
  },[existingRewards])

  useMemo(() => {
    if (selectedImages.length > 0 || pictures?.length > 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [selectedImages, pictures]);

  useEffect(() => {
    if (restaurantDetails?.id) {
      setRestaurant(restaurantDetails);
    }
  }, [restaurantDetails]);

  const removeSelectedImage = (image) => {
    setSelectedImages(selectedImages.filter((j) => j !== image));
    setState({
      ...state,
      pictures: '',
    });
  };

  const hideonOutsideClick = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setCalender(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handledropdownchange = (newvalue) => {
    if (newvalue === "Unlimited" || newvalue === "Specify Number") {
      setState({
        ...state,
        rewards: newvalue,
      });
      setError({
        ...error,
        rewards: "",
      });
      if (newvalue !== "Unlimited") {
        setTitle(newvalue); // TODO: It is used for set title in modal
        setModalopen(true);
        setmodalheader("Number of Rewards");
      }
      else {
        setRewardDescription("");
      }
    }
  };
  const handlecodeorlinkdropdown = (newvalue) => {
    if (newvalue === "Link" || newvalue === "Code") {
      setState({
        ...state,
        redeemReward: newvalue,
      });
      setError({
        ...error,
        redeemReward: "",
      });
      setmodalheader("How Should users redeemed this reward?");
      setTitle(newvalue);
      setModalopen(true);
    }
  };

  const urlPatternValidation = (URL) => {
    const regex = new RegExp("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?");
    return regex.test(URL);
  };

  const onsubmitclick = () => {
    if (modalinputvalue === "") {
      setFieldError(true);
    } else {
      if (title === "Link" || title === "Code") {
        if (title === "Link") {
          if (urlPatternValidation(modalinputvalue)) {
            setState({
              ...state,
              redeemRewardDescription: modalinputvalue,
            });
            setFieldError(false);
            setModalopen(false);
          } else {
            setFieldError(true);
          }
        } else {
          setState({
            ...state,
            redeemRewardDescription: modalinputvalue,
          });
          setModalopen(false);
          setFieldError(false);
        }
      } else if (title === "Radius in miles") {
        setRadiobuttonvalue(modalinputvalue);
        setModalopen(false);
        setFieldError(false);
        setError({
          ...error,
          miles: "",
        });
      } else {
        setRewardDescription(modalinputvalue);
        setModalopen(false);
        setFieldError(false);
      }
    }
  };

  const oninputChange = (e) => {
    setModalinputvalue(e.target.value);
  };

  const closemodal = () => {
    setModalopen(false);
    setFieldError(false);
  };

  const onDrop = (picture) => {
    setState({
      ...state,
      pictures: picture,
    });
    setError({
      ...error,
      pictures: "",
    });
    setPictures(picture);
  };

  const handleRadiobutton = (e) => {
    setRadioValue(e.target.value);
    setRadiobuttonvalue("");
    setError({
      ...error,
      miles: "",
    });
    if (e.target.value !== "") {
      setmodalheader("What is the Radius from the restaurant?");
      setModalopen(true);
      setTitle("Radius in miles");
    }
  };
  const handlebutton = () => {
    setmodalheader("What is the Radius from the restaurant?");
    setModalopen(true);
    setTitle("Radius in miles");
  };

  const validation = (state) => {
    let error = {};
    let isError = false;
    if (!state?.rewardTitle) {
      error.rewardTitle = "Please enter a reward title";
      isError=true;
    }
    if (!state?.rewards) {
      error.rewards = "Please choose valid value";
      isError = true;
    }
    if (state?.rewards === 'Specify Number' && rewardDescription === '') {
      error.rewards = "Please choose valid value";
      isError = true;
    }
    if (!state?.redeemReward || !state?.redeemRewardDescription) {
      error.redeemReward = "Please choose valid value";
      isError = true;
    }
    if(radiovalue.toLocaleLowerCase().trim() && !radiobuttonvalue)
    {
      error.miles = "Please enter a miles";
      isError = true;
    }
    if ((pictures?.length === 0 || !state?.pictures) && selectedImages?.length === 0) {
      error.pictures = "Please choose image";
      isError = true;
    }

    setError(error);
    return !isError;
  };

  const onClickCreateReward = (event) => {
    event.preventDefault();
    if (validation(state)) {
      handleCreateReward();
    }
  };


  const handleCreateReward = async () => {
    setLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
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

      let files = {};

      let uploads = await Promise.all(promises);

      if (uploads.length > 0) {
        uploads.forEach((u) => {
          files = {
            key: u.key,
            bucket: aws_exports.aws_user_files_s3_bucket,
            region: aws_exports.aws_project_region,
          };
        });
      }

      const input = {
        name: state.rewardTitle,
        file: (files.hasOwnProperty('bucket') ? files : existingRewards?.file)|| {},
        maxRewardsAvailable: state.rewards !== "Unlimited" ? rewardDescription : state.rewards,
        isPromoAvailableToFlollowers:(!radiobuttonvalue || !radiovalue.toLocaleLowerCase()) ? true : false,
        radiusAvailableMiles:radiobuttonvalue || 0,
        promoCode: state.redeemReward === "Code" ? state.redeemRewardDescription : "",
        promoUrl: state.redeemReward === "Link" ? state.redeemRewardDescription : "",
        startDate:date[0].startDate.toISOString(),
        expirationDate: date[0].endDate.toISOString(),
        userProfileID: userInfo?.username,
        restaurantID: restaurant?.id,
      };

      let result = {};
      if(isEdit)
      {
        input.id = existingRewards?.id;
        result = await API.graphql(graphqlOperation(updateRestaurantRewardsById, { input }));
      }
      else
      {
         result = await API.graphql(graphqlOperation(createReward, { input }));
      }

      emitCustomEvent("new-reward-created",{data: restaurant?.id});
      toast.success(`Reward ${isEdit ? "edit" : "created"} successfully`);
      setLoading(false);
      handleClose && handleClose();
    } catch (error) {
      console.log("create reward error -->>", error);
      toast.error("Somthing went wrong!");
      setLoading(false);
    }
  };

  const handletitle = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      rewardTitle: value,
    });
    setError({
      ...error,
      rewardTitle: "",
    });
  };
  const menuItemClick = (value) => {
    if (radiovalue === value) {
      setTitle("Radius in miles");
      setModalopen(true);
      setmodalheader("What is the Radius from the restaurant?");
    }
  };
  return (
    <div className={classes.main}>
      {loading && <Loading title={"Loading..Please wait"} />}
      <div className={classes.tabContainer}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Create Rewards" />
          <Tab label={restaurant?.name} disabled />
        </Tabs>
      </div>
      <div className={classes.tabcontent}>
        <div className={classes.textfield}>
          <TextField
            required
            fullWidth
            name="rewardTitle"
            label="Enter Reward Title"
            id="fullWidth"
            error={error.rewardTitle}
            helperText={error.rewardTitle}
            onChange={handletitle}
            value={state?.rewardTitle}
          />
        </div>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue=""
          value={radiovalue}
          onChange={handleRadiobutton}
          name="radio-buttons-group"
        >
          <FormControlLabel id="availableToResFollower" value="" control={<Radio />} label="Available to restaurant followers" />
          <FormControlLabel
            value="Available to Everyone"
            control={<Radio />}
            onClick={() => menuItemClick("Available to Everyone")}
            label={
              <div
                style={{
                  display: "flex",
                  flexDirection: "Row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>Available to Everyone</div>
                {radiobuttonvalue && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    &nbsp;{`${radiobuttonvalue} Miles`}
                    <IconButton onClick={handlebutton}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </div>
                )}
              </div>
            }
          />
        </RadioGroup>
        {error.miles && <Typography variant="caption" style={{color:'red'}}>{error.miles}</Typography> }
        <Grid container spacing={1} className={classes.inputfieldcontainer}>
          <Grid item xs={12} md={4} className={classes.calenderWrap}>
            <InputLabel className={classes.header}>Expiration</InputLabel>
            <TextField
              value={`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`}
              onClick={() => setCalender((calender) => !calender)}
              className={classes.dateRangePicker}
            />
            <div ref={refOne}>
              {calender && (
                <DateRange
                  id="dateRangePicker"
                  onChange={(item) => setDate([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  months={1}
                  direction="horizontal"
                  className={classes.calenderElement}
                  minDate={new Date()}
                />
              )}
            </div>
          </Grid>
          <Grid item className={classes.dropdown} xs={12} md={4}>
            <InputLabel id="inputNumberOfRewards" className={classes.header}>
              Number of Rewards
            </InputLabel>
            <FormControl fullWidth error={error.rewards}>
              <Autocomplete
                value={state?.rewards}
                disablePortal
                disableClearable
                id="numRewardsAutoComplete"
                options={["Unlimited", "Specify Number"]}
                onChange={(event, newInputValue) => {
                  handledropdownchange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} error={error.rewards} placeholder={"Choose Total Number of Reward"} />
                )}
              />
              <FormHelperText>{error.rewards}</FormHelperText>
            </FormControl>
            {rewardDescription && (
              <div className={classes.description}>
                <InputLabel id="unlimited" className={classes.inputlabel}>{rewardDescription}</InputLabel>
                <IconButton
                  onClick={() => {
                    setRewardDescription('');
                    setTitle("");
                    setState({
                      ...state,
                      rewards: "",
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item className={classes.chooseredeemdropdown} xs={12} md={4}>
            <InputLabel id="inputReddemedRewards" className={classes.header}>
              How Should users redeemed this reward?
            </InputLabel>
            <FormControl fullWidth error={error.redeemReward}>
              <Autocomplete
                value={state?.redeemReward}
                disablePortal
                disableClearable
                id="redeemRewardAutoComplete"
                options={["Link", "Code"]}
                onChange={(event, newInputValue) => {
                  handlecodeorlinkdropdown(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} error={error.redeemReward} placeholder={"Redeem via reward code or URL"} />
                )}
              />
              <FormHelperText>{error.redeemReward}</FormHelperText>
            </FormControl>
            {state.redeemRewardDescription && (
              <div className={classes.description}>
                <InputLabel className={classes.inputlabel}>{state.redeemRewardDescription}</InputLabel>
                <IconButton
                 id="cancelRedeemReward"
                  onClick={() => {
                    setTitle("");
                    setState({
                      ...state,
                      redeemReward: "",
                      redeemRewardDescription:"",
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </Grid>
        </Grid>
        <div className={classes.tabcontent}>
          <ImageUpload
            onDrop={onDrop}
            acceptType={["jpg", "png", "jpeg", "gif"]}
            buttonText="Upload rewards cover image"
            maxFileSize={10242880}
            disable={isDisable}
            name="uploadRewardImg"
            />
          {error.pictures && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error.pictures}</div>}
        </div>

        {selectedImages?.length > 0 &&
            <Paper style={{ minHeight: "100px", width: "100%" }}>
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
                            <IconButton onClick={() => removeSelectedImage(image)} className={classes.icon}>
                              <DeleteIcon />
                            </IconButton>
                          )
                        }
                        className={classes.titleBar}
                      />
                    </ImageListItem>
                  ))}

                </ImageList>
            </Paper>
        }

        <div className={classes.tabcontent}>
          <Button variant="contained" color="default" id="btnAddEditReward" onClick={onClickCreateReward}>
            {isEdit ? "Edit" :"Create"}  Reward
          </Button>
        </div>
      </div>
      {modalopen && (
        <Modal
          title={title}
          onsubmitclick={onsubmitclick}
          oninputChange={oninputChange}
          onClose={closemodal}
          modalheader={modalheader}
          textfieldvalue={radiobuttonvalue}
          fielderror={fielderror}
        />
      )}
    </div>
  );
};

const Modal = (props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog aria-labelledby="simple-dialog-title" open={true} disableEnforceFocus maxWidth={"xs"}>
        <DialogTitle id="rewardInputDialogTitle" className={classes.DialogTitle}>
          {props.modalheader}
          <DialogClose onClose={props.onClose} />
        </DialogTitle>
        <div className={classes.dialogcontent}>
          <TextField
            defaultValue={props.title === "Radius in miles" ? props.textfieldvalue : ""}
            type={props.title === "Radius in miles" || props.title === "Specify Number" ? "number" : "string"}
            className={classes.modaltextfield}
            label={props.title}
            onChange={props.oninputChange}
            name="rewardRadiusInput"
          />
          {props.fielderror && (
            <div
              style={{
                color: "#d32f2f",
                alignSelf: "start",
                marginLeft: "20px",
              }}
            >
              {"Please fill the valid value in field"}
            </div>
          )}
          <div style={{ margin: "20px 20px 0", alignSelf: "end" }}>
            <Button variant="contained" id="btnAddRewardCode" onClick={props.onsubmitclick}>
              Add
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddRewards;
