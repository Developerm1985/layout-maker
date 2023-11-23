import React from "react";
import {
  FormControl,
  OutlinedInput,
} from "../../../node_modules/@mui/material/index";

function TextBox() {
  return (
    <div className="block-elements-content-input">
      <FormControl variant="standard">
        <OutlinedInput />
      </FormControl>
    </div>
  );
}

export default TextBox;
