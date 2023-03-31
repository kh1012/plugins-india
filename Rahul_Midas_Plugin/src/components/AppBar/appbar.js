import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import pic from './Midas.png';
import { Bloodtype } from '@mui/icons-material';

const appbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }} >
    <AppBar position="static" style={{backgroundColor:"lightblue" }} >
        <Toolbar variant="dense" >
           <div>
           <img src={pic} height="30" width="70" />
           </div>
            <Typography variant="h5" color="black"  fontFamily="fantasy"  component="div" paddingLeft="42%" >
             Create Structure Line
            </Typography>
        </Toolbar>
    </AppBar>
  </Box>
  )
}

export default appbar