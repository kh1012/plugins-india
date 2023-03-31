import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import { FormLabel } from "@mui/material";
import CheckboxesGroup from "./chkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };



export default function ColorCheckboxes(props) {
  
  return (
    
      // <Box>
      
      
      // </Box>
    
    <Box sx={{  ml:40,mt:0,font:'caption'}}>
      <Box marginLeft={6}>
        <FormLabel disabled={props.isDisabledSC}>FX </FormLabel>
        <FormLabel disabled={props.isDisabledSC}sx={{ ml: 2 }}> FY </FormLabel>
        <FormLabel disabled={props.isDisabledSC}sx={{ ml: 2 }}> FZ </FormLabel>
        <FormLabel disabled={props.isDisabledSC}sx={{ ml: 2 }}> MX </FormLabel>
        <FormLabel disabled={props.isDisabledSC}sx={{ ml: 2 }}> MY </FormLabel>
        <FormLabel disabled={props.isDisabledSC}sx={{ ml: 2 }}> MZ </FormLabel>

        
      </Box>

      <div>
        <FormLabel>Start</FormLabel>
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
      </div>
      <div>
        <FormLabel>End </FormLabel>
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
        <Checkbox disabled={props.isDisabledSC}{...label} color="default" />
      </div>
    </Box>
  );
}
