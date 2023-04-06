import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
// import { DataGrid } from "@mui/x-data-grid";
import Grid1 from '@mui/material/Grid';
import Stack from "@mui/material/Stack";

const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/lcom', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6ImxoeTAxMTgiLCJwZyI6ImNpdmlsIiwiY24iOiIwak9lUTJnYlJRIn0.d54292d340fc5e847d1f8220c3d316d8738c29ebc40ca5901f539ad6be44c66c"
      "MAPI-Key": "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6IkN3X1pza3JLVFEifQ.af1b0bd91c50722d4117b893e2b32e45463b110a42a82c87f862dbe46b7460a3"
    }
  })
  if(res.ok){
    const data = (await res.json())["LCOM"];
    
    return data;
  }
  else{
    
    return "";
  }
}



const LoadCombination = [
  {"LC1": 10},
  {"LC2": 20},
  {"LC3": 30},
]

export default function LoadCaseCombinationList(props) {

  const [LoadCombList, setLoadCombList] = React.useState(LoadCombination);

  React.useEffect(() => {
    const initAsync = async () => {
      const matlData = await get();
      const temp = [];
      if(matlData==="")
      {
        setLoadCombList(LoadCombList);
      }
      else{
        let keys = Object.keys(matlData);
        for ( let idx = 0; idx < keys.length; idx++ ) {
          const matlId = keys[idx];
          const TempObj = {};
          TempObj[matlId] = matlData[matlId].NAME;
          temp.push(TempObj)
        }
        setLoadCombList(temp);
      }
    }

    //Async, Sync
    initAsync();
  }, []);

  // const fieldRef = React.useRef<HTMLInputElement>(null);
  // React.useEffect(() => {
  //   if (error && fieldRef.current) {
  //     // fieldRef.current.scrollIntoView();
  //     fieldRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [error]);

  function displayLoadcombination(matlId)
  {
    console.log({matlId});
  }

  return (
    <Box sx={{height:600, p:1, display:"flex", justifyContent:"center"}}>
      <Stack>
      <Typography sx={{mb:1, ml:1}}>Load Case and Combinations</Typography>
      <Box sx={{ height:500, width:props.width*0.8, border:1, p:1 }}>
        <Box sx={{display:"flex",
                  flexDirection: "column", 
                  overflow: "hidden",
                  overflowY: "scroll",
                  height:480,
                  width:props.width*0.75,
                  ml:2, mt:1
                }}>
          {LoadCombList.map((value, idx) => {
            // const matlId = Object.keys(value)[0];
            const matlId = value[idx+1];
            const matlInfo = value;
            {/* <DataGrid> */}
            return (
                <Box>
                  <Typography sx={{float:"left", mt:1}}>{matlId}</Typography>
                  <Checkbox key={idx} value={matlInfo} sx={{float:"right", ml:12}} onClick={() => {displayLoadcombination(matlId)}} />
                </Box>
              )
          })}
          {/* </DataGrid> */}
        </Box>
      </Box>
      </Stack>
    </Box>
  );
}