import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Grid1 from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
export var checkboxlist= [];

const get = async () => {
  const res = await fetch('https://api-beta.midasit.com:443/civil/db/lcom-conc', {
    headers: {
      "Content-Type": "application/json",
      // "MAPI-Key": "eyJ1ciI6ImxoeTAxMTgiLCJwZyI6ImNpdmlsIiwiY24iOiIwak9lUTJnYlJRIn0.d54292d340fc5e847d1f8220c3d316d8738c29ebc40ca5901f539ad6be44c66c"
      "MAPI-Key": "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6ImxSWDYxaHJyU3cifQ.88542eb15481c61e46d3d5ade01e510d413bd6a8403f7b270dda635645fc07a3"
    }
  })
  if(res.ok){
    const data = (await res.json())["LCOM-CONC"];
    
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
          TempObj[matlId] = matlData[matlId].NAME+"(CBC)";
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

const displayLoadcombination = event=>{
  if (event.target.checked) {
    checkboxlist.push(event.target.value);
    
  }
   else {
   
    var index = checkboxlist.indexOf(event.target.value); // Let's say it's Bob.
    delete checkboxlist[index];
  }
};



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
                  <Checkbox key={idx} value={matlId} sx={{float:"right", ml:12}}  onClick={displayLoadcombination} />
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