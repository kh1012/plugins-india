import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import NestedCheckBox from "./nestedcheckbox";
var transfervariable =false
export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false
  });

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isDisabled2, setIsDisabled2] = React.useState(false);
  const [isDisabled3, setIsDisabled3] = React.useState(false);
  const [isDisabled4, setIsDisabled4] = React.useState(false);
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
      
    });
    
   if(event.target.name=="a")
   {
        setIsDisabled(!isDisabled)
        
   }

   if(event.target.name=="c")
   {
        setIsDisabled2(!isDisabled2)
   }

   if(event.target.name=="d")
   {
    
    setIsDisabled3(!isDisabled3)
  
   }
   if(event.target.name=="e")
   {
    
    setIsDisabled4(!isDisabled4)
  
   }
  };

  const { a, b, c, d, e } = state;
  const error = [a, b, c, d, e].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <Box  sx={{ ml: -60 }}>
        <FormLabel component="legend" >Option</FormLabel>
        </Box>
        
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  id="CB_StructuralGp" checked={a} onChange={handleChange} name="a" />}
           
            label="with Structural group"
          />
         <TextField id="Text_StructuralGp" disabled={!isDisabled} 
              sx={{
                width: {
                  sm: 100,
                  marginLeft:350,
                  marginTop: 0,
                  position:"absolute"
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              
              variant="standard"
            ></TextField>
          <FormControlLabel
            control={<Checkbox  id="CB_NodeLoacalAxis" checked={b} onChange={handleChange} name="b" />}
           
            label="with Node Local axis"
          />
          <FormControlLabel
            control={<Checkbox  id="CB_Notionalsize" checked={c} onChange={handleChange} name="c" />}
            label="with Notional size"
          />
          <Box sx={{ ml: 40 ,mt :12, position:"absolute" }}><FormLabel>a=</FormLabel></Box>
           
           <TextField id="Text_Notionalsize" disabled={!isDisabled2} 
              sx={{
                width: {
                  sm: 100,
                  marginLeft:350,
                  marginTop: 80,
                  position:"absolute"
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              
              variant="standard"
            ></TextField>
          <FormControlLabel
            control={<Checkbox id="CB_RestraintsSupports" checked={d} onChange={handleChange} name="d" />}
            label="with Restraint Supports"
          />
          <NestedCheckBox isDisabled3={!isDisabled3} />
          <FormControlLabel
            control={<Checkbox id="CB_BeamEndOffset" checked={e} onChange={handleChange} name="e" />}
            label="with Beam End Offset"
          />
          <Box sx={{ ml: 30 }}>
            <FormLabel disabled={!isDisabled4}>Start</FormLabel>
            <TextField 
            disabled={!isDisabled4}
              sx={{
                width: {
                  sm: 100,
                  marginLeft: 50,
                  marginTop: -15
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              id="StartOffset"
              variant="standard"
            ></TextField>
            <FormLabel disabled={!isDisabled4}>m</FormLabel>
          </Box>
          <Box  sx={{ ml: 30, mt: 2 }}>
            <FormLabel disabled={!isDisabled4}>End</FormLabel>
            <TextField
            disabled={!isDisabled4}
            
              sx={{
                width: {
                  sm: 100,
                  marginLeft: 55,
                  marginTop: -15
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              id="EndOffset"
              variant="standard"
            ></TextField>
            <FormLabel disabled={!isDisabled4}>m</FormLabel>
          </Box>
        </FormGroup>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      ></FormControl>
    </Box>
  );
}
