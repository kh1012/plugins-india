import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/sect', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6ImxoeTAxMTgiLCJwZyI6ImNpdmlsIiwiY24iOiIwak9lUTJnYlJRIn0.d54292d340fc5e847d1f8220c3d316d8738c29ebc40ca5901f539ad6be44c66c"
      "MAPI-Key": window.MAPIKey
    }
  })
  if(res.ok){
    const data = (await res.json())["SECT"];
    document.getElementById('frmSect').innerText = "Section ID(Section Already Defined)";
    return data;
  }
  else{
    document.getElementById('frmSect').innerText = "Section";
    return "";
  }
}

const defaultSect = [
  {"200X300": 10},
  {"300X300": 20},
  {"300X500": 30},
]

export default function SelectSmall() {
  const [sect, setSect] = React.useState('');

  const handleChange = (event) => {
    setSect(event.target.value);
  };

   //react State (useState)
   const [sectList, setSectList] = React.useState([]);
    //react Hook (useEffect)
    React.useEffect(() => {
      const initAsync = async () => {
        const sectData = await get();
        const temp = [];
        if(sectData === "") {
          setSectList(defaultSect);
        }
        else {
          let keys = Object.keys(sectData);
          for ( let idx = 0; idx < keys.length; idx++ ) {
            const sectId = keys[idx];
            const TempObj = {};
            TempObj[sectId] = sectData[sectId];
            temp.push(TempObj)
          }
          console.log(temp);
          setSectList(temp);
        }
      }
  
      //Async, Sync
      initAsync();
    }, []);

  return (
    <Box sx={{ minWidth: 120, ml:1}}>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
      {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
      <Select sx={{minWidth: 120,ml:60,position:'absolute',mt:-4}} 
                            labelId="demo-select-small"
                            id="section"
                            value={sect}
                            // label="Age"
                            onChange={handleChange}
                            defaultValue={10}
                          >
                            {sectList.map((value, idx) => {
                              const sectId = Object.keys(value)[0];
                              const sectInfo = value[sectId];
                              return <MenuItem key={idx} value={sectInfo}>{sectId}</MenuItem>
                            })}
                            {/* <MenuItem value={10}>200X300</MenuItem>
                            <MenuItem value={20}>300X300</MenuItem>
                            <MenuItem value={30}>300X500</MenuItem> */}
                          </Select>
    </FormControl>
    </Box>



  );
}