import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value==20)
    {document.getElementById('id1').innerText="Length of Element";
    // document.getElementById('id2').innerText="ea"
    }
    else 
    {document.getElementById('id1').innerText="Number of Element";
    // if(document.getElementById('ulid').value==10) {document.getElementById('id2').innerText="m"}
    // else if(document.getElementById('ulid').value==20) {document.getElementById('id2').innerText="mm"}
    // else if(document.getElementById('ulid').value==30) {document.getElementById('id2').innerText="in"};
    }

    if (event.target.value==10)
    {document.getElementById('id2').innerText="ea"}
    else
    {document.getElementById('id2').innerText=document.getElementById('ulid').textContent}
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
      {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
      <Select sx={{minWidth: 120,ml:60,position:'absolute',mt:-4}} 
                            labelId="demo-select-small"
                            id="demo-select-small"
                            // value={age}
                            // label="Age"
                            onChange={handleChange}
                            // defaultValue={10}
                          >
                            
                            <MenuItem value={10}>Uniform</MenuItem>
                            <MenuItem value={20}>Max.Length</MenuItem>
                            
                          </Select>
    </FormControl>




  );
}