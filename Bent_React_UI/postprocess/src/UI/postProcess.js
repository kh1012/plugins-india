import * as React from 'react';
import Header from "./header";
import DataChart from './dataChart';
import DiagramOpt from './diagramOpt';
import Units from './Units';
import LoadCaseCombinationList from './lccCheckbox';
import ElemOrNodeNum from './ElemOrNode_Num';
import OptionTabs from './optionTabs';
// MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';

export default function PostProcess(){

  return (
    <React.Fragment>
      <Header/>
      <Box sx={{width:"100%", height:"auto", backgroundColor:"#F5F4FF"}}>
        <Stack direction={"row"}>
          <Stack sx={{ml:3, mt:2, mr:1, width:"50%"}}>
            <Box sx={{height:"90%"}}>
              <DataChart/>
            </Box>
            <Box sx={{height:"10%"}}>
              <DiagramOpt/>
            </Box>
          </Stack>
          <Box sx={{p:5, mt:2, ml:1, mr:1, mb:1, width:"30%", background:"#FFFFFF"}}>
            <Units/>
            <Divider sx={{p:1}}/>
            <ElemOrNodeNum />
            <Divider sx={{p:1}}/>
            <OptionTabs />
          </Box>
          <Box sx={{p:5, mt:2, ml:1, mr:2, width:"15%", background:"#FFFFFF"}}>
            <LoadCaseCombinationList />
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  )
}