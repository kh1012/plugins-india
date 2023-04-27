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

export default function LabTabs(props) {
  const [value, setValue] = React.useState(props.Tabvalue);
  const [DisChecked, SetDisChecked] = React.useState([false, false, false]);
  const [displacement, SetDisplacement] = React.useState(props.displacement);
  const [force, SetForce] = React.useState(props.force);
  const [moment, SetMoment] = React.useState(props.moment);
  const [Individualstress, SetIS] = React.useState(props.Individualstress);
  const [Cstress, SetCS] = React.useState(props.Cstress);
  const [Angulardisplacement, SetADisplacement] = React.useState(props.Angulardisplacement);
  const [displacementradiovalue,SetDRB]=React.useState(props.Radioval[0]);
  const [Forceradiovalue,SetFMRB]=React.useState(props.Radioval[1]);
  const [Stressradiovalue,SetSRB]=React.useState(props.Radioval[2]);

  const TabWidth = props.width;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleClick(ischecked){
    SetDisChecked(ischecked); 
  }

  function DisplacementCompo (props){
    const [radioValue, setRadioValue] = React.useState();

    function handleDX(event){
      SetDisplacement([event.target.checked, displacement[1], displacement[2]]);
     
      SetADisplacement([false,false,false]);
    }

    function handleDY(event){
      SetDisplacement([displacement[0], event.target.checked, displacement[2]]);
   
      SetADisplacement([false,false,false]);
    }

    function handleDZ(event){
      SetDisplacement([displacement[0], displacement[1], event.target.checked]);
      SetADisplacement([false,false,false]);
    }
    
    function handleRX(event){
      SetADisplacement([event.target.checked, Angulardisplacement[1], Angulardisplacement[2]]);
      SetDisplacement([false,false,false]);
    }
    function handleRY(event){
      SetADisplacement([Angulardisplacement[0], event.target.checked, Angulardisplacement[2]]);
      SetDisplacement([false,false,false]);
    }

    function handleRZ(event){
      SetADisplacement([Angulardisplacement[0], Angulardisplacement[1], event.target.checked]);
      SetDisplacement([false,false,false]);
    }

    const handleRadioChange = (event) => {
      SetDRB(event.target.value);
    };

    // React.useEffect(() => {
  
    //   function setDisplacementCheckedValue(){
    //     if(radioValue==="Displacement"){
    //     props.setCheckValue(displacement);
    //   }
    //   else{
    //     props.setCheckValue(Angulardisplacement);
    //   }
    // }

    //   setDisplacementCheckedValue();
    // });

    return (
      <FormControl sx={{width:"100%", height:"100%"}}>
        <RadioGroup
          aria-labelledby="displacement-radio-buttons-group-label"
          name="displacement-radio-buttons-group"
          onChange={handleRadioChange}
          value={displacementradiovalue}
        >
          <Box sx={{height:"50%"}}>
            <FormControlLabel value="Displacement" control={<Radio id="Id_D" />} label="Displacement" />
            <Box sx={{ml:4, mb:1, width:"100%"}}>
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DX" onChange={handleDX} checked={displacement[0]}/>} label="DX" disabled={displacementradiovalue !== "Displacement" ? true : false} />
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DY" onChange={handleDY} checked={displacement[1]}/>} label="DY" disabled={displacementradiovalue !== "Displacement" ? true : false} />
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_DZ" onChange={handleDZ} checked={displacement[2]}/>} label="DZ" disabled={displacementradiovalue !== "Displacement" ? true : false} />
            </Box>
          </Box>
          <Box sx={{height:"50%"}}>
            <FormControlLabel value="Angular displacement" control={<Radio id="Id_AD"/>} label="Angular displacement" />
            <Box sx={{ml:4, width:"100%"}}>
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox  id="Id_RX" onChange={handleRX}  checked={Angulardisplacement[0]} />}  label="RX" disabled={displacementradiovalue === "Displacement" ? true : false}  />
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox id="Id_RY" onChange={handleRY} checked={Angulardisplacement[1]} />}  label="RY" disabled={displacementradiovalue === "Displacement" ? true : false} />
              <FormControlLabel sx={{width:"30%"}} control={<Checkbox  id="Id_RZ" onChange={handleRZ}  checked={Angulardisplacement[2]}/>}  label="RZ" disabled={displacementradiovalue === "Displacement" ? true : false} />
            </Box>
          </Box>
        </RadioGroup>
      </FormControl>
    )
  }

  function ForceMoment (props){
    function handleFX(event){
      SetForce([event.target.checked, force[1], force[2],force[3]]);
      SetMoment([false,false,false,false]);
    }

    function handleFY(event){
      SetForce([ force[0],event.target.checked, force[2],force[3]]);
      SetMoment([false,false,false,false]);
    }

    function handleFZ(event){
      SetForce([ force[0], force[1],event.target.checked,force[3]]);
      SetMoment([false,false,false,false]);
    }
    function handleFYZ(event){
      SetForce([ force[0], force[1],force[2],event.target.checked]);
      SetMoment([false,false,false,false]);
    }
    
    function handleMX(event){
      SetMoment([ event.target.checked,moment[1], moment[2],moment[3]]);
      SetForce([false,false,false,false]);
    }
    function handleMY(event){
      SetMoment([ moment[0],event.target.checked, moment[2],moment[3]]);
      SetForce([false,false,false,false]);
    }

    function handleMZ(event){
      SetMoment([ moment[0], moment[1],event.target.checked,moment[3]]);
      SetForce([false,false,false,false]);
    }
    function handleMYZ(event){
      SetMoment([ moment[0], moment[1],moment[2],event.target.checked]);
      SetForce([false,false,false,false]);
    }
    const handleRadioChange = (event) => {
      SetFMRB(event.target.value);
    };

    return (
      <FormControl sx={{width:"100%"}}>
        <RadioGroup
          aria-labelledby="ForceMoment-radio-buttons-group-label"
          defaultValue="Force"
          name="ForceMoment-radio-buttons-group"
          onChange={handleRadioChange}
          value={Forceradiovalue}

        >
          <FormControlLabel value="Force" control={<Radio id="Id_F" />} label="Force" />
          <Box sx={{ml:4,  mb:1, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fx" onChange={handleFX} checked={force[0]}/>} label="Fx" disabled={Forceradiovalue !== "Force" ? true : false}/>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fy" onChange={handleFY} checked={force[1]} />} label="Fy" disabled={Forceradiovalue !== "Force" ? true : false} />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fz" onChange={handleFZ} checked={force[2]} />} label="Fz" disabled={Forceradiovalue !== "Force" ? true : false} />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Fyz" onChange={handleFYZ} checked={force[3]} />} label="Fyz" disabled={Forceradiovalue !== "Force" ? true : false} />
          </Box>
          <FormControlLabel value="Moment" control={<Radio id="Id_M" />} label="Moment" />
          <Box sx={{ml:4, width:"100%"}}>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mx" onChange={handleMX} checked={moment[0]} />} label="Mx" disabled={Forceradiovalue === "Force" ? true : false}/>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_My" onChange={handleMY} checked={moment[1]} />} label="My" disabled={Forceradiovalue === "Force" ? true : false}/>
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Mz" onChange={handleMZ} checked={moment[2]} />} label="Mz" disabled={Forceradiovalue === "Force" ? true : false} />
            <FormControlLabel sx={{width:"20%"}} control={<Checkbox id="Id_Myz" onChange={handleMYZ} checked={moment[3]} />} label="Myz" disabled={Forceradiovalue === "Force" ? true : false} />
          </Box>
        </RadioGroup>
      </FormControl>
    )
  }

  function Stress (props) {
    function handleSax(event){
      SetIS([event.target.checked, Individualstress[1], Individualstress[2],Individualstress[3],Individualstress[4]]);
      SetCS([false,false,false,false]);
    }

    function handleSsy(event){
      SetIS([ Individualstress[0],event.target.checked, Individualstress[2],Individualstress[3],Individualstress[4]]);
      SetCS([false,false,false,false]);
    }

    function handleSsz(event){
      SetIS([ Individualstress[0], Individualstress[1],event.target.checked,Individualstress[3],Individualstress[4]]);
      SetCS([false,false,false,false]);
    }
    function handleSby(event){
      SetIS([ Individualstress[0], Individualstress[1],Individualstress[2],event.target.checked,Individualstress[4]]);
      SetCS([false,false,false,false]);
    }
    
    function handleSbz(event){
      SetIS([Individualstress[0], Individualstress[1],Individualstress[2],Individualstress[3],event.target.checked]);
      SetCS([false,false,false,false]);
    }

    function handleC4(event){
      SetCS([Cstress[0], Cstress[1],Cstress[2],Cstress[3],event.target.checked]);
      SetIS([false,false,false,false]);
    }

    function handlemax(event){
      SetCS([event.target.checked, Cstress[1], Cstress[2],Cstress[3],Cstress[4]]);
      SetIS([false,false,false,false]);
    }

    function handleC1(event){
      SetCS([ Cstress[0],event.target.checked, Cstress[2],Cstress[3],Cstress[4]]);
      SetIS([false,false,false,false]);
    }

    function handleC2(event){
      SetCS([ Cstress[0], Cstress[1],event.target.checked,Cstress[3],Cstress[4]]);
      SetIS([false,false,false,false]);
    }
    function handleC3(event){
      SetCS([ Cstress[0], Cstress[1],Cstress[2],event.target.checked,Cstress[4]]);
      SetIS([false,false,false,false]);
    }
    
    const handleRadioChange = (event) => {
      SetSRB(event.target.value);
    };

    return (
    <FormControl sx={{width:"100%", height:"1vw"}}>
      <RadioGroup
        aria-labelledby="Stress-radio-buttons-group-label"
        defaultValue="Combined Stress"
        name="Stress-radio-buttons-group"
        onChange={handleRadioChange}
        value={Stressradiovalue}
      >
        <FormControlLabel value="Individual Stress" control={<Radio id="Id_Is" />} label="Individual Stress" />
        <Box sx={{ml:2, mb:1, width:"100%"}}>
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Sax" onChange={handleSax} checked={Individualstress[0]} />} label="Sax" disabled={Stressradiovalue !== "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Ssy" onChange={handleSsy} checked={Individualstress[1]}/>} label="Ssy" disabled={Stressradiovalue !== "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Ssz" onChange={handleSsz} checked={Individualstress[2]} />} label="Ssz" disabled={Stressradiovalue !== "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Sby" onChange={handleSby} checked={Individualstress[3]} />} label="Sby" disabled={Stressradiovalue !== "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Sbz"  onChange={handleSbz} checked={Individualstress[4]}/>} label="Sbz" disabled={Stressradiovalue !== "Individual Stress" ? true : false} />
        </Box>
        <FormControlLabel value="Combined Stress" control={<Radio id="Id_CS" />} label="Combined Stress" />
        <Box sx={{ml:2, width:"100%"}}>
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_Max" onChange={handlemax} checked={Cstress[0]} />} label="Maximum" disabled={Stressradiovalue === "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_C1"  onChange={handleC1} checked={Cstress[1]}/>} label="1 (-y, +z)" disabled={Stressradiovalue === "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_C2"  onChange={handleC2} checked={Cstress[2]} />} label="2 (+y, +z)" disabled={Stressradiovalue === "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_C3"  onChange={handleC3} checked={Cstress[3]} />} label="3 (+y, -z)" disabled={Stressradiovalue === "Individual Stress" ? true : false} />
          <FormControlLabel sx={{width:"32%"}} control={<Checkbox id="Id_C4"  onChange={handleC4} checked={Cstress[4]}/>} label="4 (-y, -z)" disabled={Stressradiovalue === "Individual Stress" ? true : false} />
        </Box>
      </RadioGroup>
    </FormControl>
    )
  }

  return (
    <Box sx={{ width:TabWidth, typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab {...a11yProps(0)} selected={value === "Displacement"} sx={{width:"33%"}} label="Displacement" value="Displacement" />
            <Tab {...a11yProps(1)} selected={value === "Force/Moment"} sx={{width:"33%"}} label="Force/Moment" value="Force/Moment" />
            <Tab {...a11yProps(2)} selected={value === "Stress"} sx={{width:"33%"}} label="Stress" value="Stress" />
          </Tabs>
        </Box>
        <TabPanel value="Displacement">
          <DisplacementCompo setCheckValue={handleClick} Checked={DisChecked} />
        </TabPanel>
        <TabPanel value="Force/Moment">
          <ForceMoment  />
        </TabPanel>
        <TabPanel value="Stress">
          <Stress/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}