import {PHOTOGRAPHER_ROLE} from "../../consts";
import Login from "../Common/Login";

export default function SignIn() {
  return (
    <Login title={'Photographer Portal'} profileRole={PHOTOGRAPHER_ROLE} />
  );
}
