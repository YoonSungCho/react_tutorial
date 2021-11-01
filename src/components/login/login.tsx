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
import { LoadingButton } from '@mui/lab';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthContext } from 'contexts/AuthContext';
import { RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import FormValidate, { FormValidation } from './FormUtil';
import axios from 'axios';
import { StaticContext } from 'react-router';

type LocationState = {
  from: string;
  email?: string;
};
/**
 * @class Login
 * 로그인 관련 로직 수행
 */
class Login extends React.Component<
  RouteComponentProps<{}, StaticContext, LocationState>,
  FormValidation
> {
  static contextType = AuthContext;
  private readonly googleClientId =
    '812808506191-8engeelglq514fno67eltm73min06b4a.apps.googleusercontent.com';

  constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
    super(props);

    // form validastion 용 초기 데이터
    // 만약 회원가입에서 성공해서 로그인 페이지 로 넘어온 경우 email 채워줌
    this.state = {
      email: { value: props.location.state?.email || '' },
      password: { value: '' },
      // loading sate 변수를 만드려고 form validation 이 아닌 데이터 우겨넣음...
      login: { value: '' },
    };
  }
  /**
   * 로그인 수행
   * @param e 폼 이벤트 객체
   */
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void = e => {
    e.preventDefault();
    // validation 에 전달할 데이터 객체
    const obj: { [a: string]: any } = {};
    // form elements 중 input 필드만 filter 한후 validation 데이터 생성
    Array.from(e.currentTarget.elements).forEach(input => {
      if (input.tagName === 'INPUT') {
        let el = input as HTMLInputElement;
        const { name, value, required } = el;
        obj[name] = { value, required };
      }
    });

    // validation 진행
    if (!FormValidate(obj)) {
      // 문제 필드 포커스
      e.currentTarget.reportValidity();
      // validaiton 결과 state 저장
      this.setState(state => {
        return {
          ...state,
          ...obj,
        };
      });

      return;
    } else {
      this.setState(state => {
        return {
          ...state,
          login: { value: 'loading' },
        };
      });
      // 로그인 수행
      axios
        .post('/auth/local', {
          identifier: obj.email.value,
          password: obj.password.value,
        })
        .then(response => {
          // state 값 갱신
          this.setState(state => {
            return {
              ...state,
              login: { value: '' },
            };
          });
          // user context 데이터 저장
          let { username, id, email, confirmed } = response.data.user;
          let user = this.context;
          user.userId = id;
          user.userName = username;
          user.email = email;
          user.imageUrl = '';
          user.authenticated = confirmed;
          // 홈으로 이동
          this.props.history.push('/', { from: '/login' });
        })
        .catch(error => {
          this.setState(state => {
            return {
              ...state,
              login: { value: '' },
            };
          });
          if (error.response) {
            toast.error(error.response.data.message[0].messages[0].message, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (error.request) {
            console.error(error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    }
  };

  /**
   * 회원 가입 수행
   * @param e 버튼 클릭 이벤트 객체
   */
  handleSignUp: (e: React.MouseEvent<HTMLButtonElement>) => void = e => {
    e.preventDefault();
    // 회원 가입 페이지 이동
    //this.props.history.push('/signup');
  };

  /**
   * 필드 값 변경 이벤트
   * @param e change 이벤트 객체
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
    e.preventDefault();

    const { name, value, required } = e.target;
    const obj = { [name]: { value, required } };

    // 에러인 경우에만 form validation 수행
    if (this.state[name].error === true) {
      FormValidate(obj);

      this.setState({
        ...this.state,
        ...obj,
      });
    } else {
      if (name === 'email') {
        this.setState(state => {
          state.email.value = value;
          return {
            ...state,
          };
        });
      }
    }
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
            variant="h1"
            sx={{ fontFamily: "'Nanum Brush Script', cursive" }}>
            영 필~!
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
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
            value={this.state.email.value}
            error={this.state.email.error}
            helperText={this.state.email.helperText}
            onChange={this.handleChange}
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
            error={this.state.password.error}
            helperText={this.state.password.helperText}
            onChange={this.handleChange}
            fullWidth
            required
          />
          <Grid container>
            <FormControlLabel
              control={<Checkbox value="remember" color="info" />}
              label="Remember me"
              sx={{ color: 'gray', mt: 2 }}
            />
          </Grid>
          <LoadingButton
            loading={this.state.login.value === 'loading' ? true : false}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </LoadingButton>
          <GoogleLogin
            disabled={this.state.login.value === 'loading' ? true : false}
            clientId={this.googleClientId}
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
