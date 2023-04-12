import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LabTabs() {
  const [value, setValue] = React.useState('Displacement');

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };


  function DisplacementCompo (props){

    return (
      <FormControl sx={{width:"100%"}}>
        <RadioGroup
          aria-labelledby="displacement-radio-buttons-group-label"
          defaultValue="Displacement"
          name="displacement-radio-buttons-group"
        >
          <FormControlLabel value="Displacement" control={<  Radio id="Id_D" />} label="Displacement" />
          <Box sx={{ml:4, mb:1, width:"100%"}}>
            <FormControlLabel   sx={{width:"30%"}} control={<Checkbox id="Id_DX"  defaultChecked />} label="DX" />
            <FormControlLabel  sx={{width:"30%"}} control={<Checkbox id="Id_DY" defaultChecked />} label="DY" />
            <FormControlLabel  sx={{width:"30%"}} control={<Checkbox id="Id_DZ" defaultChecked />} label="DZ" />
          </Box>
          <FormControlLabel id="Id_AD" value="Angular displacement" control={<Radio />} label="Angular displacement" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox  id="Id_RX" />} label="RX" />
            <FormControlLabel  sx={{width:"30%"}} control={<Checkbox id="Id_RY" />} label="RY" />
            <FormControlLabel  sx={{width:"30%"}} control={<Checkbox  id="Id_RZ"/>} label="RZ" />
          </Box>
        </RadioGroup>
      </FormControl>
    )
  }

  function ForceMoment (props){

    return (
      <FormControl sx={{width:"100%"}}>
        <RadioGroup
          aria-labelledby="ForceMoment-radio-buttons-group-label"
          defaultValue="Force"
          name="ForceMoment-radio-buttons-group"
        >
          <FormControlLabel value="Force" control={<Radio id="Id_F" />} label="Force" />
          <Box sx={{ml:4, mb:1, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fx" defaultChecked />} label="Fx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fy" defaultChecked />} label="Fy" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fz" defaultChecked />} label="Fz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fyz" defaultChecked />} label="Fyz" />
          </Box>
          <FormControlLabel value="Moment" control={<Radio id="Id_M" />} label="Moment" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mx" defaultChecked />} label="Mx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_My" defaultChecked />} label="My" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mz" defaultChecked />} label="Mz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Myz" defaultChecked />} label="Myz" />
          </Box>
        </RadioGroup>
      </FormControl>
    )
  }

  function Stress (props) {
  
    return (
      <FormControl sx={{width:"100%"}}>
      <RadioGroup
        aria-labelledby="Stress-radio-buttons-group-label"
        defaultValue="Combined Stress"
        name="Stress-radio-buttons-group"
      >
        <FormControlLabel value="Individual Stress" control={<Radio id="Id_Is" />} label="Individual Stress" />
        <Box sx={{ml:4, mb:1, width:"100%"}}>
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sax" defaultChecked />} label="Sax" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Ssy" defaultChecked />} label="Ssy" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Ssz" defaultChecked />} label="Ssz" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sby" defaultChecked />} label="Sby" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sbz" defaultChecked />} label="Sbz" />
        </Box>
        <FormControlLabel value="Combined Stress" control={<Radio id="Id_CS" />} label="Combined Stress" />
        <Box sx={{ml:4, width:"100%"}}>
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Max" defaultChecked />} label="Maximum" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C1" defaultChecked />} label="1 (-y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C2" defaultChecked />} label="2 (+y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C3" defaultChecked />} label="3 (+y, -z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C4" defaultChecked />} label="4 (-y, -z)" />
        </Box>
      </RadioGroup>
    </FormControl>
    )
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext    value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab  {...a11yProps(0)} selected={value==="Displacement"}  sx={{width:"33%"}} label="Displacement" value="Displacement"  />
            <Tab {...a11yProps(1)}  selected={value==="Force/Moment"}  sx={{width:"33%"}} label="Force/Moment" value="Force/Moment"  />
            <Tab {...a11yProps(2)} selected={value==="Stress"}  sx={{width:"33%"}} label="Stress" value="Stress"  />
          </Tabs>
        </Box>
        <TabPanel   value="Displacement">
          <DisplacementCompo />
        </TabPanel>
        <TabPanel   value="Force/Moment">
          <ForceMoment />
        </TabPanel>
        <TabPanel   value="Stress">
          <Stress/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}