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
        <Checkbox id="SFX" disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox id="SFY" disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox id="SFZ" disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox id="SMX" disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox id="SMY" disabled={props.isDisabled3} {...label} color="default" />
        <Checkbox id="SMZ" disabled={props.isDisabled3} {...label} color="default" />
      <div>
      </div>
        <FormLabel disabled={props.isDisabled3}> End </FormLabel>
        <Checkbox id="EFX" {...label} color="default" />
        <Checkbox id="EFY" {...label} color="default" />
        <Checkbox id="EFZ" {...label} color="default" />
        <Checkbox id="EMX" {...label} color="default" />
        <Checkbox id="EMY" {...label} color="default" />
        <Checkbox id="EMZ" {...label} color="default" />
      </div>
    </Box>
  );
}
