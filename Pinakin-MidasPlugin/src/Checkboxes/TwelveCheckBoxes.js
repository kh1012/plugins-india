import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import { FormLabel } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ColorCheckboxes() {
  return (
    <Box sx={{  ml:40,mt:0,font:'caption'}}>
      <Box marginLeft={6}>
        <FormLabel>FX </FormLabel>
        <FormLabel sx={{ ml: 2 }}> FY </FormLabel>
        <FormLabel sx={{ ml: 2 }}> FZ </FormLabel>
        <FormLabel sx={{ ml: 2 }}> MX </FormLabel>
        <FormLabel sx={{ ml: 2 }}> MY </FormLabel>
        <FormLabel sx={{ ml: 2 }}> MZ </FormLabel>
      </Box>

      <div>
        <FormLabel>Start</FormLabel>
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
        <Checkbox {...label} color="default" />
      </div>
      <div>
        <FormLabel>End </FormLabel>
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
