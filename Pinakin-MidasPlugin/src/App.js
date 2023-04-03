import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AppBar1 from './AppBar/AppBarListItems';
import UnitLen from './UnitLength/UnitLength';

var  g_unit;
var  g_mat;
var  g_sect;
var  g_divmethod;
var g_numelem;
var g_T1startNodeNumber;
var g_T1startNodeCoOrd;
var g_T1endNodeNumber;
var g_T1endNodeCoOrd;
var g_T1totlenelem;

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

    const tabidT1 = document.getElementById('simple-tab-0').tabIndex;
    console.log(tabidT1)

    const tabidT2 = document.getElementById('simple-tab-1').tabIndex;
    console.log(tabidT2)
  
    if(tabidT1===0)
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
 

    if(tabidT2===0)
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
