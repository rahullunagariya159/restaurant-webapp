import {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Auth} from 'aws-amplify';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/react-hooks";
import {getUserByEmail} from "../../graphql/queries";
import Loading from './../Loading';
import logo from './../logo1.png';
import Alert from "@material-ui/lab/Alert";
import {useAuth} from "../../Context/AuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        FoodDiscovery
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FC524E',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#FC524E',
    textDecoration: 'none',
  },
}));

export default function SignIn({title, profileRole}) {
  const classes = useStyles();
  const history = useHistory()
  const {checkAuth} = useAuth();
  // not confirmed
  const [notConfirmed, setNotConfirmed] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verification, setVerification] = useState('');

  const [signUpView, setSignUpView] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [fetchUsersByEmail] = useLazyQuery(getUserByEmail);

  async function signUp() {
    setLoading(true);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          profile: profileRole,
          phone_number: `+1${phone}`,
          given_name: firstName,
          family_name: lastName,
        },
      });
      setSignUpView(false);
      setConfirmView(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const msg = error.message.replace('PreSignUp failed with error', '');
      toast.error(msg, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('error signing up:', error);
    }
  }

   const  confirmSignUp = async () => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, verification);
      toast.success('Confirmed', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setConfirmView(false);

      if(profileRole === 'CustomerService')
      {
        history.push('/cs-login');
      }
      else if(profileRole === 'Photographer')
      {
        history.push('/photographer-login');
      }
      else
      {
        history.push('/login');
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      if (error.message.indexOf('Current status is CONFIRMED') > -1) {
        history.push('/')
      }
    }finally{
      setLoading(false);
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      console.log('code resent successfully');
      toast.success('code resent successfully! Check your Phone', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }


  const signInToApp = async () => {
    try {
      setAuthenticating(true);
      await Auth.signIn({
        username: email,
        password,
      });
      // const currentSession = await Auth.currentSession();
      // const userGroup = currentSession?.accessToken?.payload['cognito:groups'];
      // const isPhotographer = userGroup && userGroup.indexOf(PHOTOGRAPHER_ROLE) > -1;
      // setLoading(true)
      // const result = await fetchUsersByEmail({variables: { email: res.attributes['email'] }});
      // const theUser = result.data.getUserByEmail.items[0];
      //
      // if(!theUser.restaurantContact && !isPhotographer){
      //   history.push('/add-restaurant')
      // } else {
      //   history.push('/')
      // }
      // window.location.href = '/';
      // history.push('/')
      // await checkAuth(false)

    } catch (error) {
      console.log('error signing up:', error);
      if (error.code === 'UserNotConfirmedException') {
        setNotConfirmed(true);
        return;
      } else {
        setHasError(error.message)
      }
      setAuthenticating(false);
    } finally {

    }
  }

  if (confirmView || notConfirmed) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        {
          loading && <Loading title={'Loading..Please wait'}/>
        }
        <div className={classes.paper}>
          <img src={logo} alt="Logo" style={{height: '75px', marginBottom: '65px'}}/>
          <Typography component="body1" variant="body1">
            We sent you a verification code on your phone number. Please enter code to verify
          </Typography>
          <form className={classes.form} noValidate autoFocus>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="verification"
              label="Enter Verification Code"
              name="ve"
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                confirmSignUp();
              }}
            >
              Confirm
            </Button>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              resendConfirmationCode();
            }}
          >
            Re-send Code
          </Button>
        </div>
      </Container>
    );
  }

  if (loading) {
    return <Loading title={'Loading..Please wait'}/>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      {
        authenticating && <Loading title={'Authenticating..Please wait'}/>
      }
      <div className={classes.paper}>
        <img src={logo} alt="Logo" style={{height: '75px', marginBottom: '65px'}}/>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {signUpView ? (
          <>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={phone}
                maxlength="10"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  signUp();
                }}
              >
                Register
              </Button>
            </form>
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => {
                setSignUpView(false);
              }}
              id="loginSubmit"
            >
              Sign In
            </Button>
          </>
        ) : (
          <>
            <form className={classes.form} noValidate>
              {
                hasError &&
                <Alert severity="error">
                  {hasError}
                </Alert>
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                id="loginSubmit"
                name="submit"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  signInToApp();
                }}
              >
                Sign In
              </Button>
            </form>
            <Button
              fullWidth
              variant="contained"
              // color="primary"
              // className={classes.submit}
              onClick={(e) => {
                setSignUpView(true);
              }}
            >
              Register
            </Button>
          </>
        )}
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
  );
}
