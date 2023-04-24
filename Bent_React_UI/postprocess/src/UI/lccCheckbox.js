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
      "MAPI-Key": window.MAPI_Key
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

var ab={};


const LoadCombination = [
 
]

export default function LoadCaseCombinationList(props) {
  const [val,setcheckbox]=React.useState({});
  const [LoadCombList, setLoadCombList] = React.useState(LoadCombination);

  // function checklist(val){
  //   if(checkboxlist.includes(val))
  //   setcheckbox(true);
  //   else
  //   setcheckbox(false);
    
  //   }

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
          if(props.chkbox!==undefined){
            if(props.chkbox.includes(matlData[matlId].NAME+"(CBC)")){
              TempObj[matlId] = [matlData[matlId].NAME+"(CBC)",true];
            }
            else{
              TempObj[matlId] = [matlData[matlId].NAME+"(CBC)",false];  
            }
           
         
          }
          else{
            TempObj[matlId] = [matlData[matlId].NAME+"(CBC)",false];  
          }
        
          temp.push(TempObj)
        }
        setLoadCombList(temp);
      }
    }

    //Async, Sync
    initAsync();
  }, [LoadCombList]);

  // const fieldRef = React.useRef<HTMLInputElement>(null);
  // React.useEffect(() => {
  //   if (error && fieldRef.current) {
  //     // fieldRef.current.scrollIntoView();
  //     fieldRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [error]);

const displayLoadcombination = event=>{

  
  //setcheckbox(!val);
  if (event.target.checked) {
    checkboxlist.push(event.target.value);
    //ab[event.target.value]=event.target.checked;
    //setcheckbox(ab);
  }
   else {
   
    var index = checkboxlist.indexOf(event.target.value);// Let's say it's Bob.
   // ab[event.target.value]=false ;
   // setcheckbox(ab);
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
            const matlId = value[idx+1][0];
            const checkedstatus= value[idx+1][1];
            const matlInfo = value;
            {/* <DataGrid> */}
            return (
                <Box key={"Box" + idx}>
                  <Typography sx={{float:"left", mt:1}}>{matlId}</Typography>
                  <Checkbox  key={idx} defaultChecked={checkedstatus} value={matlId} sx={{float:"right", ml:12}}   onClick={displayLoadcombination} />
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