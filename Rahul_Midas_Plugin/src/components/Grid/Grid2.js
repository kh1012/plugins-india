import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UnitDropDown from './firstselectedcomponent'
import MaterialDropDown from './secondselectedcomponent'
import SectionDropDown from './thirdselectedcomponent'
import Divmethod from './fourthselectedcomponent'
import Label from '@mui/material/FormLabel'
import Divider from '@mui/material/Divider'
import CustomTabs from './CustomTabs'
import Textfield from "@mui/material/TextField"
import Checkboxitems from "./Checkboxitems"
import SelectVariants from './firstselectedcomponent';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 600,
  marginTop: 20,
  width: '90%'
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item sx={{ marginLeft: 10  }}>
            <Box sx={{ marginTop: 2  } }>
              <Label sx={{ml:-50,marginTop:0,position:'absolute'}} >Unit-Length</Label>
              <UnitDropDown id="idlist3" sx={{marginTop:10 }} />
              <Divider sx={{height:10,borderBottomWidth: 3 }} />
            </Box>
            <Box sx={{ marginTop: 2  } }>
              <Label sx={{ml:-50,marginTop:0,position:'absolute'}} >Material</Label>
              <MaterialDropDown sx={{ marginTop:10}} />
              <Label sx={{ml:-50,marginTop:1,position:'absolute'}} >Section</Label>
              <SectionDropDown sx={{ marginTop:10}} />
              <Divider sx={{height:10,borderBottomWidth: 3 }} />
            </Box>
            <Box sx={{ marginTop: 2  } }>
              <Label sx={{ml:-50,marginTop:0,position:'absolute'}} >Divided method</Label>
              <Divmethod sx={{marginTop:10 }}/>
              <Label id="Labelid1" sx={{ml:-50,marginTop:1,position:'absolute'}} >Number of element</Label>
              <Textfield  sx={{ width: { sm: 100, marginLeft: 265, marginTop: 10, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              
              id="outlined-basic"
              variant="standard"></Textfield>
              <Divider sx={{height:10,borderBottomWidth: 3,marginTop:5 }} />
              <Label id="Labelid2" sx={{ml:45,marginTop:-5,position:'absolute'}} >m</Label>
            </Box>
            <Box>
            <CustomTabs></CustomTabs>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Box>
            <Checkboxitems></Checkboxitems>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}