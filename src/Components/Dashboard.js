import {useAuth} from "../Context/AuthContext";
import PhotoGrapherDashboard from "./PhotoGrapher/PhotoGrapherDashboard";
import CustomerSupportDashboard from "./CustomerSupport/CustomerSupportDashboard";
import Home from "./Home";

function Dashboard(props) {
	const { isPhotographer,
		isCustomerSupport,
		isRestaurantOwner, } = useAuth()
	if(isRestaurantOwner){
		return <Home {...props} />;
	}
	if(isPhotographer){
		return <PhotoGrapherDashboard {...props} />;
	}
	if(isCustomerSupport){
    console.log({isCustomerSupport})
		return <CustomerSupportDashboard {...props} />;
	}
	return (
		<>HELLO</>
	);
}

export default Dashboard;
