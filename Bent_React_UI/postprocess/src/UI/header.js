import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{backgroundColor:'lightblue'}}>
          <Box sx={{p:1}} display="flex" justifyContent="center">
          <Typography variant="h4" color="black" fontStyle="bold" fontFamily="fantasy">
            Beam Result Viewer
          </Typography>
          </Box>
      </AppBar>
    </Box>
  );
}
