import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
} from '@mui/material';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthContext } from 'contexts/AuthContext';
import { RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
</style>;

/**
 * @class Login
 * 로그인 관련 로직 수행
 */
class Login<P extends RouteComponentProps> extends React.Component<P> {
  static contextType = AuthContext;

  /**
   * 로그인 수행
   * @param e 폼 이벤트 객체
   */
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.get('');
  };

  /**
   * 회원 가입 수행
   * @param e 버튼 클릭 이벤트 객체
   */
  handleSignUp: (e: React.MouseEvent<HTMLButtonElement>) => void = e => {
    e.preventDefault();
    // 회원 가입 페이지 이동
    this.props.history.push('/signup');
  };

  /**
   * 구글 로그인 콜백
   * @param response GoogleLoginResponse
   */
  googleResponse: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void =
    response => {
      response = response as GoogleLoginResponse;

      if (response.isSignedIn()) {
        let googleUser = response.getBasicProfile();

        let user = this.context;
        user.userId = googleUser.getId();
        user.userName = googleUser.getName();
        user.email = googleUser.getEmail();
        user.imageUrl = googleUser.getImageUrl();
        user.authenticated = response.isSignedIn();

        this.props.history.push('/');
      }
    };

  /**
   * 구글 로그인 에러 처리
   * @param response
   */
  googleResponseError: (response: any) => void = response => {
    toast.error(response.error, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <Box
        sx={{
          height: '95vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            p: 5,
            display: 'flex',
            alignItems: 'center',
            width: '20vw',
            flexDirection: 'column',
          }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Architects Daughter', cursive;" }}>
            Welcome Feel To Gram
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={this.handleLogin}
          sx={{
            mt: 2,
            p: 5,
            display: 'flex',
            alignItems: 'center',
            width: '20vw',
            flexDirection: 'column',
          }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            autoComplete="email"
            fullWidth
            required
            autoFocus
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
          <Grid container>
            <FormControlLabel
              control={<Checkbox value="remember" color="info" />}
              label="Remember me"
              sx={{ color: 'gray', mt: 2 }}
            />
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <GoogleLogin
            clientId="812808506191-8engeelglq514fno67eltm73min06b4a.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponseError}
            cookiePolicy="single_host_origin"
            redirectUri="/home"
            render={props => (
              <Button
                onClick={props.onClick}
                startIcon={<GoogleIcon />}
                type="button"
                fullWidth
                variant="contained">
                Google
              </Button>
            )}
          />

          <Grid container sx={{ m: 2 }}>
            <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </Box>
    );
  }
}

export default Login;
