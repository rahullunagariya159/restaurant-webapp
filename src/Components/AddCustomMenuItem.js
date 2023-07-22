import {useMemo, useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import {CheckCircleOutlined} from '@material-ui/icons';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Loading from './Loading';
import {CF_URL} from 'consts';
import {useQuery} from "@apollo/client";
import {useRestaurant} from "../Context/RestaurantContext";
import {createRestaurantCustomMenu,updateRestaurantCustomMenu,addCardsToCustomMenu,updateCardsToCustomMenu,deleteByCustomRestaurantMenu} from '../graphql/mutations';
import {getCardsByRestaurantId,searchIsCustomUrlExisits,} from '../graphql/queries';
import {getFileName, slugifyString} from "../utils";
import {toast} from "react-toastify";
import {useMutation,useLazyQuery} from "@apollo/react-hooks";
import {emitCustomEvent} from "react-custom-events";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  imgUploader: {
    width: '100%'
  },
  submitBtn: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  top: {
    marginTop: '25px',
  },
  icon: {
    color: 'white',
  },
  txtSlugname:{
    marginBottom: '20px',
  },
  btnNextPrev : {
    marginLeft : '10px',
    marginRight : '10px'
  },
  uploadImageError: {
    color:'#f44336',
    fontWeight: '400',
    fontSize: '14px',
    margin: '20px 0'
  }
}));

