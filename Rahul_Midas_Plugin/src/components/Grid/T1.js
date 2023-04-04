
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
    return (
        <Box
            component="form"
            sx={{
                size: "absolute", position: 'absolute', ml: 55, mt: -19,
                '& .MuiTextField-root': { m: 1, width: '15ch', height: 45 },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    label=""
                    id="Coordinate_Start_Number"
                    defaultValue=""
                    size="large"
                    variant="standard"
                />
                <TextField
                    label=""
                    id="Coordinate_Start_Coordinate"
                    defaultValue=""
                    size="large"
                    variant="standard" />
            </div>
            <div>
                <TextField
                    label=""
                    id="Coordinate_End_Number"
                    defaultValue=""
                    size="large"
                    variant="standard"
                />
                <TextField
                    label=""
                    id="Coordinate_End_Coordinate"
                    defaultValue=""
                    size="large"
                    variant="standard"
                />
            </div>
            <div>
                <TextField
                    label=""
                    id="Coordinate_Length_Of_Elements"
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