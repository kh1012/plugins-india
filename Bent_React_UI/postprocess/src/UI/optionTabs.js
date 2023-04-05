import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

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
          <FormControlLabel value="Displacement" control={<Radio />} label="Displacement" />
          <Box sx={{ml:4, mb:1, width:"100%"}}>
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox defaultChecked />} label="DX" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox defaultChecked />} label="DY" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox defaultChecked />} label="DZ" />
          </Box>
          <FormControlLabel value="Angular displacement" control={<Radio />} label="Angular displacement" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox />} label="RX" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox />} label="RY" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox />} label="RZ" />
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
          <FormControlLabel value="Force" control={<Radio />} label="Force" />
          <Box sx={{ml:4, mb:1, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Fx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Fy" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Fz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Fyz" />
          </Box>
          <FormControlLabel value="Moment" control={<Radio />} label="Moment" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Mx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="My" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Mz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox defaultChecked />} label="Myz" />
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
        <FormControlLabel value="Individual Stress" control={<Radio />} label="Individual Stress" />
        <Box sx={{ml:4, mb:1, width:"100%"}}>
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Sax" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Ssy" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Ssz" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Sby" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Sbz" />
        </Box>
        <FormControlLabel value="Combined Stress" control={<Radio />} label="Combined Stress" />
        <Box sx={{ml:4, width:"100%"}}>
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="Maximum" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="1 (-y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="2 (+y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="3 (+y, -z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox defaultChecked />} label="4 (-y, -z)" />
        </Box>
      </RadioGroup>
    </FormControl>
    )
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab sx={{width:"33%"}} label="Displacement" value="Displacement" />
            <Tab sx={{width:"33%"}} label="Force/Moment" value="Force/Moment" />
            <Tab sx={{width:"33%"}} label="Stress" value="Stress" />
          </TabList>
        </Box>
        <TabPanel value="Displacement">
          <DisplacementCompo />
        </TabPanel>
        <TabPanel value="Force/Moment">
          <ForceMoment />
        </TabPanel>
        <TabPanel value="Stress">
          <Stress/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}