import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BsEye, BsPencil } from "react-icons/bs";

function ToggleBox() {
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          <BsEye />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <BsPencil />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default ToggleBox;
