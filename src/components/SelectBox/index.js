import React from "react";
import Select from "react-select";

function SelectBox(props) {
  return (
    <>
      <Select
        isMulti={props?.isMulti}
        options={props?.options}
        value={props?.value}
        onChange={(value) => props.onSelected(value)}
      />
    </>
  );
}

export default SelectBox;
