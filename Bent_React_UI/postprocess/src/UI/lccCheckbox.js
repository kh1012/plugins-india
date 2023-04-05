import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

export default function LoadCaseCombinationList() {

  return (
    <Box sx={{height:"90%"}}>
      <Typography sx={{mb:1, ml:1}}>Load Case and Combinations</Typography>
      <Box sx={{height:"100%", border:1, p:2}}>
        <Typography sx={{float:"left", mt:1}}>TEST</Typography>
        <Checkbox sx={{float:"right"}}/>
        {/* <FormControlLabel
          value="start"
          control={<Checkbox sx={{float:"right"}}/>}
          label="Start"
          labelPlacement="start"
        /> */}
      </Box>
    </Box>
  );
}