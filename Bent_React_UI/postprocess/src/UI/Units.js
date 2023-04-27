import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { FormControl, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/unit', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6ImxoeTAxMTgiLCJwZyI6ImNpdmlsIiwiY24iOiIwak9lUTJnYlJRIn0.d54292d340fc5e847d1f8220c3d316d8738c29ebc40ca5901f539ad6be44c66c"
      "MAPI-Key": window.MAPI_Key 
    }
  })
  if(res.ok){
    const data = (await res.json())["UNIT"];
   
    return data;
  }
  else{

    return "";
  }
}

const defaultLengthUnit = [
  {"m": 10},
  {"MM": 20},
  {"IN": 30},
]

const defaultForceUnit = [
  {"KN": 10},
  {"N": 20},
  {"lb": 30},
]

const top100Films = [
  { title: 'm', year: 1994 },
  { title: 'KN', year: 1972 },
];

export default function Units (props) {
  const [sect, setSect] = React.useState('');
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const handleChange = (event) => {
    setSect(event.target.value);
  };

  const [unitList, setUnitList] = React.useState([]);
    //react Hook (useEffect)
    React.useEffect(() => {
      const initAsync = async () => {
        const unitData = await get();
        const temp = [];
        if(unitData === "") {
          setUnitList(defaultLengthUnit);
        }
        else {
          let keys = Object.keys(unitData);
          for ( let idx = 0; idx < keys.length; idx++ ) {
            const sectId = keys[idx];
            const TempObj = {};
            TempObj[sectId] = unitData[sectId];
            temp.push(TempObj)
          }
         
          setUnitList(temp);
        }
      }
  
      //Async, Sync
      initAsync();
    }, []);


  const FormWidth = props.width;

  return (
    <Box>
      <Typography>Units</Typography>
        <Stack>
          <Box sx={{ml:2, mt:1}}>
            <Typography sx={{float:"left", mt:2.5}}>Force</Typography>
            <FormControl  sx={{float:"right", width:FormWidth*0.4}} variant="standard">
              <Select id="Id_Force" sx={{float:"right", height:'3vh', mt:'1vh', textAlign:'center'}} onChange={handleChange} >
                {unitList.map((value, idx) => {
                  if(value["1"] !== undefined){
                    return <MenuItem key={idx} value={10}>{value['1']['FORCE']}</MenuItem>
                  }
                  else {
                    return <></>
                  }
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ml:2}}>
            <Typography sx={{float:"left", mt:2.5}}>Length</Typography>
            <FormControl  sx={{float:"right", width:FormWidth*0.4}} variant="standard">
              <Select id="Id_Length" sx={{float:"right", height:'3vh', mt:'1vh', textAlign:'center'}} onChange={handleChange} >
                {unitList.map((value, idx) => {
                  if(value["1"] !== undefined){
                    return <MenuItem key={idx} value={10}>{value['1']['DIST']}</MenuItem>
                  }
                  else {
                    return <></>
                  }
                })}
              </Select>
            </FormControl>
          </Box>
        </Stack>
    </Box>
  )
}