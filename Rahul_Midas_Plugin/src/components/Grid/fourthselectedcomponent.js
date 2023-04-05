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
    if (event.target.value == 20) {
      document.getElementById('Labelid1').innerText = "Length of element"
      document.getElementById('Labelid2').innerText = document.getElementById('Units').innerText
    }
    else {
      document.getElementById('Labelid1').innerText = "Number of element"
      document.getElementById('Labelid2').innerText = "each"
    }
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ marginLeft: 80, mt: -1, backgroundColor: "snow", minWidth: 50, alignItems: "flex-end" }}>
        <Select
          labelId="demo-simple-select-standard-label"
          // id="demo-simple-select-standard"
          id="DivMethod"
          value={age}
          onChange={handleChange}
          label="m"
        >
          <MenuItem value={10}>Uniform</MenuItem>
          <MenuItem value={20}>MaxLength</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}