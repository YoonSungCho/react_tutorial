import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        this.setState(
            {
                email: data.get('email'),
                password: data.get('password')
            }, 
            () => alert(JSON.stringify(this.state))
        );
    }
    render() {
        return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <h3>Sign In</h3>
            <Box component="form" onSubmit={this.handleLogin}>    
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
        )
    }
}

export default Login;