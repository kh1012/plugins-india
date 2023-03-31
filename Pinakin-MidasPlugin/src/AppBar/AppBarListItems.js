import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from "@mui/material/styles";
import Image from 'mui-image'
import MidasLogo from '../AppBar/MidasLogo.png'

const StyledTypography = styled(Typography)(({ theme }) => ({
    borderRadius: 4,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'gold',
    maxHeight: '1.5rem',
    padding: 4,
    margin: 8
  }));

  const defaultStyling = {
    border: '1px solid gray',
    backgroundColor: 'rgba(20,20,20,0.4)',
    width: 300,
    height: 100
  }

  function Component() {
    return (
      <div style={{ backgroundImage:`url(${MidasLogo})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}>
        __________
      </div>
    // <div>
    //     <img src={MidasLogo} width='20%'/>
    // </div>
    );
  }
export default function DenseAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor:'lightblue'}}>
          <Toolbar variant="dense">
            {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}> */}
              {/* <MenuIcon /> */}
              
            {/* </IconButton> */}
            <Component/>
            <Typography variant="h5" color="black" fontStyle="bold" fontFamily="fantasy" component="div"  paddingLeft='40%' >
              Create Structure Line
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
