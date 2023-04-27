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

  // The code below doesn't work.
  // While drawing on the chart, if I click outside the dialog, an error message appears about "handleClose".
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box width="50vw" height='25' backgroundColor="skyblue">
        <DialogTitle width="25vw" align='center'>Processing!</DialogTitle>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired, // There is no props value about "onClose".
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired, // There is no props value about "selectedValue".
};

//
let elemdt = [];
let nodedt = [];
const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'civil';
window.baseUrl = baseUrl;
let NodeDataCollection = {};
let supportNodeColleection = [];
let obj;
let Nodeidcollection = [];
let NodestringResult = [];
let Noderesult = {};
let displacementstring = [];
let displacementvalues = [];
let Forcevalues = {};
let forceusedLC = [];
let Stressvalues = {};
let StressusedLC = [];
let element = [];
let elementstring;
let graphmethod = "NodeNum";
let MAPI_Key = "eyJ1ciI6ImtqYjA5MTMiLCJwZyI6ImNpdmlsIiwiY24iOiJKa21ENV9kWFJBIn0.4f6bec4d8dd4c9d2c7c0cc1947bcebb5f0faa6b5cb88e3140a56c194c3762e74";
window.MAPI_Key = MAPI_Key;
let dt = [];
let tabD = false;
let tabF = false;
let tabS = false;
let MUnit = {
  'Length': 'm',
  'Force': 'KN'
};
let Displacement = {
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

let Force = {
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

let checkboxlist2 = [];
let Stress = {
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
  const [val,setvalue]=React.useState(true);
  const [Tabvalue, setTabValue] = React.useState('Displacement');
  const [open, setOpen] = React.useState(false);
  const [Checkboxitems, Setcheckbox] = React.useState([]);
  // const [selectedValue, setSelectedValue] = React.useState();
  const [v_displacement, SetDisplacement] = React.useState([false, false, false]);
  const [v_force, SetForce] = React.useState([false, false, false, false]);
  const [v_moment, SetMoment] = React.useState([false, false, false, false]);
  const [v_individualstress, SetIS] = React.useState([false, false, false, false, false]);
  const [v_cstress, SetCS] = React.useState([false, false, false, false, false]);
  const [v_angulardisplacement, SetADisplacement] = React.useState([false, false, false]);
  const [v_radiovalue,setRadioValue] =React.useState(['Displacement','Force','Individual Stress']);

  const [elemval,setelemvalue]=React.useState("1to6");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [GM, setGMData] = React.useState("Node_Number");
  const [data, setData] = React.useState([]);
  const [Annotation, setAnnotation] = React.useState([]);
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
    width:"100%",
    height: windowSize.height*0.56,
    border: 1,
    backgroundColor: "#F5F4FF",
    display: "flex",
    justifyContent: "center",
  })


  function Storethedata() {
    setData([]);
    dt=[];
    graphmethod = "NodeNum";
    checkboxlist2=[];
    SetDisplacement([false,false,false]);
    SetADisplacement([false,false,false]);
    SetForce([false,false,false,false,false]);
    SetMoment([false,false,false,false,false]);
    SetIS([false,false,false,false,false]);
    SetCS([false,false,false,false,false]);
    setvalue(true);
    setRadioValue(['Displacement','Force','Individual Stress']);
    setGMData("Node_Number");
  }

  async function reinitialise() {
    setData([]);
    graphmethod = "NodeNum";
    dt=[];
    setvalue(true);
    setGMData("Node_Number");
    checkboxlist2=[];
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
    Displacement = {
      'D': false,
      'DX': false,
      'DY': false,
      'DZ': false,
      'AD': false,
      'RX': false,
      'RY': false,
      'RZ': false
    };
    Force = {
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
    Stress = {
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

  }


  const handleClick = event => {
    reinitialise();
    Updatethechart(event);

  };

  async function Updatethechart(event) {

    setOpen(true);
    
    let Components;
    let Table_Type;
    let i = 0;
    while (i < checkboxlist.length) {
      if (checkboxlist[i] !== undefined) {
        checkboxlist2.push(checkboxlist[i]);
      }
      i++;
    }
    // Setcheckbox(checkboxlist2);
    // checkboxlist=checkboxlist2;
    await getdata();
    event.preventDefault();
    elemdt = await getelem();
    nodedt = await getnodes();
    await showchart();
    event.preventDefault();
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
      let Arrcomp_Value = {
        'NodeID': 0,
        'LComb': 0,
        'D': [],
        'R': [],
      };
      event.preventDefault();
      let res = await getresulttable(Table_Type, Components);
      await getdisplacement(res);
      await generatestringDisplacement();
      await changethegraph();

    }

    let Parts;
    if (Force.F || Force.M) {
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

      Parts = [
        "Part I",
        "Part J"
      ];
      Table_Type = "BEAMFORCE";

      let res = await getresulttableBeam(Table_Type, Components, Parts);
      await getForcesalternative(res);
      await changethegraph();
      // await getForces(res);
      // await generatestringForce();
      // await changethegraph();
    }

    if (Stress.IS || Stress.CS) {
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

      Parts = [
        "Part I",
        "Part J"
      ];
      Table_Type = "BEAMSTRESS";

      let res = await getresulttableBeam(Table_Type, Components, Parts);
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

    if (Displacement.AD) {
      await creategraphforAngulardisplacement();
    }

    if (Force.F) {
      await creategraphforForceAlternative();
    }
    if (!Force.F) {
      await creategraphforMomentAlternative();
    }

    if (Stress.IS) {
      await creategraphforStress();
    }
    if (Stress.CS) {
      await creategraphforCombinedStress();
    }

    setData(dt);
    console.log(dt);
  }

  async function creategraphfordisplacement() {
    let dir = 0;
    if (Displacement.DX) {
      dir = 0;
      SetDisplacement([true,false,false]);
      SetADisplacement([false,false,false]);
    }
    else if (Displacement.DY) {
      dir = 1;
      SetDisplacement([false,true,false]);
      SetADisplacement([false,false,false]);
    }
    else if (Displacement.DZ) {
      dir = 2;
      SetDisplacement([false,false,true]);
      SetADisplacement([false,false,false]);
    }

    for (let z = 0; z < Noderesult[Nodeidcollection[0]].LComb.length; z++) {

      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        //const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = Noderesult[Nodeidcollection[0]].LComb[z];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }
        //  tempjson.data[0].x = xcoord;
        // tempjson.data[0].y=await getdisplacementvalue(elemdt[i+1].NODE[0],dir,checkboxlist[z]);
        //tempjson.data[0].y = Noderesult[elemdt[i + 1].NODE[1]].D[LC][dir] * factor;
        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[0]].D[LC][dir] * factor })

        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        // tempjson.data[1].x = xcoord;
        // tempjson.data[1].y = Noderesult[elemdt[i + 1].NODE[0]].D[LC][dir] * factor;
        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[1]].D[LC][dir] * factor })
        // Nodeidcollection.push(elemdt[i + 1].NODE[1]);
        // Nodeidcollection.push(elemdt[i + 1].NODE[0]);


      }
      dt.push(tempjson);
    }
  }

  async function creategraphforAngulardisplacement() {
    let dir = 0;

    if (Displacement.RX) {
      dir = 0;
      SetADisplacement([true,false,false]);
      SetDisplacement([false,false,false]);
    }
    else if (Displacement.RY) {
      dir = 1;
      SetADisplacement([false,true,false]);
      SetDisplacement([false,false,false]);
    }
    else if (Displacement.RZ) {
      dir = 2;
      SetADisplacement([false,false,true]);
      SetDisplacement([false,false,false]);
    }

    for (let z = 0; z < Noderesult[Nodeidcollection[0]].LComb.length; z++) {

      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        // const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = Noderesult[Nodeidcollection[0]].LComb[z];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        //  tempjson.data[0].x = xcoord;
        // tempjson.data[0].y=await getdisplacementvalue(elemdt[i+1].NODE[0],dir,checkboxlist[z]);
        //tempjson.data[0].y = Noderesult[elemdt[i + 1].NODE[1]].D[LC][dir] * factor;
        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[1]].R[LC][dir] * factor })

        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }
        // tempjson.data[1].x = xcoord;
        // tempjson.data[1].y = Noderesult[elemdt[i + 1].NODE[0]].D[LC][dir] * factor;
        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[0]].R[LC][dir] * factor })
        // Nodeidcollection.push(elemdt[i + 1].NODE[1]);
        // Nodeidcollection.push(elemdt[i + 1].NODE[0]);
      }
      dt.push(tempjson);
    }
  }

  async function creategraphforForce() {
    let dir = 0;

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

        // const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = Noderesult[Nodeidcollection[0]].LComb[z];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[1]].F[LC][dir] * factor })

        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': Noderesult[elemdt[element[i]].NODE[0]].F[LC][dir] * factor })

      }
      dt.push(tempjson);
    }
  }

  async function creategraphforForceAlternative() {
    let dir = 0;

    if (Force.FX) {
      dir = 0;
      SetForce([true,false,false,false]);
      SetMoment([false,false,false,false]);
    }
    else if (Force.FY) {
      dir = 1;
      SetForce([false,true,false,false]);
      SetMoment([false,false,false,false]);
    }
    else if (Force.FZ) {
      dir = 2;
      SetForce([false,false,true,false]);
      SetMoment([false,false,false,false]);
    }

    const uniqueNames = Array.from(new Set(forceusedLC));
    forceusedLC = uniqueNames;

    for (let t = 0; t < forceusedLC.length; t++) {
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        // const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = forceusedLC[t];
        let ForceValue = Forcevalues[forceusedLC[t]];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['F'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['F'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphforMomentAlternative() {
    let dir = 0;

    if (Force.Mx) {
      dir = 0;
      SetMoment([true,false,false,false]);
      SetForce([false,false,false,false]);
    }
    else if (Force.My) {
      dir = 1;
      SetMoment([false,true,false,false]);
      SetForce([false,false,false,false]);
    }
    else if (Force.Mz) {
      dir = 2;
      SetMoment([false,false,true,false]);
      SetForce([false,false,false,false]);
    }

    const uniqueNames = Array.from(new Set(forceusedLC));
    forceusedLC = uniqueNames;

    for (let t = 0; t < forceusedLC.length; t++) {
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        //  const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = forceusedLC[t];
        let ForceValue = Forcevalues[forceusedLC[t]];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['M'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['M'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphforStress() {
    let dir = 0;
    let dir1 = 0;
    let dir2 = 0;
    if (Stress.Sax) {
      dir = 0;
      SetIS([true,false,false,false,false]);
      SetCS([false,false,false,false,false]);
    }
    else if (Stress.Ssy) {
      dir = 1;
      SetIS([false,true,false,false,false]);
      SetCS([false,false,false,false,false]);
    }
    else if (Stress.Ssz) {
      dir = 2;
      SetIS([false,false,true,false,false]);
      SetCS([false,false,false,false,false]);
    }
    else if (Stress.Sby) {
      dir = 3; dir2 = 4;
      SetIS([false,false,false,true,false]);
      SetCS([false,false,false,false,false]);
    }
    else if (Stress.Sbz) {
      dir = 5; dir2 = 6;
      SetIS([false,false,false,false,true]);
      SetCS([false,false,false,false,false]);
    }

    const uniqueNames = Array.from(new Set(StressusedLC));
    StressusedLC = uniqueNames;

    await creategraphStresswithdir(dir);
    if (dir2 !== 0) {
      await creategraphStresswithdir(dir2);
    }
  }

  async function creategraphforCombinedStress() {
    let dir = 0;
    let dir1 = 0;
    let dir2 = 0;
    if (Stress.Maximum) {
      dir = 0;
      SetCS([true,false,false,false,false]);
      SetIS([false,false,false,false,false]);
    }
    else if (Stress.C1) {
      dir = 1;
      SetCS([false,true,false,false,false]);
      SetIS([false,false,false,false,false]);
    }
    else if (Stress.C2) {
      dir = 2;
      SetCS([false,false,true,false,false]);
      SetIS([false,false,false,false,false]);
    }
    else if (Stress.C3) {
      dir = 3;
      SetCS([false,false,false,true,false]);
      SetIS([false,false,false,false,false]);
    }
    else if (Stress.C4) {
      dir = 4;
      SetCS([false,false,false,false,true]);
      SetIS([false,false,false,false,false]);
    }

    const uniqueNames = Array.from(new Set(StressusedLC));
    StressusedLC = uniqueNames;

    await creategraphCombinedStresswithdir(dir);
  }

  async function creategraphStresswithdir(dir) {
    for (let t = 0; t < StressusedLC.length; t++) {
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        //   const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = StressusedLC[t];
        if (dir === 4) {
          LC = StressusedLC[t] + "-y";
        }
        else if (dir === 6) {
          LC = StressusedLC[t] + "-z";
        }
        let ForceValue = Stressvalues[StressusedLC[t]];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['ST'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['ST'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }

  async function creategraphCombinedStresswithdir(dir) {
    for (let t = 0; t < StressusedLC.length; t++) {
      const tempjson = {
        "id": "Lcomb",
        "color": "hsl(90, 70%, 50%)",
        "data": [
        ]
      }

      for (let i = 0; i < element.length; i++) {

        //   const elemdt = await getelem(element[i]);
        let factor = 1;
        let LC = StressusedLC[t];

        let ForceValue = Stressvalues[StressusedLC[t]];
        tempjson.id = LC;
        let xcoord;
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[0];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[0]].X;
        }

        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['I']['CS'][dir] * factor });
        if (graphmethod === "NodeNum") {
          xcoord = elemdt[element[i]].NODE[1];
        }
        else {
          xcoord = nodedt[elemdt[element[i]].NODE[1]].X;
        }
        tempjson.data.push({ 'x': xcoord, 'y': ForceValue[element[i]].Part['J']['CS'][dir] * factor });
      }
      dt.push(tempjson);
    }
  }



  async function generatestringDisplacement() {
    let nodeid;
    let dinc = 0;
    let Lcomb = [];
    let Disp;
    let D_rot;


    //nodeid=(z+1).toString;
    for (let t = 0; t < Nodeidcollection.length; t++) {
      let Disp_Value = {
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


    let Ndid;
    let Lcom;

    let Rot;
    // let diststr = "{";
    // for (let i = 0; i < Nodeidcollection.length; i++) {
    //   let tempdisplacementstring = [];
    //   Ndid = "";
    //   Ndid = "Nodeid: " + String(Noderesult[Nodeidcollection[i]].NodeID);
    //   tempdisplacementstring.push(Ndid);
    //   for (let j = 0; j < Noderesult[Nodeidcollection[i]].LComb.length; j++) { 
    //     Lcom = "";
    //     let LC = Noderesult[Nodeidcollection[i]].LComb[j];
    //     Lcom = "LCOM: " + String(Noderesult[Nodeidcollection[i]].LComb[j]);
    //     tempdisplacementstring.push(Lcom);
    //     //for (let k = 0; k < Noderesult[i].D.length; k++) {
    //     if (Displacement.D) {
    //       Disp = "";
    //       Disp = "Disp:";
    //       if (Displacement.DX) {
    //         Disp = Disp + " DX=" + Noderesult[Nodeidcollection[i]].D[LC][0];
    //       }
    //       if (Displacement.DY) {
    //         Disp = Disp + " DY=" + Noderesult[Nodeidcollection[i]].D[LC][1];
    //       }
    //       if (Displacement.DZ) {
    //         Disp = Disp + " DZ=" + Noderesult[Nodeidcollection[i]].D[LC][2];
    //       }
    //       tempdisplacementstring.push(Disp);
    //     }
    //     if (Displacement.AD) {
    //       Rot = "";
    //       Rot = "Rot: ";
    //       if (Displacement.RX) {
    //         Rot = Rot + " RX=" + Noderesult[Nodeidcollection[i]].R[LC][0];
    //       }
    //       if (Displacement.RY) {
    //         Rot = Rot + " RY=" + Noderesult[Nodeidcollection[i]].R[LC][1];
    //       }
    //       if (Displacement.RZ) {
    //         Rot = Rot + " RZ=" + Noderesult[Nodeidcollection[i]].R[LC][2];
    //       }
    //       tempdisplacementstring.push(Rot);
    //     }
    //     //}
    //   }
    //   let xcoord;
    //   if (graphmethod === "NodeNum") {
    //     xcoord = Noderesult[Nodeidcollection[i]].NodeID;
    //   }
    //   else {
    //     xcoord = await getnodexcoord(Noderesult[Nodeidcollection[i]].NodeID);
    //   }
    //   diststr = diststr + `"${xcoord}": "${tempdisplacementstring}"`;
    //   if (i < (Nodeidcollection.length - 1)) {
    //     diststr = diststr + ",";
    //   }
    //   //displacementstring.push(`{"${xcoord}": "${tempdisplacementstring}"}`);

    // }
    //diststr = diststr + "}";

    // obj = JSON.parse(diststr);
    // setAnnotation(obj);


    // console.log(obj);
  }

  async function getresulttable(Table_Type, Components) {
    const response = await fetch(`${baseUrl}/${programType}/post/table`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'MAPI-Key': window.MAPI_Key
      },
      body: JSON.stringify({
        "Argument": {
          "TABLE_NAME": "example",
          "TABLE_TYPE": Table_Type,
          "NODE_ELEMS": {
            "KEYS": Nodeidcollection
          },
          "LOAD_CASE_NAMES": checkboxlist2,
          "COMPONENTS": Components
        }
      })
    });

    let res = await response.json();
    return res;
  }

  async function getresulttableBeam(Table_Type, Components, Parts) {
    const response = await fetch(`${baseUrl}/${programType}/post/table`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'MAPI-Key': window.MAPI_Key
      },
      body: JSON.stringify({
        "Argument": {
          "TABLE_NAME": "example",
          "TABLE_TYPE": Table_Type,
          "NODE_ELEMS": {
            "KEYS": Nodeidcollection
          },
          "LOAD_CASE_NAMES": checkboxlist2,
          "PARTS": Parts,
          "COMPONENTS": Components
        }
      })
    });

    let res = await response.json();
    return res;
  }

  async function getdisplacement(res) {
    let N = Nodeidcollection.length * checkboxlist2.length;
    for (let k = 0; k < N; k++) {
      let Disp_Value = {
        'NodeID': 0,
        'LComb': 0,
        'D': [],
        'R': [],
      };
      //let Disp_Value=Arraycomponent;

      Disp_Value.NodeID = res.example.DATA[k][1];
      Disp_Value.LComb = res.example.DATA[k][2];
      Disp_Value.D = [res.example.DATA[k][3], res.example.DATA[k][4], res.example.DATA[k][5]];
      Disp_Value.R = [res.example.DATA[k][6], res.example.DATA[k][7], res.example.DATA[k][8]];
      displacementvalues.push(Disp_Value);
    }
  }

  async function getForces(res) {
    let N = Nodeidcollection.length * checkboxlist2.length;

    let supportnode = [];

    for (let i = 0; i < res.example.DATA.length; i++) {
      supportnode.push(res.example.DATA[i][1]);
    }

    let z = 0;
    for (let k = 0; k < checkboxlist2.length; k++) {

      for (let i = 0; i < Nodeidcollection.length; i++) {
        let Disp_Value = {
          'NodeID': 0,
          'LComb': 0,
          'F': [],
          'M': [],
        };

        if (supportnode.includes(String(Nodeidcollection[i])) === false) {
          Disp_Value.NodeID = Nodeidcollection[i];
          Disp_Value.LComb = checkboxlist2[k].replace("(CBC)", "");
          Disp_Value.F = [0, 0, 0];
          Disp_Value.M = [0, 0, 0];
          Forcevalues.push(Disp_Value);
        }
        else {
          Disp_Value.NodeID = res.example.DATA[z][1];
          Disp_Value.LComb = checkboxlist2[k].replace("(CBC)", "");
          Disp_Value.F = [res.example.DATA[z][3], res.example.DATA[z][4], res.example.DATA[z][5]];
          Disp_Value.M = [res.example.DATA[z][6], res.example.DATA[z][7], res.example.DATA[z][7]];
          Forcevalues.push(Disp_Value);
          z = z + 1;
        }
      }
    }
  }

  async function getForcesalternative(res) {
    for (let k = 0; k < res['example'].DATA.length; k++) {
      Forcevalues[res['example'].DATA[k][2]] = {};
    }

    //let j=0;
    let k = 0;

    while (k < res['example'].DATA.length - 1) {
      let Disp_Value = {
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
    for (let k = 0; k < res['example'].DATA.length; k++) {
      Stressvalues[res['example'].DATA[k][2]] = {};
    }

    //let j=0;
    let k = 0;

    while (k < res['example'].DATA.length - 1) {
      let Disp_Value = {
        'ElementID': 0,
        'LComb': 0,
        "Part": { 'I': { 'ST': [], 'CS': [] }, 'J': { 'ST': [], 'CS': [] } },
        // 'F': [],
        // 'M': [],
      };

      Disp_Value.ElementID = res['example'].DATA[k][1];


      //for(let i=0;i<res['example'].data.length;i++){

      Disp_Value.LComb = res['example'].DATA[k][2];
      for (let l = 4; l <= 10; l++) {
        Disp_Value.Part["I"]["ST"].push(res['example'].DATA[k][l])
      }
      for (let l = 11; l <= 15; l++) {
        Disp_Value.Part["I"]["CS"].push(res['example'].DATA[k][l])
      }
      for (let l = 4; l <= 10; l++) {
        Disp_Value.Part["J"]["ST"].push(res['example'].DATA[k + 1][l])
      }
      for (let l = 11; l <= 15; l++) {
        Disp_Value.Part["J"]["CS"].push(res['example'].DATA[k + 1][l])
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
      if (tosplitter.length > 1) {
        for (let j = startelem; j <= endelem; j++) {
          element.push(j);
        }
      }
      else {
        element.push(startelem);
      }
    }
    const uniqueNames = Array.from(new Set(element));
    element = uniqueNames;
    return element;
  }

  async function getdata() {
    Setcheckbox(checkboxlist2);
    let methodid = true;
    Units.Length = document.getElementById('Id_Length').innerHTML;
    Units.Force = document.getElementById('Id_Force').innerHTML;
    tabD = document.getElementById('simple-tab-0').tabIndex;
    tabF = document.getElementById('simple-tab-1').tabIndex;
    tabS = document.getElementById('simple-tab-2').tabIndex;
    elementstring = document.getElementById('Id_Elemstring').value;
    setelemvalue(String(elementstring));
    methodid = document.getElementById('Id_Nodenum').checked;
    setGMData("Node_Number");
    if (methodid === false) {
      graphmethod = "NodeCCoord";
      setvalue(false);
      setGMData("Node_X-Coordinations");
    }
    Extractelement(elementstring);
    if (tabD === 0 && tabF === -1 && tabS === -1) {
      setTabValue("Displacement");
      Displacement.D = document.getElementById('Id_D').checked;
      if (Displacement.D) {
        setRadioValue(["Displacement",v_radiovalue[1],v_radiovalue[2]]);
        Displacement.DX = document.getElementById('Id_DX').checked;
        Displacement.DY = document.getElementById('Id_DY').checked;
        Displacement.DZ = document.getElementById('Id_DZ').checked;
      }
      else {
        Displacement.AD = true;
        setRadioValue(["Angular displacement",v_radiovalue[1],v_radiovalue[2]]);
        Displacement.RX = document.getElementById('Id_RX').checked;
        Displacement.RY = document.getElementById('Id_RY').checked;
        Displacement.RZ = document.getElementById('Id_RZ').checked;
      }
    }

    else if (tabD === -1 && tabF === 0 && tabS === -1) {
      Force.F = document.getElementById('Id_F').checked;
      setTabValue("Force/Moment");
      if (Force.F) {
        setRadioValue([v_radiovalue[0],"Force",v_radiovalue[2]]);
        Force.FX = document.getElementById('Id_Fx').checked;
        Force.FY = document.getElementById('Id_Fy').checked;
        Force.FZ = document.getElementById('Id_Fz').checked;
        Force.Fyz = document.getElementById('Id_Fyz').checked;
      }
      else {
        setRadioValue([v_radiovalue[0],"Moment",v_radiovalue[2]]);
        Force.M = true
        Force.Mx = document.getElementById('Id_Mx').checked;
        Force.My = document.getElementById('Id_My').checked;
        Force.Mz = document.getElementById('Id_Mz').checked;
        Force.Myz = document.getElementById('Id_Myz').checked;
      }

    }
    else {
      setTabValue("Stress");
      Stress.IS = document.getElementById('Id_Is').checked;
      if (Stress.IS) {
        setRadioValue([v_radiovalue[0],v_radiovalue[1],"Individual Stress"]);
        Stress.Sax = document.getElementById('Id_Sax').checked;
        Stress.Ssy = document.getElementById('Id_Ssy').checked;
        Stress.Ssz = document.getElementById('Id_Ssz').checked;
        Stress.Sby = document.getElementById('Id_Sby').checked;
        Stress.Sbz = document.getElementById('Id_Sbz').checked;

      }
      else {
        Stress.CS = true;
        setRadioValue([v_radiovalue[0],v_radiovalue[1],"Combined Stress"]);
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

        tempjson.data.push({ 'x': elemdt[element[i]].NODE[0], 'y': 0 });
        tempjson.data.push({ 'x': elemdt[element[i]].NODE[1], 'y': 0 });
        Nodeidcollection.push(elemdt[element[i]].NODE[0]);
        Nodeidcollection.push(elemdt[element[i]].NODE[1]);
      }
      dt.push(tempjson);
    }
    else {
      for (let i = 0; i < element.length; i++) {
        //     const elemdt = getelem(element[i]);
        tempjson.data.push({ 'x': nodedt[elemdt[element[i]].NODE[0]].X, 'y': 0 });
        tempjson.data.push({ 'x': nodedt[elemdt[element[i]].NODE[1]].X, 'y': 0 });
        Nodeidcollection.push(elemdt[element[i]].NODE[0]);
        Nodeidcollection.push(elemdt[element[i]].NODE[1]);

      }
      dt.push(tempjson);
    }
  }

  async function getelem() {
    const res = await fetch(`https://api-beta.midasit.com:443/civil/db/elem/`, {
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

  async function getnodes() {
    const res = await fetch(`https://api-beta.midasit.com:443/civil/db/node/`, {
      headers: {
        "Content-Type": "application/json",
        "MAPI-Key": window.MAPI_Key
      }
    })
    if (res.ok) {
      const data = (await res.json())["NODE"];
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
    // <React.Fragment>
    <div>
      <Header />
      <BoxComp>
        <Stack direction={"row"}>
          <Stack sx={{mr:5, width:windowSize.width*0.45}}>
            <Box sx={{height:windowSize.height*0.5}}>
              <DataChart data={data} AnnotationDefaultData={Annotation} GM={GM} />
              <DiagramOpt DV={GM} checkedRv={val} />
            </Box>
          </Stack>
          <Box sx={{ p: 5, mt: 2, ml: 1, mr: 1, mb: 2, width:windowSize.width * 0.25, background: "#FFFFFF", overflow:"hidden", overflowY:"scroll" }}>
            <Units width={windowSize.width * 0.25}/>
            <Divider sx={{ p: 1 }} />
            <ElemOrNodeNum Dvalue={elemval} width={windowSize.width * 0.25}/>
            <Divider sx={{ p: 1 }} />
            <Box>
            <OptionTabs Radioval={v_radiovalue} Tabvalue={Tabvalue} displacement={v_displacement} force={v_force} moment={v_moment} Individualstress={v_individualstress} Cstress={v_cstress} Angulardisplacement={v_angulardisplacement} width={windowSize.width * 0.25} />
            </Box>
          </Box>
          <Box sx={{ mt: 2, mb: 2, ml: 1, width:windowSize.width*0.2, background: "#FFFFFF", overflow:"hidden", overflowY:"scroll" }}>
            <LoadCaseCombinationList chkbox={Checkboxitems} width={windowSize.width * 0.2} height={windowSize.height*0.5} />
          </Box>
        </Stack>
      </BoxComp>

      <Box>
        <Button onClick={Storethedata} sx={{ ml: "10vw", marginTop: 3 }} variant='contained'> Refresh window</Button>
        <Button onClick={handleClick} sx={{ ml: 2, marginTop: 3 }} variant='contained'> Draw Graph</Button>
        <SimpleDialog
          // selectedValue={selectedValue}
          open={open}
        />
      </Box>
    </div>
    // </React.Fragment>
  )
}