import * as React from 'react';
import Header from "./header";
import DataChart, { Changedata, data } from './dataChart';
import DiagramOpt from './diagramOpt';
import Units from './Units';
import LoadCaseCombinationList from './lccCheckbox';
import ElemOrNodeNum from './ElemOrNode_Num';
import OptionTabs from './optionTabs';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 'reactjs-popup/dist/index.css';
import PropTypes from 'prop-types';
// MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { checkboxlist } from "./lccCheckbox.js";
import MyResponsiveLine from './dataChart';
import { getLCP } from 'web-vitals';



function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box width="50vw" height='25' backgroundColor="ovary">
      <DialogTitle width="25vw" align='center'>Processing!</DialogTitle>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

//

const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'civil';
window.baseUrl = baseUrl;
var NodeDataCollection = {};
var supportNodeColleection=[];
var obj;
var Nodeidcollection = [];
var NodestringResult = [];
var Noderesult = {};
var displacementstring = [];
var displacementvalues = [];
var Forcevalues = {};
var forceusedLC=[];
var Stressvalues = {};
var StressusedLC=[];
var element = [];
var elementstring;
var graphmethod = "NodeNum";
var MAPI_Key = "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6IjAyMURtUWxZVHcifQ.305412b34074b366859d71986b0a4f9c9995eb24c1aa82ab02a73ff2a6fb5198";
window.MAPI_Key = MAPI_Key;
const dt = [
];
var tabD = false;
var tabF = false;
var tabS = false;
var MUnit = {
  'Length': 'm',
  'Force': 'KN'
};
var Displacement = {
  'D': false,
  'DX': false,
  'DY': false,
  'DZ': false,
  'AD': false,
  'RX': false,
  'RY': false,
  'RZ': false
};

const AnnotationDefaultData = [];


var Force = {
  'F': false,
  'FX': false,
  'FY': false,
  'FZ': false,
  'Fyz': false,
  'M': false,
  'Mx': false,
  'My': false,
  'Mz': false,
  'Myz': false
};

var checkboxlist2=[];
var Stress = {
  'IS': false,
  'Sax': false,
  'Ssy': false,
  'Ssz': false,
  'Sby': false,
  'Sbz': false,
  "CS": false,
  'Maximum': false,
  'C1': false,
  'C2': false,
  'C3': false,
  'C4': false
};



