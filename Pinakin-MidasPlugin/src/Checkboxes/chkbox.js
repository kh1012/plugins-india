import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tcb from "./TwelveCheckBoxes"
import { TextField } from "@mui/material";

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
  };

  const { a, b, c, d, e } = state;
  const error = [a, b, c, d, e].filter((v) => v).length !== 5;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{  ml:-22,mt:-20,font:'caption'}} component="fieldset" variant="standard">
        <FormLabel component="legend">Options</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={a} onChange={handleChange} name="a" />}
            label="With Structural Group"
          />
                  <Box sx={{ ml: 40,mt:2,position:'absolute'}}>                     
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
                      

                  </Box>

          <FormControlLabel
            control={<Checkbox checked={b} onChange={handleChange} name="b" />}
            label="With Node Local Axis"
          />
          <FormControlLabel
            control={<Checkbox checked={c} onChange={handleChange} name="c" />}
            label="With Notional Size"
          />
                <Box sx={{ ml: 40 ,mt:11,position:'absolute'}}>
                <FormLabel>a =</FormLabel>
                <TextField
                    sx={{
                        width: {
                            sm: 100,
                            marginLeft: 25,
                            marginTop: -15
                        },
                        "& .MuiInputBase-root": { height: 35 }
                    }}

                    id="outlined-basic"
                    variant="standard"
                ></TextField>
                
                </Box>
          <FormControlLabel
            control={<Checkbox checked={d} onChange={handleChange} name="d" />}
            label="With Restrained Supports"
          />
          <Tcb/>
          <FormControlLabel
            control={<Checkbox checked={e} onChange={handleChange} name="e" />}
            label="With Beam End Offset"
          />
                     <Box sx={{ ml: 40 }}>

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

                  <Box sx={{ ml: 40, mt: 2 }}>
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

// import * as React from 'react';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { TextField } from '@mui/material';
// import { useState } from "react";

// export default function CheckboxLabels() {
//     const [checked, setChecked] = useState(false);
//     const [text, setText] = useState("");
//   return (
//     <FormGroup sx={{ml:-20,mt:3}}>
//       <FormControlLabel control={<Checkbox defaultChecked />} label="With Sructural Group" />
//       <TextField sx={{width: { sm: 100, marginLeft: 500, marginTop: 10, position: "absolute" } ,ml:70,marginTop:-2 ,'& .MuiTextField-root': { m: 1, width: '25ch' ,height:45}}}></TextField>
//       <FormControlLabel control={<Checkbox />} label="With Node Local Axis" />
//       <FormControlLabel  control={<Checkbox />} label="With Notional Size" />
//       <FormControlLabel  control={<Checkbox />} label="With Restrained Supports" />
//       <FormControlLabel  control={<Checkbox />} label="With Beam End Offset" />
//     </FormGroup>
//   );
// }