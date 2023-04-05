import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AlignHorizontalRight } from '@mui/icons-material';
import { green } from '@mui/material/colors';
const get = async () => {

  const res = await fetch('https://api-beta.midasit.com:443/civil/db/matl', {
    headers: {
      "Content-Type": "application/json",
      "MAPI-Key":window.mapikey
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

export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //react State (useState)
  const [matlList, setMatlList] = React.useState([]);

  //react Hook (useEffect)
  React.useEffect(() => {
    const initAsync = async () => {
     
     const matlData = await get();
      const temp = [];
      // if(matlData===undefined){
      //   temp.push([1, "M30"])
      //   temp.push([2, "M35"])
      //   temp.push([3, "M40"])
      // }
      // else{
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
       
          setMatlList(temp);
        }
      // }
    }

    //Async, Sync
    initAsync();
  }, []);


  return (
    <div>
      <FormControl variant="standard" sx={{ marginLeft: 80, mt: -1, backgroundColor: "snow", minWidth: 50, alignItems: "flex-end" }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="Material"
          value={age}
          onChange={handleChange}
          // label="m"
          // defaultValue={matlList.length !== 0 ? parseInt(matlList[0][0]) : 1}
        >
         {matlList.map((value, idx) => {
            const matlId = Object.keys(value)[0];
            const matlInfo = value[matlId];
            return <MenuItem key={idx} value={matlInfo}>{matlId}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}