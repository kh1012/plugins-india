import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AlignHorizontalRight } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import {isEmpty} from 'lodash';
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

}

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
      if(matlData !== undefined)
        for (const key of Object.keys(matlData) ) {
          temp.push([key, matlData[key].NAME])
        }
      // }
      setMatlList(temp);

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
          {/* role of map() in javascript & {} is enable to variable string*/}
          { isEmpty(matlList) ?
            <>       
            <MenuItem  value={0}>M20</MenuItem>
            <MenuItem value={1}>M25</MenuItem>
            <MenuItem value={2}>M30</MenuItem>
            <MenuItem value={3}>M35</MenuItem>
            <MenuItem value={4}>M40</MenuItem>
            <MenuItem value={5}>M50</MenuItem>
            </>
            :
            matlList.map((pairValue, idx) => {
              const matlId = pairValue[0];
              const matlName = pairValue[1];
              return <MenuItem key={idx} value={parseInt(matlId)}>{matlName}</MenuItem>
            })
          }

        </Select>
      </FormControl>
    </div>
  );
}