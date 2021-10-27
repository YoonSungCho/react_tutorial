import React from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import logo from '../../logo.png';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthContext } from 'contexts/AuthContext';
import { RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h3>Welcome</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
          }}>
          <Box component="form" onSubmit={this.handleLogin}>
            <div>
              <GoogleLogin
                clientId="812808506191-8engeelglq514fno67eltm73min06b4a.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponseError}
                cookiePolicy="single_host_origin"
                redirectUri="/home"
              />
            </div>
            <Divider sx={{ mt: 3, mb: 1 }} flexItem>
              or
            </Divider>
            <div>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="standard"
                autoComplete="email"
                required
                autoFocus
              />
            </div>
            <div>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="standard"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <div>
              <Button type="submit" sx={{ mt: 3 }}>
                Sign In
              </Button>
              <Button type="button" sx={{ mt: 3 }} onClick={this.handleSignUp}>
                Sign Up
              </Button>
            </div>
          </Box>
        </Box>
        <ToastContainer />
      </Box>
    );
  }
}

export default Login;
