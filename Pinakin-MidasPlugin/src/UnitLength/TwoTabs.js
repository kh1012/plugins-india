import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import T1 from './TabOne'
import T2 from './TabTwo'

import Selunt from './selectionUnit'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' ,ml:-23}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example">
          <Tab label="Co-Ordinates" {...a11yProps(0)} />
          <Tab label="Node" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:46,mt:0,font:'caption'}}  >
                           Number
                    </Typography>  
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:75,mt:-2.5,font:'caption'}}  >
                           Coordinates
                    </Typography> 

                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:5,font:'caption'}}  >
                            Start Node
                    </Typography>    
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:5,font:'caption'}}  >
                            End Node
                    </Typography> 
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:5,font:'caption'}}  >
                            Total Length of Elements
                    </Typography> 
                    <Typography id={'totelemlen1'} sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:75,mt:-1,font:'caption',position:'absolute'}}  >
                            m
                    </Typography>
                    <T1/>
      </TabPanel>
      <TabPanel value={value} index={1}>
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:7,font:'caption'}}  >
                            Start Node Number
                    </Typography>    
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:5,font:'caption'}}  >
                            End Node Number
                    </Typography> 
                    <Typography sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:0,mt:5,font:'caption'}}  >
                            Total Length of Elements
                    </Typography> 
                    <Typography id={'totelemlen2'}sx={{ color:"grey",  fontFamily:"serif" ,component:"div",  ml:75,mt:-1,font:'caption',position:'absolute'}}  >
                            m
                    </Typography> 
                    <T2/>
      </TabPanel>


     
    </Box>
  );
}