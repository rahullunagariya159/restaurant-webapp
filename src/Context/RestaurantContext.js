import React, { useContext, useState, useEffect } from 'react'
import {getRestaurant} from "../graphql/queries";
import { useAuth } from "./AuthContext";
import {useQuery} from "@apollo/client";
import {useMutation} from "@apollo/react-hooks";
import {updateRestaurant} from "../graphql/mutations";
import {slugifyString} from "../utils";

const RestaurantContext = React.createContext();
export function useRestaurant() {
	return useContext(RestaurantContext);
}

// =============================================================================
// AUTH PROVIDER FUNCTIONS
// =============================================================================

export function RestaurantProvider({ children }) {
	// const history = useHistory()
	const { userdetails, isPhotographer } = useAuth();
	let restaurantID = userdetails.restaurantContact;

	// =========================================================================
	// STATES
	// =========================================================================
	const [preselectedCuisine, setPreselectedCuisine] = useState([]);
	const [selectedDelivery, setSelectedDelivery] = useState([]);
	const [uploadedPictures, setUploadedPictures] =useState([]);
	const [selectedMenus, setSelectedMenus] = useState([]);
	const [menus, setMenus] = useState([]);
	const [restaurant, setRestaurant] = useState(null);

  const [updateRestaurantById] = useMutation(updateRestaurant)

	let getRestaurantResponse = useQuery(getRestaurant, {
		fetchPolicy: "cache-and-network",
		variables: {id: restaurantID },
		onCompleted: function(data){
			const restaurant = data?.getRestaurant || {};
			setPreselectedCuisine(restaurant?.cuisine || []);
			setSelectedDelivery(restaurant?.delivery || []);
			setUploadedPictures(restaurant?.bulkImages || []);
			const prePopulateMenus = restaurant?.menus || [];
			if(prePopulateMenus && restaurant){
				const currentMenus = prePopulateMenus.map(
					(menu) => menu.name,
				);
				setSelectedMenus(currentMenus);
			}
			setMenus(prePopulateMenus);
			setRestaurant(restaurant);
		}
	});

  useEffect(() => {
    if(restaurant && restaurant.id && !restaurant.restaurantUrl){
      updateRestaurantById({
        variables: {
          input: {
            id: restaurant.id,
            restaurantUrl: slugifyString(restaurant.name),
          }
        }
      })
    }
    if(restaurant && restaurant.id && !restaurant.cityNameSlug){
      updateRestaurantById({
        variables: {
          input: {
            id: restaurant.id,
            cityNameSlug: slugifyString(restaurant.city)
          }
        }
      })
    }
  }, [restaurant]);


	// ========================================================================
	// FUNCTIONS
	// =========================================================================

	const reFetchRestaurant = () => {
		if(getRestaurantResponse && getRestaurantResponse.refetch){
			getRestaurantResponse.refetch({
				id: restaurantID
			})
		}
	}

	const value = {
		getRestaurantResponse,
		preselectedCuisine,
		setPreselectedCuisine,
		selectedDelivery,
		setSelectedDelivery,
		uploadedPictures,
		setUploadedPictures,
		selectedMenus,
		setSelectedMenus,
		menus,
		setMenus,
		restaurant,
		setRestaurant,
		userdetails,
		restaurantID,
		isPhotographer,
		reFetchRestaurant
	};

	return (
		<RestaurantContext.Provider value={value}>

			{
				// getRestaurantResponse.loading ? <Loading title={'Loading..Please wait'} /> : null
			}
			{children}
		</RestaurantContext.Provider>
	);
}
