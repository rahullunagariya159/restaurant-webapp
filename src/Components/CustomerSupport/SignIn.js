import {CUSTOMER_SERVICE_ROLE} from "../../consts";
import Login from "./../Common/Login";

export default function SignIn() {
  return (
    <Login title={'Customer Support Portal'} profileRole={CUSTOMER_SERVICE_ROLE} />
  );
}
