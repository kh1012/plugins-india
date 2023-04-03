import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tcb from "./TwelveCheckBoxes"
import { TextField } from "@mui/material";
import  { useState } from "react";
import ReactDOM from "react-dom";

var dchecked = {val:false};

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    a: null,
    b: null,
    c: null,
    d: null,
    e: null
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
   
    if(event.target.name=="a")
      {setIsDisabled(!isDisabled)}
      if(event.target.name=="c")
      {setIsDisabledC(!isDisabledC)}
      if(event.target.name=="d")
      {setIsDisabledD(!isDisabledD)}
      if(event.target.name=="e")
      {setIsDisabledE(!isDisabledE)}
  };
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDisabledC, setIsDisabledC] = React.useState(true);
  const [isDisabledD, setIsDisabledD] = React.useState(false);
  const [isDisabledE, setIsDisabledE] = React.useState(true);
  const { a, b, c, d, e } = state;
  const error = [a, b, c, d, e].filter((v) => v).length !== 5;
 
  

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{  ml:-22,mt:-20,font:'caption'}} component="fieldset" variant="standard">
        <FormLabel component="legend">Options</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox id={"chk_a"} checked={a} onChange={handleChange} name="a" />}
            label="With Structural Group"
          />
                  <Box sx={{ ml: 40,mt:2,position:'absolute'}}>                     
                      <TextField
                          id="strgrp"
                          sx={{
                              width: {
                                  sm: 100,
                                  marginLeft: 50,
                                  marginTop: -15,
                                  
                              },
                              "& .MuiInputBase-root": { height: 35 }
                          }}
                          
                          variant="standard"
                          disabled={isDisabled}
                      ></TextField>
                      

                  </Box>

          <FormControlLabel
            control={<Checkbox id={"chk_b"} checked={b} onChange={handleChange} name="b" />}
            label="With Node Local Axis"
          />
          <FormControlLabel
            control={<Checkbox id={"chk_c"} checked={c} onChange={handleChange} name="c" />}
            label="With Notional Size"
          />
                <Box sx={{ ml: 40 ,mt:11,position:'absolute'}}>
                <FormLabel>a =</FormLabel>
                <TextField
                    sx={{
                        width: {
                            sm: 100,
                            marginLeft: 25,
                            marginTop: -15,
                            
                        },
                        "& .MuiInputBase-root": { height: 35 }
                    }}

                    id="notionalsize"
                    variant="standard"
                    disabled={isDisabledC}
                ></TextField>
                
                </Box>
          <FormControlLabel
            control={<Checkbox id={"chk_d"} checked={d} onChange={handleChange} name="d" />}
            label="With Restrained Supports"
           
          />
          <Tcb isDisabledSC={!isDisabledD}/>

          <FormControlLabel
            control={<Checkbox id={"chk_e"} checked={e} onChange={handleChange} name="e" />}
            label="With Beam End Offset"
          />
                     <Box disabled={isDisabledE} sx={{ ml: 40 }}>

                      <FormLabel disabled={isDisabledE}>Start</FormLabel>
                      <TextField
                          sx={{
                              width: {
                                  sm: 100,
                                  marginLeft: 50,
                                  marginTop: -15,
                                  
                              },
                              "& .MuiInputBase-root": { height: 35 }
                          }}

                          id="beamendoffset_start"
                          variant="standard"
                          disabled={isDisabledE}
                      ></TextField>
                      <FormLabel disabled={isDisabledE}>m</FormLabel>
                  </Box>

                  <Box disabled={isDisabledE} sx={{ ml: 40, mt: 2 }}>
                      <FormLabel disabled={isDisabledE}>End</FormLabel>
                      <TextField disabled={isDisabledE}
                          sx={{
                              width: {
                                  sm: 100,
                                  marginLeft: 55,
                                  marginTop: -15,
                                  
                              },
                              "& .MuiInputBase-root": { height: 35 }
                          }}
                          id="beamendoffset_end"
                          variant="standard"
                          
                      ></TextField>
                      <FormLabel disabled={isDisabledE}>m</FormLabel>
                </Box>
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      {/* <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={a} onChange={handleChange} name="a" />}
            label="a"
          />
          <FormControlLabel
            control={<Checkbox checked={b} onChange={handleChange} name="b" />}
            label="b"
          />
          <FormControlLabel
            control={<Checkbox checked={c} onChange={handleChange} name="c" />}
            label="c"
          />
          <FormControlLabel
            control={<Checkbox checked={d} onChange={handleChange} name="d" />}
            label="d"
          />
          <FormControlLabel
            control={<Checkbox checked={e} onChange={handleChange} name="e" />}
            label="e"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl> */}
    </Box>
  );
}

