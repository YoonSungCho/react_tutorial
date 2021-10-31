import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../axios/axios.config';
import FormValidate, { FormValidation } from './FormUtil';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

/**
 * 회원 가입 컴포넌트
 * @returns
 */
export default function SignUp() {
  // 회원 form 정보 validate 데이터 초기 데이타
  const initialFormValidateDate = {
    email: { value: '' },
    password: { value: '' },
    firstName: { value: '' },
    lastName: { value: '' },
    confirmpassword: { value: '' },
  };

  // form validate를 위한 state
  const [formData, setFormData] = React.useState<FormValidation>(initialFormValidateDate);
  // Loading 버튼 state
  const [loading, setLoading] = React.useState(false);

  /**
   * form submit 전 validation 검증 및 회원 가입 서비스 호출
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {void}
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validation 에 전달할 데이터 객체
    const obj: { [a: string]: any } = {};
    // form elements 중 input 필드만 filter 한후 validation 데이터 생성
    Array.from(event.currentTarget.elements).forEach(input => {
      if (input.tagName === 'INPUT') {
        let el = input as HTMLInputElement;
        const { name, value, required } = el;
        obj[name] = { value, required };
      }
    });

    // validation 진행
    if (!FormValidate(obj)) {
      // 문제 필드 포커스
      event.currentTarget.reportValidity();
      // validaiton 결과 state 저장
      setFormData({
        ...obj,
      });

      return;
    } else {
      // validaiton 결과 state 저장
      setFormData({
        ...obj,
      });

      setLoading(true);
      // 회원 등록 서비스 호출
      axios
        .post(
          '/auth/local/register',
          {
            username: `${obj.lastName.value} ${obj.firstName.value}`,
            email: obj.email.value,
            password: obj.password.value,
          },
          {},
        )
        .then(response => {
          console.log(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            setLoading(false);
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
            setLoading(false);
            console.error(error.request);
          } else {
            setLoading(false);
            console.error('Error', error.message);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '95vh',
          // border: '1px dashed gray;',
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontFamily: "'Nanum Brush Script', cursive" }}>
            영 필~!
          </Typography>
          <Avatar sx={{ m: 1, mt: 8, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  variant="standard"
                  required
                  fullWidth
                  error={formData.firstName.error}
                  helperText={formData.firstName.helperText}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={formData.lastName.error}
                  helperText={formData.lastName.helperText}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={formData.email.error}
                  helperText={formData.email.helperText}
                  variant="standard"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={formData.password.error}
                  helperText={formData.password.helperText}
                  variant="standard"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => {
                    formData['password'].value = e.target.value;
                    setFormData({
                      ...formData,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled={formData.password.value.length > 0 ? false : true}
                  error={formData.confirmpassword.error}
                  helperText={formData.confirmpassword.helperText}
                  variant="standard"
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 8, mb: 2 }}>
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
