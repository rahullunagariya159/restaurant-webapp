import { useState, useMemo, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageUpload from '../Components/ImageUpload';
import Chip from './Chip';
import Loading from './Loading';
import MessageBox from './MessageBox';
import { CF_URL } from 'consts';
import {useQuery} from "@apollo/client";
import {useRestaurant} from "../Context/RestaurantContext";
import {
  listCuisines,
  listDiets,
  listDeliveries,
  listMoods,
} from '../graphql/queries';
import {getFileName, sortBy} from "../utils";
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
}));

const FormComponent = ({modeOfOperation, item}) => {
  const classes = useStyles();
  const {
    getRestaurantResponse,
    selectedDelivery,
    setSelectedDelivery,
    selectedMenus,
    setSelectedMenus,
    menus,
    restaurant,
  } = useRestaurant();

  const isView = `${modeOfOperation}`.toLowerCase() === 'view';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [price, setPrice] = useState('');

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
      setSelectedMood(item?.unapprovedItemMoodId)
      // setMenus(item?.menus)
      // setSelectedUrls(item?.orderOptionUrls)

      const picture = item?.picture || [];
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
  try {
    const listDeliveriesResponse = useQuery(listDeliveries);
    if(!listDeliveriesResponse.loading && !listDeliveriesResponse.error){
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

  // Message State
  const [showmessage, SetShowmessage] = useState(false);

  const onDrop = () => {
  };

  if(getRestaurantResponse.loading || !restaurant){
    return <Loading title={'Loading..Please wait'} />;
  }

  if(!getRestaurantResponse.data.getRestaurant){
    return <Loading title={'Loading..Please wait restaurant'} />;
    // return <Redirect to="/add-restaurant"/>
  }

  if (showmessage) {
    return (
      <MessageBox
        content={'A new item has been added for review'}
        action={() => SetShowmessage(false)}
      />
    );
  }

  if(restaurant){
    return (
      <Container maxWidth="md">
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
              label="Title"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              disabled={isView}
              id="standard-basic"
              label="Description"
              value={description}
              multiline={4}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>


          <div>
            <TextField
              disabled={isView}
              id="price"
              label="Price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
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
                />
            </div>
          }

          {/* end */}

          <Paper style={{ minHeight: '100px', width: '100%' }}>
            <ImageList rowHeight={180}  cols={3}>
              {sortBy(selectedImages).map((image) => (
                <ImageListItem key={image}>
                  <img src={`${CF_URL}/${image}`} alt={image} />
                  <ImageListItemBar
                    title={getFileName(image || 'Hello')}
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}
            </ImageList>

          </Paper>
          {/* end */}

          {/* Cuisine */}
          <ChipInput
            disabled={isView}
            items={cuisines}
            placeholder="Specify Cuisine"
            onOptionChange={(val) => setSelectedCuisines(val)}
            selectedItems={selectedCuisines}
          />
          {/* Diets */}
          <ChipInput
            disabled={isView}
            placeholder={'Specify Diets'}
            items={diets}
            onOptionChange={(val) => setSelectedDiets(val)}
            selectedItems={selectedDiets}
          />
          {/* Order Options */}
          <Chip
            disabled={isView}
            title={'Ordering option'}
            items={delivery}
            currentval={(val) => setSelectedDelivery(val)}
            selectedItems={selectedDelivery}
            hasText
            currentText={(val) => setSelectedUrls(val)}
            selectedText={selectedUrls}
          />

          <ChipInput
            disabled={isView}
            selectedItems={selectedMenus}
            placeholder={'Specify Menu'}
            items={availableMenus}
            onOptionChange={(val) => {
              setSelectedMenus(val);
            }}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="card-mood-select-label">Mood</InputLabel>
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
        </form>
      </Container>
    );
  }


};

export default FormComponent;
