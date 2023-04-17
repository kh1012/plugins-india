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
  const [DisChecked, SetDisChecked] = React.useState([false, false, false]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleClick(ischecked){
    SetDisChecked(ischecked); 
  }

  function DisplacementCompo (props){
    const [displacement, SetDisplacement] = React.useState(props.Checked);
    const [radioValue, setRadioValue] = React.useState('Displacement');

    function handelDX(event){
      SetDisplacement([event.target.checked, displacement[1], displacement[2]]);
    }

    function handelDY(event){
      SetDisplacement([displacement[0], event.target.checked, displacement[2]]);
    }

    function handelDZ(event){
      SetDisplacement([displacement[0], displacement[1], event.target.checked]);
    }

    const handleRadioChange = (event) => {
      setRadioValue(event.target.value);
    };

    React.useEffect(() => {
      function setDisplacementCheckedValue(){
        props.setCheckValue(displacement);
      }

      setDisplacementCheckedValue();
    }, [displacement]);

    return (
      <FormControl sx={{width:"100%"}}>
        <RadioGroup
          aria-labelledby="displacement-radio-buttons-group-label"
          name="displacement-radio-buttons-group"
          onChange={handleRadioChange}
          value={radioValue}
        >
          <FormControlLabel value="Displacement" control={<Radio id="Id_D" />} label="Displacement" />
          <Box sx={{ml:4, mb:1, width:"100%"}}>
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DX" onChange={handelDX} checked={displacement[0]}/>} label="DX" disabled={radioValue !== "Displacement" ? true : false} />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DY" onChange={handelDY} checked={displacement[1]}/>} label="DY" disabled={radioValue !== "Displacement" ? true : false} />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DZ" onChange={handelDZ} checked={displacement[2]}/>} label="DZ" disabled={radioValue !== "Displacement" ? true : false} />
          </Box>
          <FormControlLabel value="Angular displacement" control={<Radio id="Id_AD"/>} label="Angular displacement" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox  id="Id_RX" />} label="RX" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_RY" />} label="RY" />
            <FormControlLabel sx={{width:"30%"}} control={<Checkbox  id="Id_RZ"/>} label="RZ" />
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
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fx" />} label="Fx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fy" />} label="Fy" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fz" />} label="Fz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fyz" />} label="Fyz" />
          </Box>
          <FormControlLabel value="Moment" control={<Radio id="Id_M" />} label="Moment" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mx" />} label="Mx" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_My" />} label="My" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mz" />} label="Mz" />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Myz" />} label="Myz" />
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
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sax" />} label="Sax" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Ssy" />} label="Ssy" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Ssz" />} label="Ssz" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sby" />} label="Sby" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Sbz" />} label="Sbz" />
        </Box>
        <FormControlLabel value="Combined Stress" control={<Radio id="Id_CS" />} label="Combined Stress" />
        <Box sx={{ml:4, width:"100%"}}>
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_Max" />} label="Maximum" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C1" />} label="1 (-y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C2" />} label="2 (+y, +z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C3" />} label="3 (+y, -z)" />
          <FormControlLabel sx={{width:"25%"}} control={<Checkbox id="Id_C4" />} label="4 (-y, -z)" />
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
            <Tab {...a11yProps(0)} selected={value==="Displacement"}  sx={{width:"33%"}} label="Displacement" value="Displacement"  />
            <Tab {...a11yProps(1)}  selected={value==="Force/Moment"}  sx={{width:"33%"}} label="Force/Moment" value="Force/Moment"  />
            <Tab {...a11yProps(2)} selected={value==="Stress"}  sx={{width:"33%"}} label="Stress" value="Stress"  />
          </Tabs>
        </Box>
        <TabPanel value="Displacement">
          <DisplacementCompo setCheckValue={handleClick} Checked={DisChecked} />
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