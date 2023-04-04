import { ButtonGroup } from '@mui/material';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/client';
import Appbar from './components/AppBar/appbar';
import Grid from './components/Grid/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const baseUrl = "https://api-beta.midasit.com:443";
const programType = 'civil';
var mapiKey = "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6IlZpeDAwUzJqUVEifQ.1f7159e0697a63eb82338ad36ff63fcbcf5f43a98cfbe69187b61214753d10da"
window.mapikey=mapiKey;
var Units;
var Material;
var Section;
var DivMethod;
var Number_Length_ofelement;
var tabid1;
var Coordinate_StartNode_Number;
var Coordinate_StartNode_Coordinate;
var Coordinate_EndNode_Coordinate;
var Coordinate_EndNode_Number;
var Coordinate_TotalLength;
var Node_StartNode_Number;
var Node_EndNode_Number;
var Node_TotalLength;
var CB_StructuralGp;
var Text_StructuralGp;
var Text_Notionalsize;
var CB_NodeLoacalAxis;
var CB_Notionalsize;
var CB_RestraintsSupports;
var CB_BeamEndOffset;
var startsupport ="";
var endsupport ="";
var SFX;
var SFY;
var SFZ;
var SMX;
var SMY;
var SMZ;
var EFX;
var EFY;
var EFZ;
var EMX;
var EMY;
var EMZ;
var StartOffset;
var EndOffset;
var g_unit_multFact;
var g_SecID=[];
var g_MatID=[];
var g_NodeId=[];
function getids(){
  Units=document.getElementById("Units").innerText;
  Material=document.getElementById("Material").innerText;
  Section=document.getElementById("Section").innerText;
  DivMethod=document.getElementById("DivMethod").innerText;
  Number_Length_ofelement=document.getElementById("Number_Of_Elements").value;
  tabid1=document.getElementById("simple-tab-0").tabIndex;

  if(tabid1===0)
  {
    Coordinate_StartNode_Number=document.getElementById("Coordinate_Start_Number").value;
    Coordinate_StartNode_Coordinate=document.getElementById("Coordinate_Start_Coordinate").value;
    Coordinate_EndNode_Number=document.getElementById("Coordinate_End_Number").value;
    Coordinate_EndNode_Coordinate=document.getElementById("Coordinate_End_Coordinate").value;
    Coordinate_TotalLength=document.getElementById("Coordinate_Length_Of_Elements").value;
 
  }
  else
  {
    Node_StartNode_Number=document.getElementById("Node_Start_Node").value;
    Node_EndNode_Number=document.getElementById("Node_End_Node").value;
    Node_TotalLength=document.getElementById("Node_Length_Of_Elements").value;
  }
  
  CB_StructuralGp=document.getElementById("CB_StructuralGp").checked;
  if(CB_StructuralGp){
    Text_StructuralGp=document.getElementById("Text_StructuralGp").value;
  }

  CB_NodeLoacalAxis=document.getElementById("CB_NodeLoacalAxis").checked;
  
  CB_Notionalsize=document.getElementById("CB_Notionalsize").checked;
  if(CB_Notionalsize){
    Text_Notionalsize=document.getElementById("Text_Notionalsize").value;
  }

  CB_RestraintsSupports=document.getElementById("CB_RestraintsSupports").checked;
  if(CB_RestraintsSupports){
    SFX=document.getElementById("SFX").checked;
    SFY=document.getElementById("SFY").checked;
    SFZ=document.getElementById("SFZ").checked;
    SMX=document.getElementById("SMX").checked;
    SMY=document.getElementById("SMY").checked;
    SMZ=document.getElementById("SMZ").checked;

    EFX=document.getElementById("EFX").checked;
    EFY=document.getElementById("EFY").checked;
    EFZ=document.getElementById("EFZ").checked;
    EMX=document.getElementById("EMX").checked;
    EMY=document.getElementById("EMY").checked;
    EMZ=document.getElementById("EMZ").checked;
  }

  CB_BeamEndOffset=document.getElementById("CB_BeamEndOffset").checked;
  if(CB_BeamEndOffset){
    EndOffset=document.getElementById("EndOffset").value;
    StartOffset=document.getElementById("StartOffset").value;

  }

}


async function StartApplication() {
  g_NodeId=[];
  g_SecID=[];
  g_MatID=[];
  getids();
  checkMapiKey();
  createUnit("KN", Units, "BTU", "F")
  createMaterial("1", "M20");
  var [b, h] = Section.split("x");
  if(Units==="M") g_unit_multFact=0.001;
    else if(Units==="MM") g_unit_multFact=1.0;
    else if(Units==="IN") g_unit_multFact=0.393701;
 await createSection("1", "Beam", parseInt(b)*g_unit_multFact, parseInt(h)*g_unit_multFact);
 await gettabdetails()


  startsupport=""
  endsupport=""
  decidestartsupport();
  decideendsupport();
  if(tabid1===0){
  createSupport(Coordinate_StartNode_Number,startsupport);
  createSupport(Coordinate_EndNode_Number,endsupport);
 
  }
  else{
    createSupport(Node_StartNode_Number,startsupport);
    createSupport(Node_EndNode_Number,endsupport);
  }
  createGroup(1, Text_StructuralGp, [1,2,3],[1,2]);
  createNodeLoacalAxis("1");
  createNotionalSize("1","0.095");
  AddoffsettoBeam("1",0,Text_StructuralGp);
}

