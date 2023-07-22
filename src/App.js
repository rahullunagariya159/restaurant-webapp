import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider} from "@material-ui/core/styles";
import {SnackbarProvider} from 'material-ui-snackbar-provider'
import {ToastContainer} from 'react-toastify';
import BulkUploadImages from './Components/BulkUploadImages';
import MenuItems from './Components/MenuItems';
import CustomMenu from './Components/CustomMenu';
import AboutUs from './Components/AboutUs';
import PendingMenuItems from './Components/PendingMenuItems';
import SignedIn from './Components/SignIn';
import PhotoGrapherSignedIn from './Components/PhotoGrapher/SignIn';
import Restaurant from './Components/PhotoGrapher/Restaurant';
import CustomerSupportSignIn from './Components/CustomerSupport/SignIn';
import RestaurantApproveProcess from './Components/CustomerSupport/RestaurantApproveProcess';
import ApprovedRestaurant from './Components/CustomerSupport/ApprovedRestaurant';
import Dashboard from './Components/Dashboard';
import AddRestaurant from "./Components/AddRestaurnat";
import PageNotFound from "./Components/PageNotFound";
import PermissionDenied from "./Components/PermissionDenied";
import Followers from "./Components/Followers";
import Rewards from "./Components/Rewards";
import {AuthProvider} from "./Context/AuthContext";
import DialogProvider from "./Context/DialogProvider";
import {CUSTOMER_SERVICE_ROLE, PHOTOGRAPHER_ROLE, RESTAURANT_OWNER_ROLE} from "./consts";

import PrivateRoute from './Layout/PrivateRoute';
import './App.css';

function App() {

  return (
    <MuiThemeProvider>
      <SnackbarProvider
        SnackbarProps={{
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          }
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          progress={undefined}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <DialogProvider>
          <CssBaseline/>
          <Router>
            {/* PURPOSE : It can be used for check the auth and redirect/restrict the user based on role */}
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/story' component={AboutUs} permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/items' component={MenuItems} permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/custom-menu' component={CustomMenu} permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/followers' component={Followers} permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/rewards' component={Rewards} permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/pending-items' component={PendingMenuItems}
                              permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/bulk-uploads' component={BulkUploadImages}
                              permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path='/add-restaurant' component={AddRestaurant}
                              permission={[RESTAURANT_OWNER_ROLE]}/>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <PrivateRoute exact path='/cs/restaurant/:restaurantId' component={RestaurantApproveProcess}
                              permission={[CUSTOMER_SERVICE_ROLE]}/>
                <PrivateRoute exact path='/cs/approved-restaurant' component={ApprovedRestaurant}
                              permission={[CUSTOMER_SERVICE_ROLE]}/>

                <Route exact path="/login" component={SignedIn}/>
                <Route exact path="/register" component={SignedIn}/>

                <Route exact path="/photographer-login" component={PhotoGrapherSignedIn}/>
                <Route exact path="/photographer-register" component={PhotoGrapherSignedIn}/>
                <PrivateRoute exact path="/ph/restaurant" component={Restaurant} permission={[PHOTOGRAPHER_ROLE]}/>

                <Route exact path="/cs-login" component={CustomerSupportSignIn}/>
                <Route exact path="/cs-register" component={CustomerSupportSignIn}/>

                <Route exact path="/verify" component={SignedIn}/>
                <Route exact path="/permission-denied" component={PermissionDenied}/>
                <Route component={PageNotFound}/>
              </Switch>
            </AuthProvider>

          </Router>
        </DialogProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );

  // return <SignedIn />;
}

export default App;
