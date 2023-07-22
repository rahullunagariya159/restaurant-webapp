import React, {useContext, useEffect, useState} from 'react'
import {API, Auth, graphqlOperation, Hub} from "aws-amplify";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import {getUserByEmail} from "../graphql/queries";
import {
  createCustomerServiceRep,
  createPhotographer,
  createRestaurantOwner,
  createUserProfile,
} from "../graphql/mutations";
import Message from "../Components/MessageBox";
import Loading from "../Components/Loading";
import {
  hasPhotographerRole,
  hasCustomerSupportRole,
  hasRestaurantOwnerRole,
  unProtectedRoute,
} from "../utils";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// =============================================================================
// AUTH PROVIDER FUNCTIONS
// =============================================================================

export function AuthProvider({children}) {
  const history = useHistory()
  const location = useLocation()
  // =========================================================================
  // STATES
  // =========================================================================
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // user detail
  const [userdetails, setUserDetails] = useState(null);
  // error state
  const [errorstate, setErrorState] = useState(false);
  const [isPhotographer, setIsPhotographer] = useState(false);
  const [isCustomerSupport, setIsCustomerSupport] = useState(false);
  const [isRestaurantOwner, setRestaurantOwner] = useState(false);

  const [fetchUsersByEmail] = useLazyQuery(getUserByEmail);
  // const [updateUserProfileByID] = useMutation(updateUserProfile)
  const [createPhotographerFromUser] = useMutation(createPhotographer)
  const [createRestaurantOwnerFromUser] = useMutation(createRestaurantOwner)
  const [createCustomerServiceRepFromUser] = useMutation(createCustomerServiceRep)

  const isLoginOrRegistrationPage = unProtectedRoute.indexOf(window.location.pathname) > -1;


  // ========================================================================
  // FUNCTIONS
  // =========================================================================

  const updateUserProfileByData = async (theUser, isPhotographer, isCustomerSupport) => {
    if(!theUser){
      return false;
    }
    console.log({
      theUser
    })
    try {
      // TODO ADD PROFILE
      if (isCustomerSupport && theUser.customerServiceRep && theUser.customerServiceRep.items.length <= 0) {
        // debugger
        await createCustomerServiceRepFromUser({
          variables: {
            input: {
              userID: theUser.id,
              restaurantID: theUser.restaurantContact,
            }
          }
        })
        checkAuth()
      } else if (isPhotographer && theUser.photographer && theUser.photographer.items.length <= 0) {
        await createPhotographerFromUser({
          variables: {
            input: {
              userID: theUser.id,
              restaurantID: theUser.restaurantContact,
            }
          }
        })
        checkAuth()
      } else if (theUser.restaurantOwner && theUser.restaurantContact && theUser.restaurantOwner.items.length <= 0) {

        await createRestaurantOwnerFromUser({
          variables: {
            input: {
              userID: theUser.id,
              restaurantID: theUser.restaurantContact,
            }
          }
        })
        checkAuth()
      }
    } catch (error) {
      // debugger;
      console.log('ERROR', error);
    }
  }

  const checkAuth = async (ignore = true) => {
    try {
      if (isLoginOrRegistrationPage && ignore && false) {
        return true
      }
      const user = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      const userGroup = currentSession?.accessToken?.payload['cognito:groups'];
      console.log({userGroup, dd: window.location})
      // debugger;
      const isPhotographer = hasPhotographerRole(userGroup);
      const isCustomerSupport = hasCustomerSupportRole(userGroup);
      const isRestaurantOwner = hasRestaurantOwnerRole(userGroup);
      setIsPhotographer(isPhotographer);
      setIsCustomerSupport(isCustomerSupport);
      setRestaurantOwner(isRestaurantOwner);

      if (user) {
        setUser(user);

        try {
          const result = await fetchUsersByEmail({variables: {email: user.attributes['email']}});
          const theUser = result.data.getUserByEmail.items[0];
          if (!theUser) {
            // If user doesn't exist make new user
            await createAUser(user.attributes);
          } else {

            await updateUserProfileByData(theUser, isPhotographer, isCustomerSupport);
            console.log({
              theUser, isPhotographer, isCustomerSupport
            })
            // theUser.userGroup = userGroup;
            // theUser.restaurantContact = null;
            setUserDetails(theUser);
            if (isPhotographer && location.pathname.indexOf('/ph/restaurant') < 0) {
              history.push('/')
            }
            else if (isCustomerSupport && location.pathname.indexOf('/cs/restaurant') < 0 && location.pathname.indexOf('/cs/approved-restaurant') < 0 ) {
              history.push('/')
            } else if (isRestaurantOwner) {
              if (theUser.restaurantContact && location.pathname.indexOf('add-restaurant') < -1) {
                history.push('/add-restaurant')
              } else if (unProtectedRoute.indexOf(location.pathname) > -1 || location.pathname === "/") {
                history.push('/')
              }
            }
          }
        } catch (error) {
          setErrorState(true);
          console.log('ERROR', error);
          // debugger;
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  const createAUser = async (user, extraData) => {
    try {
      const result = await API.graphql(
        graphqlOperation(createUserProfile, {
          input: {
            uid: user.sub,
            email: user.email,
            firstname: user.given_name,
            lastname: user.family_name,
            ...extraData
          },
        })
      );
      console.log('Created User', result);
      window.location.reload();
    } catch (error) {
      console.log('++ERROR++', error);
    }
  };

  const signintoapp = async () => {
    try {
      await checkAuth(true)
    } catch (error) {
      setErrorState(true);
    }
  };

  useEffect(() => {
    try {
      Hub.listen('auth', (data) => {
        const {payload} = data
        console.log('A new auth event has happened: ', data)
        if (payload.event === 'signIn') {
          console.log('a user has signed in!')
          signintoapp()
        }
        if (payload.event === 'signOut') {
          console.log('a user has signed out!')
          setUser(null);
        }
      })
      checkAuth();
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    userdetails,
    isPhotographer,
    isRestaurantOwner,
    isCustomerSupport,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {
        !loading && errorstate ?
          <Message
            content={`User doesn't exist, please check email and password`}
            action={() => setErrorState(false)}
          /> : null
      }
      {
        loading && !isLoginOrRegistrationPage ? <Loading isLinearProgress={true} /> : null
      }
      {!loading && children}
    </AuthContext.Provider>
  );
}