const AddCustomMenuItem = ({modeOfOperation,handleClose,customMenuItem}) => {
  const classes = useStyles();
  const {
    getRestaurantResponse,
    restaurant,
    restaurantID,
    userdetails
  } = useRestaurant();

  const [name, setName] = useState('');
  const [slugName, setSlugName] = useState('');
  const [step,setStep] = useState(1);
  const totalSteps = 2;
  //selected menu item image's
  const [selectedImages, setSelectedImages] = useState([]);
  //selected menu item id's
  const [menuItemCardId, setMenuItemCardId] = useState([]);
  const [orgMenuItemCardId, setOrgMenuItemCardId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [didMount,setDidMount] = useState(true);
  const [isEditSlug,setIsEditSlug] = useState(false);
  const [isMenuName, setIsMenuName] = useState(false);
  const [isMenuItem, setIsMenuItem] = useState(false);
  let id = userdetails.restaurantContact;
  const isEdit = modeOfOperation === "edit" ? true : false
  const getCardsByRestaurantIdResponse = useQuery(getCardsByRestaurantId, {
    variables: {
      id: id
    },
    onCompleted: () => {
      setLoading(false)
    }
  });

  let menuItems = getCardsByRestaurantIdResponse?.data?.getRestaurant?.cards?.items || [];
  const [createRestaurantCustomMenuByItems] = useMutation(createRestaurantCustomMenu)
  const [updateRestaurantCustomMenuByItems] = useMutation(updateRestaurantCustomMenu)
  const [addCardsToCustomMenuByItems] = useMutation(addCardsToCustomMenu)
  const [updateCardsToCustomMenuByItems] = useMutation(updateCardsToCustomMenu)
  const [deleteByCustomRestaurantMenuById] = useMutation(deleteByCustomRestaurantMenu)
  const [getSearchIsCustomUrlExisits] = useLazyQuery(searchIsCustomUrlExisits)
  const isInValidSlug = !isSlugValid || !slugName;

  const handleSetSlugName = (value) => {
    setSlugName(slugifyString(value));
    setIsEditSlug(true)
  }

  useMemo(() => {
    if(!didMount){
    handleSetSlugName(name);
  }

  },[name])

  useMemo (() => {
        if(customMenuItem)
        {
          setName(customMenuItem?.customMenuName);
          setSlugName(customMenuItem?.customMenuUrl);
          const menuItemArr = [];
          customMenuItem?.cards?.items.length > 0 && customMenuItem?.cards?.items?.map((cardMenu) => menuItemArr.push(cardMenu?.cardPoint?.id));
          setMenuItemCardId(menuItemArr);
          setOrgMenuItemCardId(menuItemArr);
          const itemArr = [];
          menuItems?.length > 0 && menuItems?.map((item) => {
              if(menuItemArr?.includes(item?.id))
              {
                itemArr.push(item.cardPointFile[0].key);
              }
          })
          setSelectedImages(itemArr)
        }
  },[customMenuItem])

  let time = null;

  useEffect(() => {
    if(slugName){
      if(time){
        clearTimeout(time)
      }
      time = setTimeout(function(){
        validateSlug(slugName)
      }, 2000)
    }
  }, [slugName]);

  const addOrUpdateItems = () => {
      // setIsMenuItem(false)
      createItem()
    }

  useEffect(() => {
    setDidMount(false);
  },[])

  const validateSlug = async(slug) => {
    try{
      let getSearchRestaurantUrlExistsResp  = null;
      if(isEdit)
      {
        getSearchRestaurantUrlExistsResp = await getSearchIsCustomUrlExisits({
          variables: {
            "filter": {customMenuUrl: { eq: slug},and: {cityNameSlug: {eq: restaurant.cityNameSlug}, and:{id : {ne: customMenuItem.id}}}}
          }
        })
      }
      else {
        getSearchRestaurantUrlExistsResp = await getSearchIsCustomUrlExisits({
          variables: {
            "filter": {customMenuUrl: { eq: slug},and: {cityNameSlug: {eq: restaurant.cityNameSlug}}}
          }
        })
      }

      const valid = getSearchRestaurantUrlExistsResp?.data.searchRestaurantCustomMenus?.total <= 0;
      setIsSlugValid(valid)
      return valid;
    } catch (e){
      setLoading(false)
      return false
    }
  }

  const handleAddCardToCustomMenu = (cardPointID,restaurantCustomMenuID,id) => {
      return addCardsToCustomMenuByItems({
        variables:{
          input : {
            cardPointID : cardPointID,
            restaurantCustomMenuID : restaurantCustomMenuID,
            id: id,
          }
        }
      });
  }

  const createItem = async () => {
    setLoading(true);
     let input = {
      customMenuName: name,
      customCardIds: menuItemCardId,
      restaurantID,
      customMenuUrl: slugName
    };

    if(isEditSlug)
    {
      const isValidSlug = await validateSlug(slugName);
      if(!isValidSlug || isInValidSlug)
      {
        toast.error('Please enter valid/unique restaurant menu url');
        setLoading(false);
        return false;
      }
    }

   try {
     if(isEdit)
     {
      input.id = customMenuItem.id;
       const updateCustomMenuRes =  await updateRestaurantCustomMenuByItems({
          variables:{
            input
          }
        });

        const matchItems = orgMenuItemCardId.filter(item => menuItemCardId.includes(item));
        const removedItem = orgMenuItemCardId.filter(item => !menuItemCardId.includes(item));
        const newAddedItem = menuItemCardId.filter(item => !orgMenuItemCardId.includes(item));

        if(removedItem?.length > 0)
        {
          const removeItemPromises = removedItem?.map((id) => deleteByCustomRestaurantMenuById({
            variables:{
              input : {
                id:id +"-"+customMenuItem.id
              }
            }
          }))
          await Promise.all(removeItemPromises);
        }

        if(newAddedItem?.length > 0)
        {
          const addItemPromises = newAddedItem?.map((item) => handleAddCardToCustomMenu(item,updateCustomMenuRes?.data?.updateRestaurantCustomMenu?.id,item + "-" + updateCustomMenuRes?.data?.updateRestaurantCustomMenu?.id))
          await Promise.all(addItemPromises);
        }
        toast.success('Menu has been edited');
     }
     else
     {
        input.cityNameSlug = restaurant.cityNameSlug;
        input.restaurantUrl = restaurant.restaurantUrl;
        const customMenuRes = await createRestaurantCustomMenuByItems({
              variables:{
                input
              }
            });

         const addCardsPromises = menuItemCardId.map((cardPointId) => handleAddCardToCustomMenu(cardPointId,customMenuRes.data.createRestaurantCustomMenu.id,cardPointId + "-" + customMenuRes.data.createRestaurantCustomMenu.id))

        await Promise.all(addCardsPromises);
        toast.success('Menu has been created');
      }
      setLoading(false);
      emitCustomEvent('custom-menu-updated', {data: input});
      handleClose && handleClose();
    } catch (error) {
      console.log('Encountered Error', error);
      setLoading(false);
      toast.error('Error while adding item');
    }
  };

  const removeSelectedImage = (image) => {
    setSelectedImages(selectedImages.filter((j) => j !== image))
  }

  if (getRestaurantResponse.loading || !restaurant) {
    return <Loading title={'Loading..Please wait'}/>;
  }

  if (!getRestaurantResponse.data.getRestaurant) {
    return <Loading title={'Loading..Please wait'}/>;
  }

  const handleAddItem = (item) => {
    setSelectedImages(
      selectedImages.filter((i) => i !== item.cardPointFile[0].key),
    );
    setMenuItemCardId(menuItemCardId.filter((i) => i !== item.id))
  }

  const handleRemoveItem = (item) => {
    setIsMenuItem(false)
    setSelectedImages([...selectedImages, item.cardPointFile[0].key]);
    setMenuItemCardId([...menuItemCardId, item.id]);
  }

  const handleNextStep = () => {
    if(!name){
      setIsMenuName(true)
    } else{
      setIsMenuName(false)
    }
    if(!isInValidSlug)
    {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const renderCustomMenuForm =  () => {
        return <>
                  <div>
                  <TextField
                    name="cMenuName"
                    id="standard-basic"
                    label="Menu name"
                    value={name}
                    fullWidth
                    onChange={(e) => {setName(e.target.value); setIsMenuName(false)}}
                    error={isMenuName}
                    helperText={isMenuName && 'Please enter Menu Name'}
                  />
                </div>
                <div>
                  <TextField
                    name="cMenuUrl"
                    id="standard-basic"
                    label="Menu URL"
                    value={slugName}
                    fullWidth
                    onChange={(e) => handleSetSlugName(e.target.value)}
                    className={classes.txtSlugname}
                    error={!isSlugValid}
                    helperText={isInValidSlug? "Please enter valid/unique restaurant menu url " : "Please specify the restaurant menu slug url unique based on city"}
                  />
                </div>
            </>
    }

  const renderCustomMenuItemList = () => {
          return <>
                  <ImageList rowHeight={180} cols={3} id="cmDefaultImg">
                    {menuItems?.length > 0 && menuItems?.map((item,index) => (
                      <ImageListItem className='cmImgItem' key={item.key}>
                        <img src={`${CF_URL}/${item?.cardPointFile[0]?.key}`} alt={item?.name}/>
                        <ImageListItemBar
                          title={getFileName(item?.name || '')}
                          subtitle={"Price : $" + item?.price}
                          actionIcon={
                            <IconButton className={classes.icon}>
                              {(selectedImages?.length > 0 && selectedImages?.includes(item.cardPointFile[0].key)) || (menuItemCardId?.length > 0 && menuItemCardId?.includes(item.id)) ? (
                                <CheckCircleOutlined
                                  style={{color: 'green'}}
                                  onClick={() => handleAddItem(item)}
                                  className="add-circle-outline"
                                  id={"addCMImage" + index}
                                />
                              ) : (
                                <AddCircleOutline
                                  id={"addCMImage" + index}
                                  style={{color: 'white'}}
                                  onClick={() => handleRemoveItem(item)}
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
                  {isMenuItem && <Typography className={classes.uploadImageError}>{'Please choose image'}</Typography>}
               </>
  }


  const renderCustomeMenuSteps = () => {
        switch (step) {
          case 1:
            return renderCustomMenuForm();
          case 2:
            return renderCustomMenuItemList();
          default:
            break;
        }
  }

  if (restaurant) {
    return (
      <Container maxWidth="md">
        {loading && <Loading title={'Loading..Please wait'}/>}

        <div className={classes.top}>
          <strong>{restaurant.name}</strong>
          <p>
            <span>{restaurant.address}</span>
            <br/>
            <span>{restaurant.city}</span>,<span>{restaurant.zip}</span>
          </p>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
            {renderCustomeMenuSteps()}

          <div className={classes.submitBtn}>
            {step > 1 &&
            <Button
                  id="btnCMPrev"
                  variant="contained"
                  color="default"
                  onClick={() => handlePrevStep()}
                  className={classes.btnNextPrev}>
                  Previous
            </Button>}

            {step < totalSteps && <Button
                  id="btnCMNext"
                  variant="contained"
                  color="default"
                  onClick={() => handleNextStep()}
                  className={classes.btnNextPrev}
                  >
                  Next
            </Button>
            }

            {step === totalSteps &&
             <Button variant="contained" id="btnCMSave" onClick={addOrUpdateItems}  className={classes.btnNextPrev}>
              Save Item
            </Button>
            }
          </div>
        </form>
        {/* END */}
      </Container>
    );
  }
};

export default AddCustomMenuItem;
