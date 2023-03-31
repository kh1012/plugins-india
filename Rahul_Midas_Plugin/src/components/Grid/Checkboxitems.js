import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import NestedCheckBox from "./nestedcheckbox";
export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
      
    });
    
    if(event.target.name=="a" && event.target.checked )
    {
       document.getElementById("StructuralGroupText").TextField.disabled=!event.target.checked;
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
            control={<Checkbox checked={a} onChange={handleChange} name="a" />}
            label="with Structural group"
          />
         <TextField id="StructuralGroupText" disabled={true}
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
            control={<Checkbox checked={b} onChange={handleChange} name="b" />}
            label="with Node Local axis"
          />
          <FormControlLabel
            control={<Checkbox checked={c} onChange={handleChange} name="c" />}
            label="with Notional size"
          />
          <FormControlLabel
            control={<Checkbox checked={d} onChange={handleChange} name="d" />}
            label="with Restraint Supports"
          />
          <NestedCheckBox />
          <FormControlLabel
            control={<Checkbox checked={e} onChange={handleChange} name="e" />}
            label="with Beam End Offset"
          />
          <Box sx={{ ml: 30 }}>
            <FormLabel>Start</FormLabel>
            <TextField
              sx={{
                width: {
                  sm: 100,
                  marginLeft: 50,
                  marginTop: -15
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              id="outlined-basic"
              variant="standard"
            ></TextField>
            <FormLabel>m</FormLabel>
          </Box>
          <Box sx={{ ml: 30, mt: 2 }}>
            <FormLabel>End</FormLabel>
            <TextField
              sx={{
                width: {
                  sm: 100,
                  marginLeft: 55,
                  marginTop: -15
                },
                "& .MuiInputBase-root": { height: 35 }
              }}
              id="outlined-basic"
              variant="standard"
            ></TextField>
            <FormLabel>m</FormLabel>
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
