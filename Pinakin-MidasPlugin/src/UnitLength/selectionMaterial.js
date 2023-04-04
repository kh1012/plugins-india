import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { isEmpty } from 'lodash';
const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/matl', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6InBpbmFraW4iLCJwZyI6ImNpdmlsIiwiY24iOiJ0NU8wXzJCT1NBIn0.21ef19dcf29f455cd6184f69b16d679f2ed70c78aeb6fdf1597e78344b65ed46"
      "MAPI-Key": window.MAPIKey
    }
  })

  const data = (await res.json())["MATL"];
  return data;
}

export default function SelectSmall() {
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
      for ( const key of Object.keys(matlData) ) {
        temp.push([key, matlData[key]])
      }
      console.log(temp);
      setMatlList(temp);
    }

    //Async, Sync
    initAsync();
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
      {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
      <Select sx={{minWidth: 120,ml:60,position:'absolute',mt:-4}} 
                            labelId="demo-select-small"
                            id="material"
                            // value={age}
                            // label="Age"
                            onChange={handleChange}
                            defaultValue={matlList.length !== 0 ? parseInt(matlList[0][0]) : "M20"}
                            onClick={get}
                          >
                            {/* role of map() in javascript & {} is enable to variable string*/}
                            {matlList.map((pairValue, idx) => {
                              const matlId = pairValue[0];
                              const matlName = pairValue[1].NAME;
                              return <MenuItem key={idx} value={parseInt(matlId)}>{matlName}</MenuItem>
                            })}
                            {isEmpty(matlList) &&
                              <>
                                <MenuItem value={10}>M20</MenuItem>
                                <MenuItem value={20}>M30</MenuItem>
                                <MenuItem value={30}>M40</MenuItem>
                              </>
                            }
                          </Select>
    </FormControl>




  );
}