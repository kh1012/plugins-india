import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl id="ulid" sx={{ m: 1, minWidth: 120 }} size="small" >
      {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
      <Select sx={{minWidth: 120,ml:60,position:'absolute',mt:-4}} 
                            labelId="demo-select-small"
                            id="demo-select-small"
                            // value={age}
                            // label="Age"
                            onChange={handleChange}
                            defaultValue={10}
                          >
                            
                            <MenuItem value={10}>m</MenuItem>
                            <MenuItem value={20}>mm</MenuItem>
                            <MenuItem value={30}>in</MenuItem>
                          </Select>
    </FormControl>




  );
}