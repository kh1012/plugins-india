import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


export default function DiagramOpt(props) {
  const [val,setvalue]=React.useState(props.checkedRv);
  
  return (
    <Box sx={{background:"#FFFFFF", width:"100%", height:50, display:"flex", alignItems:"center", overflow:"hidden", overflowY:"scroll"}} >
      <FormControl >
        <Stack direction={"row"}>
          <FormLabel id="demo-row-radio-buttons-group-label" sx={{ display:"flex", alignItems:"center", ml:2, mr:2}}>Diagram options</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue={props.DV}
            name="deno-diagram-options"
          >
            <FormControlLabel value="Node_Number" control={<Radio defaultChecked={val} id="Id_Nodenum" />} label="Node Number"/>
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