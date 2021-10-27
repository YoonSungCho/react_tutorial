import React from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import logo from '../../logo.png';

const Signup = (props: {}) => {
  const handleSignUp = () => {};

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Sign Up</h3>
      <img src={logo} className="App-logo" alt="logo" />
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
        }}>
        <Box component="form" onSubmit={handleSignUp}>
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
              Sign Up
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