async function gettabdetails(){
  if (DivMethod === "Uniform") {
    if (tabid1 === 0) {//Uniform - Co-Ordinates Tab
      var lenEachElem = parseFloat(Coordinate_TotalLength) / parseFloat(Number_Length_ofelement);
      var [x0, y0, z0] = Coordinate_StartNode_Coordinate.split(",")
      var [x1, y1, z1] = Coordinate_EndNode_Coordinate.split(",")
      var a, b, c
      for (let i = 0; i <= Number_Length_ofelement; i++) {

        var xIncrement = (parseFloat(x1) - parseFloat(x0)) / parseFloat(Number_Length_ofelement);
        var yIncrement = (parseFloat(y1) - parseFloat(y0)) / parseFloat(Number_Length_ofelement);
        var zIncrement = (parseFloat(z1) - parseFloat(z0)) / parseFloat(Number_Length_ofelement);

        if (i === 0) {
          await createNode(parseInt(Coordinate_StartNode_Number), parseFloat(x0), parseFloat(y0), parseFloat(z0))
          a = parseFloat(x0);
          b = parseFloat(y0);
          c = parseFloat(z0);
        }
        else if (i === parseInt(Number_Length_ofelement)) {
          await createNode(parseInt(Coordinate_EndNode_Number), parseFloat(x1), parseFloat(y1), parseFloat(z1))
        }
        else {
          await createNode(parseInt(i) + parseInt(Coordinate_StartNode_Number), (parseFloat(a) + parseFloat(xIncrement)), (parseFloat(b) + parseFloat(yIncrement)), (parseFloat(c) + parseFloat(zIncrement)))
          a = (parseFloat(a) + parseFloat(xIncrement));
          b = (parseFloat(b) + parseFloat(yIncrement));
          c = (parseFloat(c) + parseFloat(zIncrement));
        }

      }

    }
  else{
         //Uniform - Node Tab
         var lenEachElem = parseFloat(Node_TotalLength) / parseFloat(Number_Length_ofelement);
         var [x0, y0, z0] = ["0", "0", "0"]
         var a, b, c
         for (let i = 0; i <= Node_TotalLength; i++) {
   
           var xIncrement = parseFloat(lenEachElem);
           var yIncrement = parseFloat(lenEachElem);
           var zIncrement = parseFloat(lenEachElem);
   
           if (i === 0) {
             await createNode(parseInt(Node_StartNode_Number), parseFloat(x0), parseFloat(y0), parseFloat(z0))
             a = parseFloat(x0);
             b = parseFloat(y0);
             c = parseFloat(z0);
           }
           else {
             await createNode(parseInt(i) + parseInt(Node_StartNode_Number), (parseFloat(a) + parseFloat(xIncrement)), (parseFloat(b) + parseFloat(yIncrement)), (parseFloat(c) + parseFloat(zIncrement)))
             a = (parseFloat(a) + parseFloat(xIncrement));
             b = (parseFloat(b) + parseFloat(yIncrement));
             c = (parseFloat(c) + parseFloat(zIncrement));
           }
   
         }
  }
}
else {
  if (tabid1 === 0) {//Max Length - Co-Ordinate
    var numelems = parseFloat(Coordinate_TotalLength) / parseFloat(Number_Length_ofelement);
    var [x0, y0, z0] = Coordinate_StartNode_Coordinate.split(",")
    var [x1, y1, z1] = Coordinate_EndNode_Coordinate.split(",")
    var a, b, c
    for (let i = 0; i <= numelems; i++) {

      var xIncrement = (parseFloat(x1) - parseFloat(x0) > 0) ? parseFloat(Number_Length_ofelement) : 0;
      var yIncrement = (parseFloat(y1) - parseFloat(y0) > 0) ? parseFloat(Number_Length_ofelement) : 0;
      var zIncrement = (parseFloat(z1) - parseFloat(z0) > 0) ? parseFloat(Number_Length_ofelement) : 0;

      if (i === 0) {
        await createNode(parseInt(Coordinate_StartNode_Number), parseFloat(x0), parseFloat(y0), parseFloat(z0))
        a = parseFloat(x0);
        b = parseFloat(y0);
        c = parseFloat(z0);
      }
      else if (i === parseInt(Number_Length_ofelement)) {
        await createNode(parseInt(Coordinate_EndNode_Number), parseFloat(x1), parseFloat(y1), parseFloat(z1))
      }
      else {
        await createNode(parseInt(i) + parseInt(Coordinate_StartNode_Number), (parseFloat(a) + parseFloat(xIncrement)), (parseFloat(b) + parseFloat(yIncrement)), (parseFloat(c) + parseFloat(zIncrement)))
        a = (parseFloat(a) + parseFloat(xIncrement));
        b = (parseFloat(b) + parseFloat(yIncrement));
        c = (parseFloat(c) + parseFloat(zIncrement));
      }

    }

  }
  else{
          ////Max Length - Node Tab
          var lenEachElem = parseFloat(Number_Length_ofelement);
          var numelems = parseFloat(Node_TotalLength) / parseFloat(Number_Length_ofelement);
          var [x0, y0, z0] = ["0", "0", "0"]
          var a, b, c
          for (let i = 0; i <= numelems; i++) {
    
            var xIncrement = parseFloat(lenEachElem);
            var yIncrement = parseFloat(lenEachElem);
            var zIncrement = parseFloat(lenEachElem);
    
            if (i === 0) {
              await createNode(parseInt(Node_StartNode_Number), parseFloat(x0), parseFloat(y0), parseFloat(z0))
              a = parseFloat(x0);
              b = parseFloat(y0);
              c = parseFloat(z0);
            }
            else {
              await createNode(parseInt(i) + parseInt(Node_StartNode_Number), (parseFloat(a) + parseFloat(xIncrement)), (parseFloat(b) + parseFloat(yIncrement)), (parseFloat(c) + parseFloat(zIncrement)))
              a = (parseFloat(a) + parseFloat(xIncrement));
              b = (parseFloat(b) + parseFloat(yIncrement));
              c = (parseFloat(c) + parseFloat(zIncrement));
            }
    
          }
  }
}
 // createNode(10,11,21,31)
    // createNode(12,12,22,32)
    let i=1;
    let arrayLen = g_NodeId.length;
    do{
      let val = g_NodeId[i];
      let val1 = g_NodeId[i-1];
      createBeam(i,parseInt(g_MatID[0]),parseInt(g_SecID[0]),parseInt(val),parseInt(val1))
      i=++i;
    } while(i<arrayLen)

    // createElement(1,1,4,100,101)

}

