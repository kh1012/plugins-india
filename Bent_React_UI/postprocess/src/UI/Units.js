import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { Stack, Typography } from '@mui/material';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];

export default function Units () {

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  return (
    <Box>
      <Typography>Units</Typography>
        <Stack>
          <Box sx={{ml:2, mt:1}}>
            <Typography sx={{float:"left", mt:2.5}}>Force</Typography>
            <Autocomplete sx={{float:"right", width:200}}
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="disableCloseOnSelect" variant="standard" />
              )}
            />
          </Box>
          <Box sx={{ml:2}}>
            <Typography sx={{float:"left", mt:2.5}}>Length</Typography>
            <Autocomplete sx={{float:"right", width:200}}
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="disableCloseOnSelect" variant="standard" />
              )}
            />
          </Box>
        </Stack>
    </Box>

  )
}