import * as React from 'react';
import Header from "./header";
import DataChart, { Changedata, data } from './dataChart';
import DiagramOpt from './diagramOpt';
import Units from './Units';
import LoadCaseCombinationList from './lccCheckbox';
import ElemOrNodeNum from './ElemOrNode_Num';
import OptionTabs from './optionTabs';
// MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {checkboxlist} from "./lccCheckbox.js";
import MyResponsiveLine from './dataChart';
import { getLCP } from 'web-vitals';
const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'civil';
window.baseUrl = baseUrl;
const NodestringResult=[];
var Noderesult = [];

var displacementvalues=[];
var element=[];
var elementstring;
var graphmethod="NodeNum";
var MAPI_Key= "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6ImxSWDYxaHJyU3cifQ.88542eb15481c61e46d3d5ade01e510d413bd6a8403f7b270dda635645fc07a3";
window.MAPI_Key=MAPI_Key;
const dt=[
];
var tabD=false;
var tabF=false;
var tabS=false;
var MUnit={
  'Length':'m',
  'Force':'KN'
};
 var Displacement={
  'D':false,
  'DX':false,
  'DY':false,
  'DZ':false,
  'AD':false,
  'RX':false,
  'RY':false,
  'RZ':false
 };

 

 var Force={
  'F':false,
  'FX':false,
  'FY':false,
  'FZ':false,
  'Fyz':false,
  'M':false,
  'Mx':false,
  'My':false,
  'Mz':false,
  'Myz':false
 };


 var Stress={
  'IS':false,
  'Sax':false,
  'Ssy':false,
  'Ssz':false,
  'Sby':false,
  'Sbz':false,
  "CS":false,
  'Maximum':false,
  'C1':false,
  'C2':false,
  'C3':false,
  'C4':false
 };



// export const data=[];
const datajson={
  "id": "Beam1",
  "color": "hsl(10, 90%, 50%)",
  "data": [
    {
      "x": 10,
      "y": 22
    },
    {
      "x": 20,
      "y": 22
    }
  ]
}
const changecoordinate=[
  {
    "x": 10,
    "y": 22
  },
  {
    "x": 20,
    "y": 22
  }
]

