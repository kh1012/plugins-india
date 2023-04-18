import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ElemOrNodeNum() {
  const [elemval,setelemvalue]=React.useState("1to3");
  function savevalue(event){
setelemvalue(event.target.value);
  }
  return (
    <Box sx={{height:50}}>
      <Typography sx={{float:"left", mt:2.5}}>Elements or Nodes Number</Typography>
      <TextField value={elemval} onChange={savevalue} id="Id_Elemstring" sx={{float:"right"}}  label="Standard" variant="standard" />
    </Box>
  );
}