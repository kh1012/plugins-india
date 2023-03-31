import { ButtonGroup } from '@mui/material';
import React from 'react';
import Appbar from './components/AppBar/appbar';
import Grid from './components/Grid/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


function App() {
  return (
    <div className="App"  >
      <Appbar />
      <Grid container spacing={2} />
      <Box m={1}
        display="flex"
        justifyContent="center"
        alignItems="baseline">
        <Button variant="contained" href="#contained-buttons" >
          Create Structure Line
        </Button>
      </Box>
    </div>
  );
}

export default App;