export default function PostProcess(){
  const [data,setData]=React.useState([]);
  const [Annotation,setAnnotation]=React.useState([]);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  React.useEffect(()=>{
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  const BoxComp = styled(Box)({
    width:windowSize.width,
    height:600,
    border:1,
    backgroundColor:"#F5F4FF",
    display:"flex", justifyContent:"center"
  })

  
  function Storethedata(){
    var i=0;
    
    while(i<checkboxlist.length){
      if(checkboxlist[i]!==undefined){
        console.log(checkboxlist[i]);
      }
      
      i++
    }

  }

  async function Updatethechart() {
    var Components;
    var Table_Type;
    getdata();
    if (Displacement.D) {
      Components = [
        "Node",
        "Load",
        "DX",
        "DY",
        "DZ",
        "RX",
        "RY",
        "RZ"
      ];
      Table_Type = "DISPLACEMENTG";
      await getresulttable(Table_Type, Components);
      await generatestring();
    }
    showchart();
  }

  async function generatestring() {
    var nodeid;
    var dinc = 0;
    var Lcomb = [];
    var Disp;
    var D_rot;

   
    //nodeid=(z+1).toString;
    for (let t = 0; t < element.length; t++) {
      var Disp_Value = {
        'NodeID': 0,
        'LComb': [],
        'D': [],
        'R': [],
      };
      Disp_Value.NodeID = element[t];
      Noderesult.push(Disp_Value);
    }

    for (let t = 0; t < element.length; t++) {
      for (let z = t; z < displacementvalues.length; z = z + element.length) {
        Noderesult[t].LComb.push(displacementvalues[z].LComb);
        Noderesult[t].D.push(displacementvalues[z].D);
        Noderesult[t].R.push(displacementvalues[z].R);
      }
    }

    console.log(Noderesult);
  }

async function getresulttable(Table_Type,Components){
  const response = await fetch(`${baseUrl}/${programType}/post/table`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': window.MAPI_Key
    },
    body: JSON.stringify(({
      "Argument": {
        "TABLE_NAME": "example",
        "TABLE_TYPE": Table_Type,
        "NODE_ELEMS": {
        "KEYS": element
        },
        "LOAD_CASE_NAMES": checkboxlist,
        "COMPONENTS":Components
        }
    }

    ))

  });

  var res= await response.json();

  var N=element.length*checkboxlist.length;
  for(let k=0;k<N;k++){

    var Disp_Value={
      'NodeID':0,
      'LComb':0,
      'D':[],
      'R':[],
     };

    Disp_Value.NodeID=res.example.DATA[k][1];
    Disp_Value.LComb=res.example.DATA[k][2];
    Disp_Value.D=[res.example.DATA[k][3],res.example.DATA[k][4],res.example.DATA[k][5]];
    Disp_Value.R=[res.example.DATA[k][6],res.example.DATA[k][7],res.example.DATA[k][7]];
    displacementvalues.push(Disp_Value);
  }
 

}

  async function Extractelement(st) {
    element=[];
    const spacesplitter = st.split(" ");
    for (let i = 0; i < spacesplitter.length; i++) {
      const tosplitter = spacesplitter[i].split("to");
      const startelem = parseInt(tosplitter[0]);
      const endelem = parseInt(tosplitter[1]);
      for (let j = startelem; j <= endelem; j++) {
        element.push(j);
      }

    }
    const uniqueNames = Array.from(new Set(element));
    element=uniqueNames;
 return element;
  }

  async function getdata() {
   var methodid=true;
    Units.Length = document.getElementById('Id_Length').innerHTML;
    Units.Force = document.getElementById('Id_Force').innerHTML;
    tabD = document.getElementById('simple-tab-0').tabIndex;
    tabF = document.getElementById('simple-tab-1').tabIndex;
    tabS = document.getElementById('simple-tab-2').tabIndex;
    elementstring = document.getElementById('Id_Elemstring').value;
    methodid = document.getElementById('Id_Nodenum').checked;
    if(methodid===false){
      graphmethod="NodeCCoord";
    }
    Extractelement(elementstring);
    if (tabD === 0 && tabF === -1 && tabS === -1) {
      Displacement.D = document.getElementById('Id_D').checked;
      if (Displacement.D) {
        Displacement.DX = document.getElementById('Id_DX').checked;
        Displacement.DY = document.getElementById('Id_DY').checked;
        Displacement.DZ = document.getElementById('Id_DZ').checked;
      }
      else {
        Displacement.RX = document.getElementById('Id_RX').checked;
        Displacement.RY = document.getElementById('Id_RY').checked;
        Displacement.RZ = document.getElementById('Id_RZ').checked;
      }
     
    }
    else if (tabD === -1 && tabF === 0 && tabS === -1) {
      Force.F = document.getElementById('Id_F').checked;
      if (Force.F) {
        Force.FX = document.getElementById('Id_Fx').checked;
        Force.FY = document.getElementById('Id_Fy').checked;
        Force.FZ = document.getElementById('Id_Fz').checked;
        Force.Fyz = document.getElementById('Id_Fyz').checked;
      }
      else {
        Force.Mx = document.getElementById('Id_Mx').checked;
        Force.My = document.getElementById('Id_My').checked;
        Force.Mz = document.getElementById('Id_Mz').checked;
        Force.Myz = document.getElementById('Id_Myz').checked;
      }

    }
    else {

      Stress.IS = document.getElementById('Id_Is').checked;
      if (Stress.IS) {
        Stress.Sax = document.getElementById('Id_Sax').checked;
        Stress.Ssy = document.getElementById('Id_Ssy').checked;
        Stress.Ssz = document.getElementById('Id_Ssz').checked;
        Stress.Sby = document.getElementById('Id_Sby').checked;
        Stress.Sbz = document.getElementById('Id_Sbz').checked;

      }
      else {
        Stress.Maximum = document.getElementById('Id_Max').checked;
        Stress.C1 = document.getElementById('Id_C1').checked;
        Stress.C2 = document.getElementById('Id_C2').checked;
        Stress.C3 = document.getElementById('Id_C3').checked;
        Stress.C4 = document.getElementById('Id_C4').checked;

      }

    }
  }

  async function showchart(){
    if (graphmethod === "NodeNum") {
      for (let i = 0; i < element.length; i++) {
        const tempjson={
          "id": "Beam2",
          "color": "hsl(90, 70%, 50%)",
          "data": [
            {
              "x": 30,
              "y": 22
            },
            {
              "x": 40,
              "y": 22
            }
          ]
        }
        const elemdt = await getelem(element[i]);
        tempjson.id=`Beam${i+1}`;
        tempjson.data[0].x=elemdt[i+1].NODE[0];
        tempjson.data[1].x=elemdt[i+1].NODE[1];
        dt.push(tempjson);
      }
      setData(dt);
    }   
    else{
      for (let i = 0; i < element.length; i++) {
        const tempjson={
          "id": "Beam2",
          "color": "hsl(90, 70%, 50%)",
          "data": [
            {
              "x": 30,
              "y": 22
            },
            {
              "x": 40,
              "y": 22
            }
          ]
        }
        const elemdt = await getelem(element[i]);
        tempjson.id=`Beam${i+1}`;
        tempjson.data[0].x=await getnodexcoord(elemdt[i+1].NODE[0]);
        tempjson.data[1].x=await getnodexcoord(elemdt[i+1].NODE[1]);
        dt.push(tempjson);
      }
      setData(dt);
    }
  }

  async function getelem(id) {
    const res = await fetch(`https://api-beta.midasit.com:443/civil/db/elem/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "MAPI-Key": window.MAPI_Key 
      }
    })
    if(res.ok){
      const data = (await res.json())["ELEM"];
      return data;
    }
    else{
      return "";
    }
  }

  async function getnodexcoord(id) {
    const res = await fetch(`https://api-beta.midasit.com:443/civil/db/node/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "MAPI-Key": window.MAPI_Key 
      }
    })
    if(res.ok){
      const data = (await res.json())["NODE"];
      return data[id].X;
    }
    else{
      return "";
    }
  }

  return (
    <React.Fragment>
      <Header/>
      <BoxComp>
        <Stack direction={"row"}>
          <Box sx={{ml:1, mt:2, mr:1, mb:2, width:'45vw', height: '40vh', display:"flex", justifyContent:"center", flexDirection: "column", flexWrap:"wrap"}}>
            <DataChart data={data}/>
            <Divider sx={{my: 3}} />
            <DiagramOpt/>
          </Box>
          <Box sx={{p:5, mt:2, ml:1, mr:1, mb:2, width:window.innerWidth*0.25, background:"#FFFFFF"}}>
            <Units/>
            <Divider sx={{p:1}}/>
            <ElemOrNodeNum />
            <Divider sx={{p:1}}/>
            <OptionTabs />
          </Box>
          <Box sx={{mt:2, mb:2, ml:1, width:'20vw', background:"#FFFFFF"}}>
            <LoadCaseCombinationList width={window.innerWidth*0.2}/>
          </Box>
        </Stack>
      </BoxComp>
    
     <Box>
      <Button onClick={Storethedata} sx={{ml:"10vw", marginTop:3}} variant='contained'> Refresh window</Button>
      <Button onClick={Updatethechart} sx={{ml:2, marginTop:3}} variant='contained'> Draw Graph</Button>
      </Box>
    </React.Fragment>
  )
}