import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Label from "@mui/material/FormLabel"
import UnitDropDown from './firstselectedcomponent'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import { BorderClear } from "@mui/icons-material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 850 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"

        >
          <Tab label="Coordinate" {...a11yProps(0)} />
          <Tab label="Node" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel sx={{ height: 500 }} value={value} index={0} dir={theme.direction}>
          <Label sx={{ marginLeft: 55, justifyItems: "flex-end" }}>Number</Label>
          <Label sx={{ marginLeft: 15 }}> Coordinate</Label>
          <Box height={200} sx={{ marginLeft: -65, justifyItems: "flex-end" }} >
            <Label sx={{ marginTop: 3, position: "absolute" }}>Start Node</Label>
            <TextField
              sx={{ width: { sm: 100, marginLeft: 350, marginTop: 10, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Coordinate_Start_Number"
              variant="standard"
            />
            <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 10, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Coordinate_Start_Coordinate"
              variant="standard"
            />
            {/**/}
            <Label sx={{ marginTop: 10, position: "absolute" }}>End Node</Label>
            <TextField
              sx={{ width: { sm: 100, marginLeft: 350, marginTop: 65, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Coordinate_End_Number"
              variant="standard"
            />
            <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 65, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Coordinate_End_Coordinate"
              variant="standard"
            />
            {/**/}
            <Label sx={{ marginTop: 17, position: "absolute" }}>Total Length of elements</Label>
            <TextField
              sx={{ width: { sm: 100, marginLeft: 350, marginTop: 130, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Coordinate_Length_Of_Elements"
              variant="standard"
            />
            {/* <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 65, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="outlined-basic"
              variant="standard"
            /> */}
            <Label sx={{ paddingLeft: 57, marginTop: 17, position: "absolute" }}>m</Label>
          </Box>


        </TabPanel>
        <TabPanel sx={{ height: 500 }} value={value} index={1} dir={theme.direction}>
          <Box height={300} sx={{ marginLeft: -80 }} >
            <Label sx={{ marginTop: 3, position: "absolute" }} >Start Node Number</Label>

            <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 10, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Node_Start_Node"
              variant="standard"
            />
            {/**/}
            <Label sx={{ marginTop: 10, position: "absolute" }}>End Node Number</Label>

            <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 65, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Node_End_Node"
              variant="standard"
            />
            {/**/}
            <Label sx={{ marginTop: 17, position: "absolute" }}>Total Length of elements</Label>

            <TextField
              sx={{ width: { sm: 100, marginLeft: 500, marginTop: 125, position: "absolute" }, "& .MuiInputBase-root": { height: 35 } }}
              id="Node_Length_Of_Elements"
              variant="standard"
            />
            <Label sx={{ paddingLeft: 77, marginTop: 17, position: "absolute" }}>m</Label>
          </Box>

        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
