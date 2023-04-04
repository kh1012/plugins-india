import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactDOM from 'react-dom/client';

import AppBar1 from './AppBar/AppBarListItems';
import UnitLen from './UnitLength/UnitLength';

var  g_unit;
var g_unit_multFact;
var  g_mat;
var  g_sect;
var  g_divmethod;
var g_numelem;
var g_tabidT1;
var g_T1startNodeNumber;
var g_T1startNodeCoOrd;
var g_T1endNodeNumber;
var g_T1endNodeCoOrd;
var g_T1totlenelem;

var g_tabidT2;
var g_T2startnodenum;
var g_T2endnodenum;
var g_T2totlenelem;

var g_chk_a;
var g_strgrp;
var g_chk_b;
var g_chk_c;
var g_notionalsize;
var g_chk_d;
var g_chk_e;
var g_beamendoffset_start;
var g_beamendoffset_end;

var g_Start_FX;
var g_Start_FY;
var g_Start_FZ;
var g_Start_MX;
var g_Start_MY;
var g_Start_MZ;

var g_End_FX;
var g_End_FY;
var g_End_FZ;
var g_End_MX;
var g_End_MY;
var g_End_MZ;

var g_NodeId=[];

const baseUrl = 'https://api-beta.midasit.com:443';
const programType = 'civil';
const MAPIKey = 'eyJ1ciI6InBpbmFraW4iLCJwZyI6ImNpdmlsIiwiY24iOiIxUjEydW9EUVFRIn0.8c9c37b8c361f0b53f83624b5a3d1e36591614a42062fe5d1779158b145e02d1';
window.MAPIKey = MAPIKey;
window.baseUrl = baseUrl;

function checkExistQuerystring() {
  const mapiKeyQuery = getMapiKey();
  console.log(mapiKeyQuery);
  if (mapiKeyQuery === null) return;
  const currentQueryStringDot = document.getElementById('current-querystring-dot');
  currentQueryStringDot.style.backgroundColor = '#059669';
  const currentQueryString = document.getElementById('current-querystring');
  currentQueryString.innerHTML = `Current QueryString is ${mapiKeyQuery}`;
  currentQueryString.style.color = '#059669';
  currentQueryString.style.fontWeight = '700';
  document.getElementById('querystring-wrapper').style.display = 'none';
}

function getMapiKey() {
  // Get params from url and get mapiKey.
  const params = new URLSearchParams(window.location.search);
  return params.get("mapiKey");
}

// Function to create QueryString
function makeQueryString() {
  const inputValue = document.getElementById('querystring-input').value;
  const  queryString  =  '?mapiKey='  +  inputValue ;
  document.getElementById('querystring-output').textContent  =  queryString ;
}

