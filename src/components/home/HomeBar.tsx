import React from 'react'
import { AppBar, Box, Toolbar, Avatar, Typography } from '@mui/material'
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext'

/**
 * 
 * @param props 
 * @returns 
 */
export default function HomeBar(props: any) {
  let user = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>                   
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Feel To Gram</Typography>
          <Typography sx={{ mr: 3 }}>Hello, {user.userName}</Typography>          
          <Avatar src={user.imageUrl} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
