
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
  return (
    <Box
      component="form"
      sx={{ size:"absolute",position:'absolute',ml:45,mt:-19,
        '& .MuiTextField-root': { m: 1, width: '15ch' ,height:45},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label=""
          id="Node_Start_Node"
          defaultValue=""
          size="large"
          variant="standard"
        />
        {/* <TextField 
          label=""
          id="standard-size-small"
          defaultValue="2"
          size="large"
          variant="standard" /> */}
      </div>
      <div>
        <TextField
          label=""
          id="Node_End_Node"
          defaultValue=""
          size="large"
          variant="standard"
        />
        {/* <TextField
          label=""
          id="standard-size-small"
          defaultValue="4"
          size="large"
          variant="standard"/> */}
      </div>
      <div>
        <TextField
          label=""
          id="Node_Length_Of_Elements"
          defaultValue=""
          size="large"
          variant="standard"
        />
        {/* <TextField
          label="Size6"
          id="standard-size-small"
          defaultValue="Small"
          size="small"
          variant="standard"
        /> */}
      </div>
    </Box>
  );
}