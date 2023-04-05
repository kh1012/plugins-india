import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AlignHorizontalRight } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/sect', {
    headers: {
      "Content-Type": "application/json",
      "MAPI-Key":window.mapikey
    }
  })
  if(res.ok){
    const data = (await res.json())["SECT"];
    return data;
  }
  else{
    return "";
  }
}

const defaultSect = [
  {"200X300": 10},
  {"300X300": 20},
  {"300X500": 30},
]

export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
        setSectList(temp);
      }
    }

    //Async, Sync
    initAsync();
  }, []);

  return (
    <div>
      <FormControl variant="standard" sx={{ marginLeft:80, mt: -1,backgroundColor:"snow", minWidth:50  ,alignItems:"flex-end" }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="Section"
          value={age}
          onChange={handleChange}
          label="m"
        >
           {sectList.map((value, idx) => {
                              const sectId = Object.keys(value)[0];
                              const sectInfo = value[sectId];
                              return <MenuItem key={idx} value={sectInfo}>{sectId}</MenuItem>
                            })}

        </Select>
      </FormControl>
    </div>
  );
}