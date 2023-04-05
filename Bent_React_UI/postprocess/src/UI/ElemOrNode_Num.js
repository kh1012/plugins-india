import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ElemOrNodeNum() {
  return (
    <Box sx={{height:50}}>
      <Typography sx={{float:"left", mt:2.5}}>Elements or Nodes Number</Typography>
      <TextField sx={{float:"right"}} id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}