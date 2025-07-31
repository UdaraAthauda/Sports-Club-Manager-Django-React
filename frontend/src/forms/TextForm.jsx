import * as React from "react";
import TextField from "@mui/material/TextField";

export default function TextForm({ label, value, name, onChange, onBlur }) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      sx={{ width: "100%" }}
    />
  );
}
