import * as React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import dev1 from './devidelist'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { color } from '@mui/system';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Selunt from './selectionUnit'
import SelMat from './selectionMaterial'
import SelSect from './selectionSect'
import SelDivMethod from './selectionDevidedMehod'

import TextField from '@mui/material/TextField';
import Label from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabbedthing from './TwoTabs';

import ChkBoxesRight from '../Checkboxes/chkbox'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

const Box2 = styled(Paper)(({ theme }) => ({

    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

    ...theme.typography.body2,

    padding: theme.spacing(25),

    marginTop: 25,

    marginLeft: 50,

    height: 280,

    width: 500,

    // textAlign: 'center',

    color: theme.palette.text.secondary,

    

}));

const Box3 = styled(Paper)(({ theme }) => ({

   
    // display:"flex",
    // justifyContent:"center",
    // padding: theme.spacing(1),

    marginTop: -180,

    marginLeft: -180,

    height: 50,

    width: 850,
    
    // textAlign: 'center',

    // color: theme.palette.text.secondary,

    

}));


export default function AutoGrid() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  
  };
    return (

        <Box sx={{ flexGrow: 1 }}>
                
            <Grid container spacing={0.5}>
            
                <Grid>

                    <Box2 >
                       <Box> 
                            <Typography sx={{variant:"body1", color:"grey",  fontFamily:"serif" ,component:"div",  ml:-22,mt:-20,font:'caption'}}  >
                            Unit-Length
                            </Typography>                      
                          
                            
                            <Selunt/>
                              
                          
                              <Divider sx={{width:900,height:10,borderBottomWidth:3,ml:-25,mt:0}}></Divider> 
                          </Box>

                          {/* Material */}

                          <Box> 
                            <Typography id="frmMatl" sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:-22,mt:3,font:'caption'}}  >
                            Material
                            </Typography>                      
                          
                           <SelMat/>
                          
                              {/* Secion */}
                          <Typography id="frmSect"  sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:-22,mt:3,font:'caption'}}  >
                            Section
                            </Typography>                      
                          
                            <SelSect/>
                          
                              <Divider sx={{width:900,height:10,borderBottomWidth:3,ml:-25,mt:0}}></Divider> 
                          </Box>

                          {/* Devided Method */}


                          <Box> 
                            <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:-22,mt:3,font:'caption'}}  >
                            Devision Method
                            </Typography>                      
                          
                            <SelDivMethod/>

                            {/* Number of elements */}

                            <Label id="id1" sx={{ color:"grey",  fontFamily:"serif" ,  ml:-39,mt:1,font:'caption',marginTop:4,position:'absolute'}}  >
                            Number of Element
                            </Label>                      

                            <TextField id="fdivmethodtxt" onChange={handleChange} value={age} sx={{m:1,height:0,width:150,size:"absolute",position:'absolute', ml:42,mt:2}}/>
                            
                            <Label id="id2" sx={{ color:"grey",  fontFamily:"serif" ,  ml:62,mt:1,font:'caption',marginTop:4,position:'absolute'}}  >
                            ea
                            </Label>

                              <Divider sx={{width:900,height:10,borderBottomWidth:3,ml:-25,mt:6}}></Divider> 
                          </Box>



                      <Box> 
                           <Tabbedthing/>                           
                      </Box>

                    </Box2>

                </Grid>

                <Grid>

                    <Box2>
                            

                    <ChkBoxesRight/>




                    </Box2>

                </Grid>



            </Grid>

        </Box>

    );

}