import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { isEmpty } from 'lodash';
import Box from '@mui/material/Box';

const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/matl', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6ImxoeTAxMTgiLCJwZyI6ImNpdmlsIiwiY24iOiIwak9lUTJnYlJRIn0.d54292d340fc5e847d1f8220c3d316d8738c29ebc40ca5901f539ad6be44c66c"
      "MAPI-Key": window.MAPIKey
    }
  })
  if(res.ok){
    const data = (await res.json())["MATL"];
    return data;
  }
  else{
    return "";
  }
}

const defaultMatl = [
  {"M20": 10},
  {"M30": 20},
  {"M40": 30},
]

export default function SelectSmall() {
  const [matl, setMatl] = React.useState('');

  const handleChange = (event) => {
    setMatl(event.target.value);
  };

  //react State (useState)
  const [matlList, setMatlList] = React.useState([]);

  //react Hook (useEffect)
  React.useEffect(() => {
    const initAsync = async () => {
      const matlData = await get();
      const temp = [];
      if(matlData === "") {
        setMatlList(defaultMatl);
      }
      else {
        let keys = Object.keys(matlData);
        for ( let idx = 0; idx < keys.length; idx++ ) {
          const matlId = keys[idx];
          const TempObj = {};
          TempObj[matlId] = matlData[matlId];
          temp.push(TempObj)
        }
        console.log(temp);
        setMatlList(temp);
      }
    }

    //Async, Sync
    initAsync();
  }, []);

  return (
    <Box sx={{ minWidth: 120, ml:1}}>
      <FormControl fullWidth>
        <Select sx={{minWidth: 120, height:40, ml:60, position:'absolute', mt:-3}} 
          labelId="select-matl"
          id="material"
          value={matl}
          onChange={handleChange}
          color="primary"
        >
          {matlList.map((value, idx) => {
            const matlId = Object.keys(value)[0];
            const matlInfo = value[matlId];
            return <MenuItem key={idx} value={matlInfo}>{matlId}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}