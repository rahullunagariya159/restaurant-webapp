import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useAuth} from "../Context/AuthContext"
import {RestaurantProvider} from "../Context/RestaurantContext";
import DefaultLayout from './DefaultLayout'
import {unProtectedRoute} from "../utils";

export default function PrivateRoute({permission, component: Component, ...rest}) {
  const CustomerSupportRoute = [
    '/', '/cs/restaurant/:restaurantId', '/cs/approved-restaurant'
  ];
  const PhotographerRoute = [
    '/', '/ph/restaurant'
  ];
  console.log(permission)

  const {userdetails, isPhotographer, isCustomerSupport, isRestaurantOwner} = useAuth()

  const redirect = (data) => {
    console.log({route: data.match.path, isPhotographer, isCustomerSupport, isRestaurantOwner})
    if (!userdetails || !userdetails?.email) {
      return <Redirect to="/login"/>
    } else if (isPhotographer) {
      if (PhotographerRoute.indexOf(data.match.path) <= -1) {
        return <Redirect to="/"/>
      }
    } else if (isCustomerSupport) {
      if (CustomerSupportRoute.indexOf(data.match.path) <= -1) {
        return <Redirect to="/404"/>
      }
    } else if (isRestaurantOwner) {
      if (userdetails.restaurantContact && data.match.path === '/add-restaurant') {
        return <Redirect to="/"/>
      } else if (!userdetails?.restaurantContact &&
        data.match.path !== '/add-restaurant' &&
        unProtectedRoute.indexOf(data.match.path) <= -1
      ) {
        return <Redirect to="/add-restaurant"/>
      }
    } else if (!isPhotographer && !isCustomerSupport && !isRestaurantOwner) {
      return <Redirect to="/permission-denied"/>
    }
    return (
      <RestaurantProvider>
        <DefaultLayout>
          <Component {...data} />
        </DefaultLayout>
      </RestaurantProvider>
    )
  }

  return (
    <Route {...rest} render={props => redirect(props)}/>
  )
}