// Function to check if MAPI-Key is correct
async function checkMapiKey() {
  // Get mapiKey from QueryString.
  //const mapiKey = getMapiKey();

  const response = await fetch(`${baseUrl}/mapiKey/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key' : MAPIKey
    }
  });


  // Send the response result to the DOM object with getnode-output id.
  // document.getElementById('status-output').textContent = 
  //   JSON.stringify(await response.json(), null, 2);
    console.log(JSON.stringify(await response.json(), null, 2));
    getNodeFetch();

    createUnit("KN",g_unit,"BTU","F")
    createMaterial(4,g_mat)
    var [b,h]=g_sect.split("X")
    if(g_unit==="M") g_unit_multFact=0.001;
    else if(g_unit==="MM") g_unit_multFact=1.0;
    else if(g_unit==="IN") g_unit_multFact=0.393701;
    createSection(4,g_sect,b*g_unit_multFact,h*g_unit_multFact)

    if(g_divmethod==="Uniform")
    {
      if(g_tabidT1===0)
      {//Uniform - Co-Ordinates Tab
        var lenEachElem = parseFloat(g_T1totlenelem)/parseFloat(g_numelem);
        var [x0,y0,z0]=g_T1startNodeCoOrd.split(",")
          var [x1,y1,z1]=g_T1endNodeCoOrd.split(",")
          var a,b,c
        for (let i = 0; i <= g_numelem; i++) {
          
          var xIncrement = (parseFloat(x1) - parseFloat(x0))/parseFloat(g_numelem);
          var yIncrement = (parseFloat(y1) - parseFloat(y0))/parseFloat(g_numelem);
          var zIncrement = (parseFloat(z1) - parseFloat(z0))/parseFloat(g_numelem);
         
          if(i===0){            
            createNode(parseInt(g_T1startNodeNumber),parseFloat(x0),parseFloat(y0),parseFloat(z0))
             a = parseFloat(x0);
             b = parseFloat(y0);
             c = parseFloat(z0);
          }
          else if(i===parseInt(g_numelem)){            
            createNode(parseInt(g_T1endNodeNumber),parseFloat(x1),parseFloat(y1),parseFloat(z1))
          }
          else
          {
            createNode(parseInt(i)+parseInt(g_T1startNodeNumber),(parseFloat(a)+parseFloat(xIncrement)),(parseFloat(b)+parseFloat(yIncrement)),(parseFloat(c)+parseFloat(zIncrement)))
            a=(parseFloat(a)+parseFloat(xIncrement));
            b=(parseFloat(b)+parseFloat(yIncrement));
            c=(parseFloat(c)+parseFloat(zIncrement));
          }
          
        }

      }
      else
      {
        //Uniform - Node Tab
        var lenEachElem = parseFloat(g_T2totlenelem)/parseFloat(g_numelem);
        var [x0,y0,z0]=["0","0","0"]
        var a,b,c
        for (let i = 0; i <= g_numelem; i++) {
          
          var xIncrement = parseFloat(lenEachElem);
          var yIncrement =parseFloat(lenEachElem);
          var zIncrement = parseFloat(lenEachElem);
         
          if(i===0){            
            createNode(parseInt(g_T2startnodenum),parseFloat(x0),parseFloat(y0),parseFloat(z0))
             a = parseFloat(x0);
             b = parseFloat(y0);
             c = parseFloat(z0);
          }          
          else
          {
            createNode(parseInt(i)+parseInt(g_T2startnodenum),(parseFloat(a)+parseFloat(xIncrement)),(parseFloat(b)+parseFloat(yIncrement)),(parseFloat(c)+parseFloat(zIncrement)))
            a=(parseFloat(a)+parseFloat(xIncrement));
            b=(parseFloat(b)+parseFloat(yIncrement));
            c=(parseFloat(c)+parseFloat(zIncrement));
          }
          
        }

      }
       
    }
    else
    {
      
      if(g_tabidT1===0)
      {//Max Length - Co-Ordinate
        var numelems = parseFloat(g_T1totlenelem)/parseFloat(g_numelem);
        var [x0,y0,z0]=g_T1startNodeCoOrd.split(",")
          var [x1,y1,z1]=g_T1endNodeCoOrd.split(",")
          var a,b,c
        for (let i = 0; i <= numelems; i++) {
          
          var xIncrement = (parseFloat(x1)- parseFloat(x0) > 0) ? parseFloat(g_numelem) : 0;
          var yIncrement = (parseFloat(y1)- parseFloat(y0) > 0) ? parseFloat(g_numelem):0;
          var zIncrement = (parseFloat(z1)- parseFloat(z0) > 0) ?parseFloat(g_numelem):0;
         
          if(i===0){            
            createNode(parseInt(g_T1startNodeNumber),parseFloat(x0),parseFloat(y0),parseFloat(z0))
             a = parseFloat(x0);
             b = parseFloat(y0);
             c = parseFloat(z0);
          }
          else if(i===parseInt(g_numelem)){            
            createNode(parseInt(g_T1endNodeNumber),parseFloat(x1),parseFloat(y1),parseFloat(z1))
          }
          else
          {
            createNode(parseInt(i)+parseInt(g_T1startNodeNumber),(parseFloat(a)+parseFloat(xIncrement)),(parseFloat(b)+parseFloat(yIncrement)),(parseFloat(c)+parseFloat(zIncrement)))
            a=(parseFloat(a)+parseFloat(xIncrement));
            b=(parseFloat(b)+parseFloat(yIncrement));
            c=(parseFloat(c)+parseFloat(zIncrement));
          }
          
        }

      }
      else
      {
        ////Max Length - Node Tab
        var lenEachElem = parseFloat(g_numelem);
        var numelems = parseFloat(g_T2totlenelem)/parseFloat(g_numelem);
        var [x0,y0,z0]=["0","0","0"]
        var a,b,c
        for (let i = 0; i <= numelems; i++) {
          
          var xIncrement = parseFloat(lenEachElem);
          var yIncrement =parseFloat(lenEachElem);
          var zIncrement = parseFloat(lenEachElem);
         
          if(i===0){            
            createNode(parseInt(g_T2startnodenum),parseFloat(x0),parseFloat(y0),parseFloat(z0))
             a = parseFloat(x0);
             b = parseFloat(y0);
             c = parseFloat(z0);
          }          
          else
          {
            createNode(parseInt(i)+parseInt(g_T2startnodenum),(parseFloat(a)+parseFloat(xIncrement)),(parseFloat(b)+parseFloat(yIncrement)),(parseFloat(c)+parseFloat(zIncrement)))
            a=(parseFloat(a)+parseFloat(xIncrement));
            b=(parseFloat(b)+parseFloat(yIncrement));
            c=(parseFloat(c)+parseFloat(zIncrement));
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
    } while(i<arrayLen)

    createElement(1,1,4,100,101)
}



// Function that defines the action when the GET NODE button is clicked
async function getNodeFetch() {
 
  // Send request to get NODE.
  const response = await fetch(`${baseUrl}/${programType}/db/node`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'MAPI-Key' : MAPIKey
  }});

  // Send the response result to the DOM object with getnode-output id.
 // document.getElementById('getnode-output').textContent = 
 console.log(JSON.stringify(await response.json(), null, 2));
}


async function createNode(ID, X, Y, Z) {  
  
  const response = await fetch(`${baseUrl}/civil/db/node`, {

    method: "POST",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': MAPIKey

    },

    body: JSON.stringify(({
      "Assign": {
        [ID]: {
          "X": X,
          "Y": Y,
          "Z": Z,
        }
      }
    }
    ))
  });
  g_NodeId.push([ID]);
}

async function createMaterial(ID,Name) {  
  
  const response = await fetch(`${baseUrl}/civil/db/matl`, {

    method: "POST",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': MAPIKey

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

}


async function createElement(ID,intMATL,intSECT,intstrtNode,intendNode) {  
  
  const response = await fetch(`${baseUrl}/civil/db/elem`, {

    method: "POST",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': MAPIKey

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

async function createSection(ID,Name,sizeB,sizeH) {  
  
  //sizeB=parseFloat(sizeB)*g_unit_multFact
  console.log(sizeB)
  //sizeH=parseFloat(sizeH)*g_unit_multFact
  const response = await fetch(`${baseUrl}/civil/db/sect`, {

    method: "POST",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': MAPIKey

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
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0
            ]           
            
            
            }    

          }
        }        
      }
    }
    ))
  });

}

async function createUnit(ID, X, Y, Z,W) {  
  
  const response = await fetch(`${baseUrl}/civil/db/unit`, {

    method: "PUT",

    headers: {

      'Content-Type': 'application/json',

      'MAPI-Key': MAPIKey

    },

    body: JSON.stringify(({
      "Assign": {
        "1": {
          "FORCE": "KN",
          "DIST": X,
          "HEAT": "BTU",
          "TEMPER": "F"
        }
      }
    }
    ))
  });


}

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    g_unit=document.getElementById('units').innerText;
   
    console.log(g_unit);
    g_mat=document.getElementById('material').innerText;
   
    console.log(g_mat);
    g_sect=document.getElementById('section').innerText;
   
    console.log(g_sect);

    g_divmethod=document.getElementById('divmethod').innerText;
    console.log(g_divmethod);

    g_numelem=document.getElementById('fdivmethodtxt').value;
    console.log(g_numelem);

    g_tabidT1 = document.getElementById('simple-tab-0').tabIndex;
    console.log(g_tabidT1)

    g_tabidT2 = document.getElementById('simple-tab-1').tabIndex;
    console.log(g_tabidT2)
  
    if(g_tabidT1===0)
    {
      g_T1startNodeNumber=document.getElementById('T1startNodeNumber').value;
      console.log(g_T1startNodeNumber)
  
      g_T1startNodeCoOrd=document.getElementById('T1startNodeCoOrd').value;
      console.log(g_T1startNodeCoOrd)
  
      g_T1endNodeNumber=document.getElementById('T1endNodeNumber').value;
      console.log(g_T1endNodeNumber)
  
      g_T1endNodeCoOrd=document.getElementById('T1endNodeCoOrd').value;
      console.log(g_T1endNodeCoOrd)
  
      g_T1totlenelem=document.getElementById('T1totlenelem').value;
      console.log(g_T1totlenelem)
    }
 

    if(g_tabidT2===0)
    {
          g_T2startnodenum=document.getElementById('T2startnodenum').value;
    console.log(g_T2startnodenum)
    g_T2endnodenum=document.getElementById('T2endnodenum').value;
    console.log(g_T2endnodenum)
    g_T2totlenelem=document.getElementById('T2totlenelem').value;
    console.log(g_T2totlenelem)

    }

    g_chk_a  =document.getElementById('chk_a').checked;
    console.log(g_chk_a)
    if(g_chk_a)
    {
      g_strgrp = document.getElementById('strgrp').value;
      console.log(g_strgrp)
    }
    

    g_chk_b  =document.getElementById('chk_b').checked;
    console.log(g_chk_b)

    g_chk_c  =document.getElementById('chk_c').checked;
    console.log(g_chk_c)
    if(g_chk_c)
    {
      g_notionalsize = document.getElementById('notionalsize').value;
      console.log(g_notionalsize)
    }

    g_chk_d  =document.getElementById('chk_d').checked;
    console.log(g_chk_d)
    if(g_chk_d)
    {
      g_Start_FX = document.getElementById('Start_FX').checked;
      console.log( g_Start_FX)
      g_Start_FY = document.getElementById('Start_FY').checked;
      console.log( g_Start_FY)
      g_Start_FZ = document.getElementById('Start_FZ').checked;
      console.log( g_Start_FZ)
      g_Start_MX = document.getElementById('Start_MX').checked;
      console.log( g_Start_MX)
      g_Start_MY = document.getElementById('Start_MY').checked;
      console.log( g_Start_MY)
      g_Start_MZ = document.getElementById('Start_MZ').checked;
      console.log( g_Start_MZ)


      g_End_FX = document.getElementById('End_FX').checked;
      console.log( g_End_FX)
      g_End_FY = document.getElementById('End_FY').checked;
      console.log( g_End_FY)
      g_End_FZ = document.getElementById('End_FZ').checked;
      console.log( g_End_FZ)
      g_End_MX = document.getElementById('End_MX').checked;
      console.log( g_End_MX)
      g_End_MY = document.getElementById('End_MY').checked;
      console.log( g_End_MY)
      g_End_MZ = document.getElementById('End_MZ').checked;
      console.log( g_End_MZ)
    }

    g_chk_e  =document.getElementById('chk_e').checked;
    console.log(g_chk_e)
    if(g_chk_e)
    {
      g_beamendoffset_start = document.getElementById('beamendoffset_start').value;
      console.log(g_beamendoffset_start)
      g_beamendoffset_end = document.getElementById('beamendoffset_end').value;
      console.log(g_beamendoffset_end)
    }
    checkMapiKey()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar1 />
      <UnitLen />

      <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 108,mt:5   }} >
      Create Structure Line
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>M-API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please Enter M-API Key to Process Further
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="M-API Key"
            type="key"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


// import logo from './logo.svg';
// import Button from '@mui/material/Button';
// import React from 'react';
// import Navbar from './Components/Navbar/Navbar';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AppBar1 from './AppBar/AppBarListItems';
// import UnitLen from './UnitLength/UnitLength';
// import Backdrop from '@mui/material';
// import sf from './StackFol/StackFile'

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


// function App() {
//   const [open, setOpen] = React.useState(false);

// function handleClickOpen()  {
//   setOpen(true);

//  function  handleClose  ()  {
//     setOpen(false);
//   };


// };
//   return (
//     <div className="App"  >

//       <AppBar1 />
//       <UnitLen />
      

//       <Box m={1}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"

//       >
//         <Button variant="contained"  onClick={handleClickOpen}>
//           Create Structure Line
//         </Button>
//         <Dialog open={open} ></Dialog>
       
         
//       </Box>
      
//     </div>
    
//   );
// }

// export default App;
