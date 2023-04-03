import { ButtonGroup } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Appbar from './components/AppBar/appbar';
import Grid from './components/Grid/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const baseUrl = "https://api-beta.midasit.com:443";
const programType = 'civil';
var mapiKey = "eyJ1ciI6IlJhaHVsTWlkYXM5NiIsInBnIjoiY2l2aWwiLCJjbiI6IlNUZVZDaW9SU0EifQ.d6366aff78ba1d787063b082a014569396454e67e5a01a6d4a4ce3dddc12b405"
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
var SFX
var SFY
var SFZ
var SMX
var SMY
var SMZ
var EFX
var EFY
var EFZ
var EMX
var EMY
var EMZ
var StartOffset
var EndOffset

function getids(){
  Units=document.getElementById("Units").innerText;
  Material=document.getElementById("Material").innerText;
  Section=document.getElementById("Section").innerText;
  DivMethod=document.getElementById("Section").innerText;
  Number_Length_ofelement=document.getElementById("Number_Of_Elements").value;
  tabid1=document.getElementById("full-width-tab-0").tabIndex;

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


function StartApplication()
{
  getids();
  checkMapiKey();
createNode(1,5,0,0);
createUnit("KN","MM","BTU","F")
}

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

}


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
