import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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

export default function SignUp() {
  const initialFormValidateDate = {
    email: { value: '' },
    password: { value: '' },
    firstName: { value: '' },
    lastName: { value: '' },
    confirmpassword: { value: '' },
  };
  const [formData, setFormData] = React.useState<FormValidation>(initialFormValidateDate);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value, required } = event.target;
    const obj = { [name]: { value, required } };

    FormValidate(obj);

    setFormData({
      ...formData,
      ...obj,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const obj: { [a: string]: any } = {};
    Array.from(event.currentTarget.elements).forEach(input => {
      if (input.tagName === 'INPUT') {
        let el = input as HTMLInputElement;
        const { name, value, required } = el;
        obj[name] = { value, required };
      }
    });

    debugger;

    if (FormValidate(obj)) {
      console.log(obj);
    } else {
      console.error(obj);
      event.currentTarget.reportValidity();
    }

    return;

    const data = new FormData(event.currentTarget);
    let username = `${data.get('lastName')} ${data.get('firstName')}`;
    // const obj = {
    //   email: { value: data.get('email', data) },
    //   password: { value: '' },
    //   firstName: { value: '' },
    //   lastName: { value: '' },
    //   confirmpassword: { value: '' },
    // };

    return;

    axios
      .post(
        '/auth/local/register',
        {
          username: username,
          email: data.get('email'),
          password: data.get('password'),
        },
        {},
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
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
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
                  error={formData.confirmpassword.error}
                  helperText={formData.confirmpassword.helperText}
                  variant="standard"
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 8, mb: 2 }}>
              Sign Up
            </Button>
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
