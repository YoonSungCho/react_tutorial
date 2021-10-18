import React from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import logo from '../../logo.png'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import HomeAppBar from 'components/home/homeAppBar';

class Login extends React.Component {
    constructor(props: object) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.googleResponse = this.googleResponse.bind(this);
    }

    handleLogin(e: any): void {
        e.preventDefault();
        const data: any = new FormData(e.currentTarget);
        this.setState(
            {
                email: data.get('email'),
                password: data.get('password')
            }, 
            () => alert(JSON.stringify(this.state))
        );
    }

    googleResponse(response: any) {
        if(response.error) {
            alert(response.type);
        } else {
            console.log(response);
        }
    }

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
                    width: 'fit-content'
                }}
                >
                <Box component="form" onSubmit={this.handleLogin}>
                    <div>
                        <GoogleLogin 
                            clientId="812808506191-8engeelglq514fno67eltm73min06b4a.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={this.googleResponse}
                            onFailure={this.googleResponse}
                            cookiePolicy="single_host_origin"
                            redirectUri="/home" 
                        />
                    </div>
                    <Divider sx={{mt:3, mb: 1}} flexItem>
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
                        <Button type="submit" sx={{mt:3}}>Sign In</Button>
                    </div>
                </Box>
            </Box>
        </Box>
        )
    }
}

export default Login;