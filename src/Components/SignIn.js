import {RESTAURANT_OWNER_ROLE} from "../consts";
import Login from "./Common/Login";

export default function SignIn() {

  return (
    <Login title={'Restaurant Manager'} profileRole={RESTAURANT_OWNER_ROLE} />
  )

}
