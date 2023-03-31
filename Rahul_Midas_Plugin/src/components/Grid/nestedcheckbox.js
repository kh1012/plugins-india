import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";

const label = { inputProps: { "aria-label": "Checkbox demo" } };



export default function Checkboxes(props) {
console.log("sdfhhjkdsf:{0}",props.isDisabled3)

  return (
    <Box sx={{ marginLeft: 30, marginTop: 0 }}>
      <Box marginLeft={6}>
        <FormLabel disabled={props.isDisabled3}> FX </FormLabel>
        <FormLabel disabled={props.isDisabled3} sx={{ ml: 2 }}> FY </FormLabel>
        <FormLabel disabled={props.isDisabled3} sx={{ ml: 2 }}> FZ </FormLabel>
        <FormLabel disabled={props.isDisabled3} sx={{ ml: 2 }}> MX </FormLabel>
        <FormLabel disabled={props.isDisabled3} sx={{ ml: 2 }}> MY </FormLabel>
        <FormLabel disabled={props.isDisabled3} sx={{ ml: 2 }}> MZ </FormLabel>
      </Box>
      <div>
        <FormLabel disabled={props.isDisabled3} > Start</FormLabel>
        <Checkbox  disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox disabled={props.isDisabled3} {...label} color="default" />
      </div>
      <div>
        <FormLabel disabled={props.isDisabled3}> End </FormLabel>
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
      </div>
    </Box>
  );
}
