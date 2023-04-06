import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function DiagramOpt() {
  return (
    <Box sx={{background:"#FFFFFF", height:50, position:"relative"}} >
      <FormControl>
        <Stack direction={"row"}>
          <FormLabel id="demo-row-radio-buttons-group-label" sx={{mr:5, mt:1, ml:2}}>Diagram options</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="Node_Number"
            name="deno-diagram-options"
          >
            <FormControlLabel value="Node_Number" control={<Radio />} label="Node Number"/>
            <FormControlLabel value="Node_X-Coordinations" control={<Radio />} label="Node X-Coordinations" />
          </RadioGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Show Legend" />

        </Stack>
      </FormControl>
      <Box sx={{float:"right"}}>
      </Box>
    </Box>
  )
}