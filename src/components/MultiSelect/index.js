import React from "react";
import Select from "react-select";

function MultiSelect(props) {
  return (
    <>
      <Select isMulti options={props?.options} />
    </>
  );
}

export default MultiSelect;