async function createBeam(ID,intMATL,intSECT,intstrtNode,intendNode) {  
  
  const response = await fetch(`${baseUrl}/civil/db/elem`, {

    method: "PUT",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': mapiKey

    },

    body: JSON.stringify(({
      "Assign": {
        [ID]: {
          "TYPE": "BEAM",
            "MATL": intMATL,
            "SECT": intSECT,
          
          "NODE": [
            
            intstrtNode,
            intendNode,
                0,
                0,
                0,
                0,
                0,
                0
            
        ],
        "ANGLE": 0,
        "STYPE": 0
        }
      }
    }
    ))
  });

}

function decidestartsupport() {

  if (SFX) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }

  if (SFY) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }
  if (SFZ) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }

  if (SMX) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }

  if (SMY) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }

  if (SMZ) {
    startsupport = startsupport + "1";
  }
  else {
    startsupport = startsupport + "0";
  }
  startsupport = startsupport + "0";
}


function decideendsupport() {

  if (EFX) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }

  if (EFY) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }
  if (EFZ) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }

  if (EMX) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }

  if (EMY) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }

  if (EMZ) {
    endsupport = endsupport + "1";
  }
  else {
    endsupport = endsupport + "0";
  }
  endsupport = endsupport + "0";
}

//check the mapi key
async function checkMapiKey() {
  // mapiKey를 QueryString으로부터 가져 옵니다.

  const response = await fetch(`${baseUrl}/mapiKey/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    }
  });

  // 응답 결과를 getnode-output id를 가진 DOM 객체에 전달합니다.
  
   console.log( JSON.stringify(await response.json(), null, 2));
}


///creates the node
async function createNode(ID,X,Y,Z){
var newid=`${ID}`
  var bd={
    "Assign":{
      [ID]: {
         "X": X,
         "Y": Y,
         "Z": Z,
     }
  }
  }

 const response = await fetch(`${baseUrl}/${programType}/db/node`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json',
    'MAPI-Key': mapiKey
  },
  body:JSON.stringify(bd)
});
g_NodeId.push(ID);
}


//Creates the Unit
async function createUnit(Force, DIST, Heat, temp) {

  const response = await fetch(`${baseUrl}/${programType}/db/unit`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        "1": {
          "FORCE": Force,
          "DIST": DIST,
          "HEAT": Heat,
          "TEMPER": temp
        }

      }
    }

    ))

  });

if(DIST==="M") g_unit_multFact=0.001;
else if(DIST==="MM") g_unit_multFact=1.0;
else if(DIST==="IN") g_unit_multFact=0.393701
}

//file by material,section
async function createMaterial(ID,Name) {  
  
  const response = await fetch(`${baseUrl}/${programType}/db/matl`, {

    method: "PUT",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': mapiKey

    },

    body: JSON.stringify(({
      "Assign": {
        [ID]: {
          "TYPE": "CONC",
          "NAME": Name,
          "HE_SPEC": 0,
          "HE_COND": 0,
          "THMAL_UNIT": "C",
          "PLMT": 0,
          "P_NAME": "",
          "bMASS_DENS": false,
          "DAMP_RAT": 0.05,
          "PARAM": [
            {
                "P_TYPE": 1,
                "STANDARD": "IS(RC)",
                "CODE": "",
                "DB": Name,
                "bELAST": false,
                "ELAST": 22360000
            }
        ]
        }
      }
    }
    ))
  });
  g_MatID.push(ID);
}

//Section
async function createSection(ID,Name,sizeB,sizeH) {  
  console.log(Name)
  console.log(sizeB*g_unit_multFact)
  console.log(sizeH*g_unit_multFact)
  const response = await fetch(`${baseUrl}/${programType}/db/sect`, {

    method: "PUT",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': mapiKey

    },

    body: JSON.stringify(({
      "Assign": {
        [ID]: {
          "SECTTYPE": "DBUSER",
          "SECT_NAME": Name,
          "SECT_BEFORE": {
            "OFFSET_PT": "CC",
            "OFFSET_CENTER": 0,
            "USER_OFFSET_REF": 0,
            "HORZ_OFFSET_OPT": 0,
            "USERDEF_OFFSET_YI": 0,
            "VERT_OFFSET_OPT": 0,
            "USERDEF_OFFSET_ZI": 0,
            "USE_SHEAR_DEFORM": true,
            "USE_WARPING_EFFECT": false,
            "SHAPE": "SB",
            "DATATYPE": 2,
            "SECT_I": {
              "vSIZE": [
                sizeB,
                sizeH,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]           
            
            
            }    

          }
        }        
      }
    }
    ))
  });
  g_SecID.push(ID);
}

//Group
async function createGroup(ID,GpName,NList,EList) {
  const response = await fetch(`${baseUrl}/${programType}/db/grup`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        [ID]: {
          "NAME": GpName,
          "N_LIST": NList,
          "E_LIST":EList
        }

      }
    }

    ))

  });

  console.log( JSON.stringify(await response.json(), null, 2));
}

//Support
async function createSupport(startsupportid,startsupport) {
  const response = await fetch(`${baseUrl}/${programType}/db/cons`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        [startsupportid]: {
            "ITEMS": [
                {
                    "ID": 1,
                    "CONSTRAINT": startsupport
                }
            ]
        }
    }
    }

    ))

  });

  console.log( JSON.stringify(await response.json(), null, 2));
}

//Node Local Axis
async function createNodeLoacalAxis(id) {
  const response = await fetch(`${baseUrl}/${programType}/db/skew`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        [id]: 
          {
            "iMETHOD": 1,
            "ANGLE_X": 43.0,
            "ANGLE_Y": 44.0,
            "ANGLE_Z": 45.0
          }
        

      }
    }

    ))

  });

  console.log(JSON.stringify(await response.json(), null, 2));
}

//Node Local Axis
async function createNotionalSize(id,val) {
  const response = await fetch(`${baseUrl}/${programType}/db/edmp`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        [id]: 
          {
            "TYPE": "NSM",
            "H_VS": val,
          }
        

      }
    }

    ))

  });

  console.log(JSON.stringify(await response.json(), null, 2));
}

async function AddoffsettoBeam(id,val,gpname) {
  const response = await fetch(`${baseUrl}/${programType}/db/offs`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key': mapiKey
    },
    body: JSON.stringify(({
      "Assign": {
        [id]: {
            "ITEMS": [
                {
                    "ID": 1,
                    "GROUP_NAME": "",
                    "TYPE": "ELEMENT",
                    "RGDYi": parseFloat(StartOffset),
                    "RGDZi":  parseFloat(StartOffset),
                    "RGDYj":  parseFloat(EndOffset),
                    "RGDZj": parseFloat(EndOffset),
                }
            ]
        }
    }
    }

    ))

  });

  console.log(JSON.stringify(await response.json(), null, 2));
}



function App() {
  return (
    <div className="App"  >
      <Appbar />
      <Grid container spacing={2} />
      <Box m={1}
        display="flex"
        justifyContent="center"
        alignItems="baseline">
        <Button variant="contained" onClick={StartApplication} >
          Create Structure Line
        </Button>
      </Box>
    </div>
  );
}

export default App;
