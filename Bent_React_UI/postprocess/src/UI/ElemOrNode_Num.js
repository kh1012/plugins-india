import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ElemOrNodeNum(props) {
  const [elemval,setelemvalue]=React.useState(props.Dvalue);
  const TextFieldwidth = props.width*0.4;

  function savevalue(event){
    setelemvalue(event.target.value);
  }

  return (
    <Box sx={{height:50, alignItems:"center"}}>
      <Typography sx={{float:"left", mt:2.5}}>Elements or Nodes Number</Typography>
      <TextField value={elemval} onChange={savevalue} id="Id_Elemstring" sx={{mt:'0.5vw', float:"right", width:TextFieldwidth}}   variant="standard" />
    </Box>
  );
}