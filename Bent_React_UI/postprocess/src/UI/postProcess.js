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
import { styled } from '@mui/material/styles';

export default function PostProcess(){
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

  return (
    <React.Fragment>
      <Header/>
      <BoxComp>
        <Stack direction={"row"}>
          <Box sx={{ml:1, mt:2, mr:1, mb:2, width:'45vw', height: '35vh', display:"flex", flexDirection: "column"}}>
            <DataChart/>
            <Divider sx={{my: 1.5}} />
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
    </React.Fragment>
  )
}