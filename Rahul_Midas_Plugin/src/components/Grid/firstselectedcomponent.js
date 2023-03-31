import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AlignHorizontalRight } from '@mui/icons-material';
import { green } from '@mui/material/colors';

export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ marginLeft:80, mt: -1,backgroundColor:"snow", minWidth:50  ,alignItems:"flex-end" }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard1"
          value={age}
          onChange={handleChange}
          label="m"
        >
          <MenuItem value={10}>m</MenuItem>
          <MenuItem value={20}>cm</MenuItem>
          <MenuItem value={30}>mm</MenuItem>
          <MenuItem value={40}>in</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}