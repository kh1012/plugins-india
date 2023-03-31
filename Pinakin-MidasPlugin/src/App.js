import logo from './logo.svg';
import Button from '@mui/material/Button';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar1 from './AppBar/AppBarListItems';
import UnitLen from './UnitLength/UnitLength';
import Backdrop from '@mui/material';
import sf from './StackFol/StackFile'





function App() {
  return (
    <div className="App"  >

      <AppBar1 />
      <UnitLen />
      

      <Box m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <Button variant="contained" href="#contained-buttons" >
          Create Structure Line
        </Button>
      </Box>

    </div>

  );
}

export default App;
