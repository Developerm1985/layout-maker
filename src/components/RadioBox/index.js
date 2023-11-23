import React from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import PropTypes from "prop-types";

function RadioBox(props) {

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {props?.data?.map((item) => {
            return (
              <FormControlLabel
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
}

RadioBox.propTypes = {
  data: PropTypes.array,
};

export default RadioBox;
