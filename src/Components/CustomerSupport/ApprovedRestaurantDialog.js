import React, { useState, useEffect } from 'react'
import slugify from 'slugify'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import SuccessButton from "../SuccessButton";
import DialogClose from "../Dialog/DialogClose";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {getUserByEmail, searchRestaurants, SearchRestaurantUrlExists} from "../../graphql/queries";
import {createRestaurant, deleteRestaurantUnapproved, updateUserProfile,updateCustomerServiceRep} from "../../graphql/mutations";
import Loading from "../Loading";
import {useHistory} from "react-router-dom";
import {useDialog} from "../../Context/DialogProvider";
import {useRestaurant} from "../../Context/RestaurantContext";
import {emitCustomEvent} from "react-custom-events";
import {toast} from "react-toastify";

const slugOptions = {
  replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
  lower: true,      // convert to lower case, defaults to `false`
  strict: true,     // strip special characters except replacement, defaults to `false`
  // locale: 'vi',       // language code of the locale to use
  trim: false         // trim leading and trailing replacement chars, defaults to `true`
}

const ApprovedRestaurantDialog = ({restaurant}) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')
  const [isSlugValid, setIsSlugValid] = useState(true)
  const [getSearchRestaurantsByFilter] = useLazyQuery(searchRestaurants)
  const [getSearchRestaurantUrlExists] = useLazyQuery(SearchRestaurantUrlExists)
  const [deleteRestaurantUnapprovedById] = useMutation(deleteRestaurantUnapproved)
  const [createRestaurantFrom] = useMutation(createRestaurant)
  const [updateUserProfileByID] = useMutation(updateUserProfile)
  const [updateCustomerServiceRepByID] = useMutation(updateCustomerServiceRep)
  const [fetchUsersByEmail] = useLazyQuery(getUserByEmail);
  const {userdetails} = useRestaurant();

  const customerServiceRepInput = (userdetails?.customerServiceRep?.items && userdetails?.customerServiceRep?.items[0]) || {
    approvedRestaurants: []
  }

  const [openDialog, closeDialog] = useDialog();
  const onOpenDeleteConfirmationDialog = (title) => {
    openDialog({
      children: (
        <>
          <DialogContent>
            <div dangerouslySetInnerHTML={{__html: title}}></div>
          </DialogContent>
          <DialogActions>
            <Button id="btnSuccessApprovedAlert" color="secondary" onClick={redirect}>
              ok
            </Button>
          </DialogActions>
        </>
      )
    });
  };

  let time = null;

  useEffect(() => {
    if(restaurant){
      if(restaurant.slug){
        setSlug(slug)
      } else {
        setSlug(slugify(restaurant?.name || '', slugOptions))
      }
    }
  }, [restaurant]);

  useEffect(() => {
    if(slug){
      if(time){
        clearTimeout(time)
      }
      time = setTimeout(function(){
        validateSlug(slug)
      }, 2000)
    }

  }, [slug]);


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSlugChange = (event) => {
    setSlug(slugify(event.target.value || '', slugOptions))
  }

  const redirect = () => {
    history.push(`/`)
    closeDialog()
  }

  const onRestaurantApprove = async (event) => {
    try{
      setLoading(true)
      const valid = await validateSlug(slug)
      if (valid){
        // CREATE RESTAURANT
        const {
          id,
          name,
          address,
          city,
          zip,
          file,
          description,
          location,
          cuisine,
          delivery,
          orderOptionUrls,
          menus,
          contact,
        } = restaurant;
        const result = await fetchUsersByEmail({variables: { email: contact }});
        const owner = result.data.getUserByEmail.items[0];

        if(owner && owner.id){
          const resp = await createRestaurantFrom({
            variables: {
              input: {
                name,
                address,
                city,
                cityNameSlug: slugify(city, slugOptions),
                zip,
                file,
                description,
                location,
                cuisine,
                delivery,
                orderOptionUrls,
                menus,
                contact,
                "lat": location.lat,
                "lng": location.lng,
                "restaurantUrl": slug,
                // owner: ''
              }
            }
          });
          const newRestaurant = resp?.data?.createRestaurant
          if(newRestaurant && newRestaurant.id){
            // ADD RESTAURANT TO USER PROFILE
            await updateUserProfileByID({
              variables: {
                input: {
                  id: owner.id,
                  restaurantContact: newRestaurant.id,
                }
              }
            })
          let approvedRestaurants = customerServiceRepInput?.approvedRestaurants || [];
            approvedRestaurants = approvedRestaurants.concat(newRestaurant.id);
            approvedRestaurants = [ ...new Set(approvedRestaurants)];
            await updateCustomerServiceRepByID({
              variables: {
                input: {
                  approvedRestaurants,
                  id: customerServiceRepInput.id
                }
              }
            })
            // DELETE UNAPPROVED RESTAURANT
            await deleteRestaurantUnapprovedById({
              variables: {
                input: {
                  id: restaurant.id
                }
              }
            })
            onOpenDeleteConfirmationDialog(`Restaurant <b>${name}</b> has been approved`)
          }
        }
        toast.success('Restaurant approved successfully');
        emitCustomEvent('restaurant-approved');
      }
    } catch (e) {
    } finally {
      setLoading(false)
    }

  }

  const validateSlug = async(slug) => {
    try{
      const getSearchRestaurantUrlExistsResp = await getSearchRestaurantUrlExists({
        variables: {
          "filter": {restaurantUrl: {exists: true, eq: slug}, cityNameSlug: {eq: restaurant?.cityNameSlug || slugify(restaurant?.city || '', slugOptions)}}
        }
      })
      const valid = getSearchRestaurantUrlExistsResp?.data.searchRestaurants?.total <= 0;
      setIsSlugValid(valid)
      return valid;
    } catch (e){
      console.log({e})
      return false
    }
  }

  const isInValidSlug = !isSlugValid || !slug;
  return (
    <div>
      {
        loading && <Loading title={'Loading..Please wait'} />
      }
      <Tooltip title="Approved Restaurant">
        <SuccessButton id="btnApprovedRestaurant" variant="contained" color="success" aria-label="add" onClick={handleClickOpen}>
          Approved Restaurant
        </SuccessButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle id="form-dialog-title">
          Verify Restaurant Details
          <DialogClose onClose={handleClose}/>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} style={{marginBottom: 5}}>
            <Grid item xs={12}>
              <TextField
                disabled
                id="standard-basic"
                label="Title"
                defaultValue={restaurant?.name}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="restaurant-slug"
                label="Slug"
                value={slug}
                fullWidth
                variant="outlined"
                onChange={onSlugChange}
                error={isInValidSlug}
                helperText={ isInValidSlug? "Please enter valid/unique restaurant url " : "Please specify the restaurant url unique based on city"}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center', padding: 15}}
        >
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <SuccessButton id="btnCsApproved" variant="contained" aria-label="add" onClick={onRestaurantApprove} color="success" disabled={isInValidSlug}>
            Approved
          </SuccessButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default ApprovedRestaurantDialog