// export const data=[];
const datajson = {
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
const changecoordinate = [
  {
    "x": 10,
    "y": 22
  },
  {
    "x": 20,
    "y": 22
  }
]

export default function PostProcess() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [GM, setGMData] = React.useState("Node");
  const [data, setData] = React.useState([]);
  const [Annotation, setAnnotation] = React.useState([]);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const BoxComp = styled(Box)({
    width: windowSize.width,
    height: 600,
    border: 1,
    backgroundColor: "#F5F4FF",
    display: "flex", justifyContent: "center"
  })


  function Storethedata() {
   setData([]);

  }

  function reinitialise(){
    Noderesult = {};
    Nodeidcollection = [];
    NodestringResult = [];
    Noderesult = {};
    displacementstring = [];
    displacementvalues = [];
    Forcevalues = {};
    forceusedLC = [];
    Stressvalues = {};
    StressusedLC = [];

  }

  async function Updatethechart() {
    setOpen(true);
    reinitialise();
    var Components;
    var Table_Type;
    var i = 0;
    while (i < checkboxlist.length) {
      if (checkboxlist[i] !== undefined) {
        checkboxlist2.push(checkboxlist[i]);
      }
      i++
    }

 // checkboxlist=checkboxlist2;
    getdata();
    await showchart();
    const uniqueNames = Array.from(new Set(Nodeidcollection));
    Nodeidcollection = uniqueNames;
    if (Displacement.D || Displacement.AD) {
      // dt={};
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
      var Arrcomp_Value = {
        'NodeID': 0,
        'LComb': 0,
        'D': [],
        'R': [],
      };
      
      var res=await getresulttable(Table_Type, Components);
      await getdisplacement(res);
      await generatestringDisplacement();
      await changethegraph();
    }
   
    var Parts;
  if(Force.F||Force.M){
    // dt={};
    Components = [
      "Elem",
      "Load",
      "Part",
      "Axial",
      "Shear-y",
        "Shear-z",
      "Torsion",
      "Moment-y",
      "Moment-z"
      ];

      Parts=[
        "Part I",
        "Part J"
       ];
    Table_Type = "BEAMFORCE";
    
    var res=await getresulttableBeam(Table_Type, Components,Parts);
    await getForcesalternative(res);
    await changethegraph();
    // await getForces(res);
    // await generatestringForce();
    // await changethegraph();
  }

  if(Stress.IS||Stress.CS){
    // dt={};
    Components = [
      "Elem",
      "Load",
      "Part",
      "Axial",
      "Shear-y",
      "Shear-z",
      "Bend(+y)",
      "Bend(-y)",
      "Bend(+z)",
      "Bend(-z)",
      "Cb(min/max)",
      "Cb1(-y+z)",
      "Cb2(+y+z)",
      "Cb3(+y-z)",
      "Cb4(-y-z)",
      ];

      Parts=[
        "Part I",
        "Part J"
       ];
    Table_Type = "BEAMSTRESS";
    
    var res=await getresulttableBeam(Table_Type, Components,Parts);
    await getStress(res);
    await changethegraph();
    // await getForces(res);
    // await generatestringForce();
    // await changethegraph();
  }
 
  setOpen(false);
  }

  async function changethegraph() {
   
 
    if (Displacement.D) {
     await creategraphfordisplacement();
    }

    if(Displacement.AD){
      await creategraphforAngulardisplacement();
    }

    if(Force.F){
      await creategraphforForceAlternative();
    }
    if(!Force.F){
      await  creategraphforMomentAlternative();
    }
    
    if(Stress.IS){
      await creategraphforStress();
    }
    if(Stress.CS){
      await creategraphforCombinedStress();
    }

    setData(dt);
    console.log(dt);
  }

  async function creategraphfordisplacement(){
    var dir = 0;
    if (Displacement.DX) {
      dir = 0;
    }
    else if (Displacement.DY) {
      dir = 1;
    }
    else if (Displacement.DZ) {
      dir = 2;
    }

    for (let z = 0; z < Noderesult[Nodeidcollection[0]].LComb.length; z++) {

      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {
    
        const elemdt = await getelem(element[i]);
        var factor = 1;
        var LC = Noderesult[Nodeidcollection[0]].LComb[z];
        tempjson.id = LC;
        var xcoord;
        if (graphmethod === "NodeNum") {
          xcoord =elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
        }
      //  tempjson.data[0].x = xcoord;
        // tempjson.data[0].y=await getdisplacementvalue(elemdt[i+1].NODE[0],dir,checkboxlist[z]);
        //tempjson.data[0].y = Noderesult[elemdt[i + 1].NODE[1]].D[LC][dir] * factor;
        tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[0]].D[LC][dir] * factor})
      
        if (graphmethod === "NodeNum") {
          xcoord =elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
        }
        // tempjson.data[1].x = xcoord;
        // tempjson.data[1].y = Noderesult[elemdt[i + 1].NODE[0]].D[LC][dir] * factor;
        tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[1]].D[LC][dir] * factor})
        // Nodeidcollection.push(elemdt[i + 1].NODE[1]);
        // Nodeidcollection.push(elemdt[i + 1].NODE[0]);
       

      }
      dt.push(tempjson);
    }
  }

 async function creategraphforAngulardisplacement(){
  var dir = 0;

  if (Displacement.RX) {
    dir = 0;
  }
  else if (Displacement.RY) {
    dir = 1;
  }
  else if (Displacement.RZ) {
    dir = 2;
  }

  for (let z = 0; z < Noderesult[Nodeidcollection[0]].LComb.length; z++) {

    const tempjson = {
      "id": "Lcomb",
      "color": "hsl(90, 70%, 50%)",
      "data": [
      ]
    }

    for (let i = 0; i < element.length; i++) {
  
      const elemdt = await getelem(element[i]);
      var factor = 1;
      var LC = Noderesult[Nodeidcollection[0]].LComb[z];
      tempjson.id = LC;
      var xcoord;
      if (graphmethod === "NodeNum") {
        xcoord =elemdt[element[i]].NODE[1];
      }
      else {
        xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
      }
    //  tempjson.data[0].x = xcoord;
      // tempjson.data[0].y=await getdisplacementvalue(elemdt[i+1].NODE[0],dir,checkboxlist[z]);
      //tempjson.data[0].y = Noderesult[elemdt[i + 1].NODE[1]].D[LC][dir] * factor;
      tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[1]].R[LC][dir] * factor})
    
      if (graphmethod === "NodeNum") {
        xcoord =elemdt[element[i]].NODE[0];
      }
      else {
        xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
      }
      // tempjson.data[1].x = xcoord;
      // tempjson.data[1].y = Noderesult[elemdt[i + 1].NODE[0]].D[LC][dir] * factor;
      tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[0]].R[LC][dir] * factor})
      // Nodeidcollection.push(elemdt[i + 1].NODE[1]);
      // Nodeidcollection.push(elemdt[i + 1].NODE[0]);
    }
    dt.push(tempjson);
  }
 }

 async function creategraphforForce(){
  var dir = 0;

  if (Force.FX) {
    dir = 0;
  }
  else if (Force.FY) {
    dir = 1;
  }
  else if (Force.FZ) {
    dir = 2;
  }

  for (let z = 0; z < Noderesult[Nodeidcollection[0]].LComb.length; z++) {

    const tempjson = {
      "id": "Lcomb",
      "color": "hsl(90, 70%, 50%)",
      "data": [
      ]
    }

    for (let i = 0; i < element.length; i++) {
  
      const elemdt = await getelem(element[i]);
      var factor = 1;
      var LC = Noderesult[Nodeidcollection[0]].LComb[z];
      tempjson.id = LC;
      var xcoord;
      if (graphmethod === "NodeNum") {
        xcoord =elemdt[element[i]].NODE[1];
      }
      else {
        xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
      }

      tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[1]].F[LC][dir] * factor})
    
      if (graphmethod === "NodeNum") {
        xcoord =elemdt[element[i]].NODE[0];
      }
      else {
        xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
      }

      tempjson.data.push({'x':xcoord ,'y':Noderesult[elemdt[element[i]].NODE[0]].F[LC][dir] * factor})

    }
    dt.push(tempjson);
  }
 }

  async function creategraphforForceAlternative() {
    var dir = 0;

    if (Force.FX) {
      dir = 0;
    }
    else if (Force.FY) {
      dir = 1;
    }
    else if (Force.FZ) {
      dir = 2;
    }
  
    const uniqueNames = Array.from(new Set(forceusedLC));
    forceusedLC = uniqueNames;

    for(let t=0;t<forceusedLC.length;t++){
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        const elemdt = await getelem(element[i]);
        var factor = 1;
        var LC = forceusedLC[t];
        var ForceValue= Forcevalues[forceusedLC[t]];
        tempjson.id = LC;
        var xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
        }
  
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['F'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['F'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphforMomentAlternative() {
    var dir = 0;

    if (Force.Mx) {
      dir = 0;
    }
    else if (Force.My) {
      dir = 1;
    }
    else if (Force.Mz) {
      dir = 2;
    }
  
    const uniqueNames = Array.from(new Set(forceusedLC));
    forceusedLC = uniqueNames;

    for(let t=0;t<forceusedLC.length;t++){
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        const elemdt = await getelem(element[i]);
        var factor = 1;
        var LC = forceusedLC[t];
        var ForceValue= Forcevalues[forceusedLC[t]];
        tempjson.id = LC;
        var xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
        }
  
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['M'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['M'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphforStress() {
    var dir = 0;
    var dir1=0;
    var dir2=0;
    if (Stress.Sax) {
      dir = 0;
    }
    else if (Stress.Ssy) {
      dir = 1;
    }
    else if (Stress.Ssz) {
      dir = 2;
    }
    else if (Stress.Sby) {
      dir = 3; dir2=4;
    }
    else if(Stress.Sbz){
      dir = 5; dir2=6;
    }
  
    const uniqueNames = Array.from(new Set(StressusedLC));
    StressusedLC = uniqueNames;

    await creategraphStresswithdir(dir); 
    if(dir2!==0){
      await creategraphStresswithdir(dir2);
    }
  }

  async function creategraphforCombinedStress() {
    var dir = 0;
    var dir1=0;
    var dir2=0;
    if (Stress.Maximum) {
      dir = 0;
    }
    else if (Stress.C1) {
      dir = 1;
    }
    else if (Stress.C2) {
      dir = 2;
    }
    else if (Stress.C3) {
      dir = 3;
    }
    else if(Stress.C4){
      dir = 4;
    }
  
    const uniqueNames = Array.from(new Set(StressusedLC));
    StressusedLC = uniqueNames;

    await creategraphCombinedStresswithdir(dir); 
  }

  async function creategraphStresswithdir(dir){
    for(let t=0;t<StressusedLC.length;t++){
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        const elemdt = await getelem(element[i]);
        var factor = 1;
        var LC=StressusedLC[t];
        if(dir===4){
        LC = StressusedLC[t] + "-y";
        }
        else if(dir===6){
        LC = StressusedLC[t] + "-z";
        }
        var ForceValue= Stressvalues[StressusedLC[t]];
        tempjson.id = LC;
        var xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
        }
  
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['ST'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['ST'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphCombinedStresswithdir(dir){
    for(let t=0;t<StressusedLC.length;t++){
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        const elemdt = await getelem(element[i]);
        var factor = 1;
        var LC=StressusedLC[t];
     
        var ForceValue= Stressvalues[StressusedLC[t]];
        tempjson.id = LC;
        var xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[0]);
        }
  
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['CS'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = await getnodexcoord(elemdt[element[i]].NODE[1]);
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['CS'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }



  async function generatestringDisplacement() {
    var nodeid;
    var dinc = 0;
    var Lcomb = [];
    var Disp;
    var D_rot;


    //nodeid=(z+1).toString;
    for (let t = 0; t < Nodeidcollection.length; t++) {
      var Disp_Value = {
        'NodeID': 0,
        'LComb': [],
        'D': {},
        'R': {},
      };
      Disp_Value.NodeID = Nodeidcollection[t];
      Noderesult[Nodeidcollection[t]] = Disp_Value;
    }

    for (let t = 0; t < Nodeidcollection.length; t++) {
      for (let z = t; z < displacementvalues.length; z = z + Nodeidcollection.length) {
        Noderesult[Nodeidcollection[t]].LComb.push(displacementvalues[z].LComb);
        Noderesult[Nodeidcollection[t]].D[displacementvalues[z].LComb] = displacementvalues[z].D;
        Noderesult[Nodeidcollection[t]].R[displacementvalues[z].LComb] = displacementvalues[z].R;

      }
    }

    console.log(Noderesult);


    var Ndid;
    var Lcom;
    var Disp;
    var Rot;
    var diststr = "{";
    for (let i = 0; i < Nodeidcollection.length; i++) {
      var tempdisplacementstring = [];
      Ndid = "";
      Ndid = "Nodeid: " + String(Noderesult[Nodeidcollection[i]].NodeID);
      tempdisplacementstring.push(Ndid);
      for (let j = 0; j < Noderesult[Nodeidcollection[i]].LComb.length; j++) {
        Lcom = "";
        var LC = Noderesult[Nodeidcollection[i]].LComb[j];
        Lcom = "LCOM: " + String(Noderesult[Nodeidcollection[i]].LComb[j]);
        tempdisplacementstring.push(Lcom);
        //for (let k = 0; k < Noderesult[i].D.length; k++) {
        if (Displacement.D) {
          Disp = "";
          Disp = "Disp:";
          if (Displacement.DX) {
            Disp = Disp + " DX=" + Noderesult[Nodeidcollection[i]].D[LC][0];
          }
          if (Displacement.DY) {
            Disp = Disp + " DY=" + Noderesult[Nodeidcollection[i]].D[LC][1];
          }
          if (Displacement.DZ) {
            Disp = Disp + " DZ=" + Noderesult[Nodeidcollection[i]].D[LC][2];
          }
          tempdisplacementstring.push(Disp);
        }
        if (Displacement.AD) {
          Rot = "";
          Rot = "Rot: ";
          if (Displacement.RX) {
            Rot = Rot + " RX=" + Noderesult[Nodeidcollection[i]].R[LC][0];
          }
          if (Displacement.RY) {
            Rot = Rot + " RY=" + Noderesult[Nodeidcollection[i]].R[LC][1];
          }
          if (Displacement.RZ) {
            Rot = Rot + " RZ=" + Noderesult[Nodeidcollection[i]].R[LC][2];
          }
          tempdisplacementstring.push(Rot);
        }
        //}
      }
      var xcoord;
      if (graphmethod === "NodeNum") {
        xcoord = Noderesult[Nodeidcollection[i]].NodeID;
      }
      else {
        xcoord = await getnodexcoord(Noderesult[Nodeidcollection[i]].NodeID);
      }
      diststr = diststr + `"${xcoord}": "${tempdisplacementstring}"`;
      if (i < (Nodeidcollection.length - 1)) {
        diststr = diststr + ",";
      }
      //displacementstring.push(`{"${xcoord}": "${tempdisplacementstring}"}`);

    }
    diststr = diststr + "}";

    obj = JSON.parse(diststr);
    setAnnotation(obj);


    console.log(obj);
  }


  async function generatestringForce() {
    var nodeid;
    var dinc = 0;
    var Lcomb = [];
    var Disp;
    var D_rot;


    //nodeid=(z+1).toString;
    for (let t = 0; t < Nodeidcollection.length; t++) {
      var Disp_Value = {
        'NodeID': 0,
        'LComb': [],
        'F': {},
        'M': {},
      };
      Disp_Value.NodeID = Nodeidcollection[t];
      Noderesult[Nodeidcollection[t]] = Disp_Value;
    }

    for (let t = 0; t < Nodeidcollection.length; t++) {
      for (let z = t; z < Forcevalues.length; z = z + Nodeidcollection.length) {
        Noderesult[Nodeidcollection[t]].LComb.push(Forcevalues[z].LComb);
        Noderesult[Nodeidcollection[t]].F[Forcevalues[z].LComb] = Forcevalues[z].F;
        Noderesult[Nodeidcollection[t]].M[Forcevalues[z].LComb] = Forcevalues[z].M;
        // Noderesult[Nodeidcollection[t]].D.push(displacementvalues[z].D);
        //Noderesult[Nodeidcollection[t]].R.push(displacementvalues[z].R);
      }
    }

    console.log(Noderesult);


    var Ndid;
    var Lcom;
    var Disp;
    var Rot;
    var diststr = "{";
    for (let i = 0; i < Nodeidcollection.length; i++) {
      var tempdisplacementstring = [];
      Ndid = "";
      Ndid = "Nodeid: " + String(Noderesult[Nodeidcollection[i]].NodeID);
      tempdisplacementstring.push(Ndid);
      for (let j = 0; j < Noderesult[Nodeidcollection[i]].LComb.length; j++) {
        Lcom = "";
        var LC = Noderesult[Nodeidcollection[i]].LComb[j];
        Lcom = "LCOM: " + String(Noderesult[Nodeidcollection[i]].LComb[j]);
        tempdisplacementstring.push(Lcom);
        //for (let k = 0; k < Noderesult[i].D.length; k++) {
        if (Force.F) {
          Disp = "";
          Disp = "Disp:";
          if (Force.FX) {
            Disp = Disp + " FX=" + Noderesult[Nodeidcollection[i]].F[LC][0];
          }
          if (Force.FY) {
            Disp = Disp + " FY=" + Noderesult[Nodeidcollection[i]].F[LC][1];
          }
          if (Force.FZ) {
            Disp = Disp + " FZ=" + Noderesult[Nodeidcollection[i]].F[LC][2];
          }
          tempdisplacementstring.push(Disp);
        }
        if (Force.M) {
          Rot = "";
          Rot = "Rot: ";
          if (Force.Mx) {
            Rot = Rot + " RX=" + Noderesult[Nodeidcollection[i]].R[LC][0];
          }
          if (Force.My) {
            Rot = Rot + " RY=" + Noderesult[Nodeidcollection[i]].R[LC][1];
          }
          if (Force.Mz) {
            Rot = Rot + " RZ=" + Noderesult[Nodeidcollection[i]].R[LC][2];
          }
          tempdisplacementstring.push(Rot);
        }
        //}
      }
      var xcoord;
      if (graphmethod === "NodeNum") {
        xcoord = Noderesult[Nodeidcollection[i]].NodeID;
      }
      else {
        xcoord = await getnodexcoord(Noderesult[Nodeidcollection[i]].NodeID);
      }
      diststr = diststr + `"${xcoord}": "${tempdisplacementstring}"`;
      if (i < (Nodeidcollection.length - 1)) {
        diststr = diststr + ",";
      }
      //displacementstring.push(`{"${xcoord}": "${tempdisplacementstring}"}`);

    }
    diststr = diststr + "}";

    obj = JSON.parse(diststr);
    setAnnotation(obj);
    console.log(obj);
  }


  async function getresulttable(Table_Type, Components) {
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
            "KEYS": Nodeidcollection
          },
          "LOAD_CASE_NAMES": checkboxlist2,
          "COMPONENTS": Components
        }
      }

      ))

    });

    var res = await response.json();

    return res;

  }

  async function getresulttableBeam(Table_Type, Components,Parts) {
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
            "KEYS": Nodeidcollection
          },
          "LOAD_CASE_NAMES": checkboxlist2,
          "PARTS":Parts,
          "COMPONENTS": Components
        }
      }

      ))

    });

    var res = await response.json();

    return res;

  }

  async function getdisplacement(res){
    var N = Nodeidcollection.length * checkboxlist2.length;
    for (let k = 0; k < N; k++) {
      var Disp_Value = {
        'NodeID': 0,
        'LComb': 0,
        'D': [],
        'R': [],
      };
      //var Disp_Value=Arraycomponent;

      Disp_Value.NodeID = res.example.DATA[k][1];
      Disp_Value.LComb = res.example.DATA[k][2];
      Disp_Value.D = [res.example.DATA[k][3], res.example.DATA[k][4], res.example.DATA[k][5]];
      Disp_Value.R = [res.example.DATA[k][6], res.example.DATA[k][7], res.example.DATA[k][8]];
      displacementvalues.push(Disp_Value);
    }
  }

  async function getForces(res){
    var N = Nodeidcollection.length * checkboxlist2.length;

    var supportnode=[];
    
    for(let i=0;i<res.example.DATA.length;i++){
      supportnode.push(res.example.DATA[i][1]);
    }
  

    var z=0; 
    for(var k=0;k<checkboxlist2.length;k++){
   
    for(var i=0;i<Nodeidcollection.length;i++){
      var Disp_Value = {
        'NodeID': 0,
        'LComb': 0,
        'F': [],
        'M': [],
      };

      if(supportnode.includes(String(Nodeidcollection[i]))===false){
        Disp_Value.NodeID = Nodeidcollection[i];
        Disp_Value.LComb = checkboxlist2[k].replace("(CBC)","");
        Disp_Value.F = [0, 0, 0];
        Disp_Value.M = [0, 0, 0];
        Forcevalues.push(Disp_Value);
        
      }
      else{
        Disp_Value.NodeID = res.example.DATA[z][1];
        Disp_Value.LComb = checkboxlist2[k].replace("(CBC)","");
        Disp_Value.F = [res.example.DATA[z][3], res.example.DATA[z][4], res.example.DATA[z][5]];
        Disp_Value.M = [res.example.DATA[z][6], res.example.DATA[z][7], res.example.DATA[z][7]];
        Forcevalues.push(Disp_Value);
        z=z+1;
      }

    }
  }
  }

  async function getForcesalternative(res) {


    for(let k=0;k<res['example'].DATA.length;k++){
      Forcevalues[res['example'].DATA[k][2]]={};
    }


    //var j=0;
    var k = 0;

    while (k < res['example'].DATA.length - 1) {
      var Disp_Value = {
        'ElementID': 0,
        'LComb': 0,
        "Part": { 'I': { 'F': [], 'M': [] }, 'J': { 'F': [], 'M': [] } },
        // 'F': [],
        // 'M': [],
      };

      Disp_Value.ElementID = res['example'].DATA[k][1];


      //for(let i=0;i<res['example'].data.length;i++){

      Disp_Value.LComb = res['example'].DATA[k][2];
      Disp_Value.Part["I"]["F"] = [res['example'].DATA[k][4], res['example'].DATA[k][5], res['example'].DATA[k][6]];
      Disp_Value.Part["I"]["M"] = [res['example'].DATA[k][7], res['example'].DATA[k][8], res['example'].DATA[k][9]];
      Disp_Value.Part["J"]["F"] = [res['example'].DATA[k + 1][4], res['example'].DATA[k + 1][5], res['example'].DATA[k + 1][6]];
      Disp_Value.Part["J"]["M"] = [res['example'].DATA[k + 1][7], res['example'].DATA[k + 1][8], res['example'].DATA[k + 1][9]];

      forceusedLC.push(Disp_Value.LComb);
     
      //}
      Forcevalues[Disp_Value.LComb][Disp_Value.ElementID] = Disp_Value;
      k = k + 2;
    }
    console.log(Forcevalues);
  }


  async function getStress(res) {
    for(let k=0;k<res['example'].DATA.length;k++){
      Stressvalues[res['example'].DATA[k][2]]={};
    }


    //var j=0;
    var k = 0;

    while (k < res['example'].DATA.length - 1) {
      var Disp_Value = {
        'ElementID': 0,
        'LComb': 0,
        "Part": { 'I': { 'ST': [], 'CS': [] }, 'J': { 'ST': [], 'CS': []} },
        // 'F': [],
        // 'M': [],
      };

      Disp_Value.ElementID = res['example'].DATA[k][1];


      //for(let i=0;i<res['example'].data.length;i++){

      Disp_Value.LComb = res['example'].DATA[k][2];
      for(let l=4 ;l<=10;l++){
        Disp_Value.Part["I"]["ST"].push(res['example'].DATA[k][l])
      }
      for(let l=11 ;l<=15;l++){
        Disp_Value.Part["I"]["CS"].push(res['example'].DATA[k][l])
      }
      for(let l=4 ;l<=10;l++){
        Disp_Value.Part["J"]["ST"].push(res['example'].DATA[k+1][l])
      }
      for(let l=11 ;l<=15;l++){
        Disp_Value.Part["J"]["CS"].push(res['example'].DATA[k+1][l])
      }
     
      StressusedLC.push(Disp_Value.LComb);
  
      Stressvalues[Disp_Value.LComb][Disp_Value.ElementID] = Disp_Value;
      k = k + 2;
    }
    console.log(Stressvalues);
  }

  async function Extractelement(st) {
    element = [];
    const spacesplitter = st.split(" ");
    for (let i = 0; i < spacesplitter.length; i++) {
      const tosplitter = spacesplitter[i].split("to");
      const startelem = parseInt(tosplitter[0]);
      const endelem = parseInt(tosplitter[1]);
      if(tosplitter.length>1){
      for (let j = startelem; j <= endelem; j++) {
        element.push(j);
      }
    }
    else{
      element.push(startelem);
    }
    }
    const uniqueNames = Array.from(new Set(element));
    element = uniqueNames;
    return element;
  }

  async function getdata() {
    var methodid = true;
    Units.Length = document.getElementById('Id_Length').innerHTML;
    Units.Force = document.getElementById('Id_Force').innerHTML;
    tabD = document.getElementById('simple-tab-0').tabIndex;
    tabF = document.getElementById('simple-tab-1').tabIndex;
    tabS = document.getElementById('simple-tab-2').tabIndex;
    elementstring = document.getElementById('Id_Elemstring').value;
    methodid = document.getElementById('Id_Nodenum').checked;
    setGMData("Node")
    if (methodid === false) {
      graphmethod = "NodeCCoord";
      setGMData("Node x Coordinate")
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
        Displacement.AD = true;
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
        Force.M=true
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
        Stress.CS=true;
        Stress.Maximum = document.getElementById('Id_Max').checked;
        Stress.C1 = document.getElementById('Id_C1').checked;
        Stress.C2 = document.getElementById('Id_C2').checked;
        Stress.C3 = document.getElementById('Id_C3').checked;
        Stress.C4 = document.getElementById('Id_C4').checked;
      }
    }
  }

  async function showchart() {
    const tempjson = {
      "id": "BeamS",
      "color": "hsl(90, 70%, 50%)",
      "data": []
    }
    if (graphmethod === "NodeNum") {
  
      for (let i = 0; i < element.length; i++) {
        const elemdt = await getelem(element[i]);
        tempjson.data.push({'x': elemdt[element[i]].NODE[0],'y':0});
        tempjson.data.push({'x': elemdt[element[i]].NODE[1],'y':0}); 
        Nodeidcollection.push(elemdt[element[i]].NODE[0]);
        Nodeidcollection.push(elemdt[element[i]].NODE[1]);
      }
      dt.push(tempjson);
    }
    else {
      for (let i = 0; i < element.length; i++) {
        const elemdt = await getelem(element[i]);
        tempjson.data.push({'x': await getnodexcoord(elemdt[element[i]].NODE[0]),'y':0});
        tempjson.data.push({'x': await getnodexcoord(elemdt[element[i]].NODE[1]),'y':0});
        Nodeidcollection.push(elemdt[element[i]].NODE[0]);
        Nodeidcollection.push(elemdt[element[i]].NODE[1]);
      
      }
      dt.push(tempjson);
    }
  }

  async function getelem(id) {
    const res = await fetch(`https://api-beta.midasit.com:443/civil/db/elem/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "MAPI-Key": window.MAPI_Key
      }
    })
    if (res.ok) {
      const data = (await res.json())["ELEM"];
      return data;
    }
    else {
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
    if (res.ok) {
      const data = (await res.json())["NODE"];
      return data[id].X;
    }
    else {
      return "";
    }
  }


  return (
    <React.Fragment>
      <Header />
      <BoxComp>
        <Stack direction={"row"}>
          <Box sx={{ ml: 1, mt: 2, mr: 1, mb: 2, width: '45vw', height: '40vh', display: "flex", justifyContent: "center", flexDirection: "column", flexWrap: "wrap" }}>
            <DataChart data={data} AnnotationDefaultData={Annotation} GM={GM} />
            <Divider sx={{ my: 3 }} />
            <DiagramOpt />
          </Box>
          <Box sx={{ p: 5, mt: 2, ml: 1, mr: 1, mb: 2, width: window.innerWidth * 0.25, background: "#FFFFFF" }}>
            <Units />
            <Divider sx={{ p: 1 }} />
            <ElemOrNodeNum />
            <Divider sx={{ p: 1 }} />
            <OptionTabs />
          </Box>
          <Box sx={{ mt: 2, mb: 2, ml: 1, width: '20vw', background: "#FFFFFF" }}>
            <LoadCaseCombinationList width={window.innerWidth * 0.2} />
          </Box>
        </Stack>
      </BoxComp>

      <Box>
        <Button onClick={Storethedata} sx={{ ml: "10vw", marginTop: 3 }} variant='contained'> Refresh window</Button>
        <Button onClick={Updatethechart} sx={{ ml: 2, marginTop: 3 }} variant='contained'> Draw Graph</Button>
        <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        />
      </Box>
    </React.Fragment>
  )
}