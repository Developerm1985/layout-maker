import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SelectBox from "../../components/SelectBox/index";
import { Button } from "../../../node_modules/@mui/material/index";
import "./header.scss";

const Header = ({ data, setData }) => {
  const initialForm = {
    types: { label: "Object", value: "object" },
    item: "",
  };
  const types = [
    { value: "object", label: "Object" },
    { value: "items", label: "Items" },
  ];

  const objectList = [
    { value: "TextBox", label: "Text Box" },
    { value: "RadioBox", label: "Radio Box" },
    { value: "ToggleBox", label: "Toggle Box" },
  ];

  const itemList = [
    { value: "DropdownBox", label: "Dropdown Box" },
    { value: "MulticheckDropDownBox", label: "Multicheck DropDown Box" },
    { value: "DatePickerBox", label: "Date Picker Box" },
  ];

  const [formItem, setFormItem] = useState(initialForm);

  const handleSelect = (value, label) => {
    label === "types"
      ? setFormItem({ ...formItem, item: "", [label]: value })
      : setFormItem({ ...formItem, [label]: value });
  };

  const handleAdd = () => {
    setFormItem({ ...formItem, item: "" });
    setData([
      ...data,
      {
        id: data[data.length - 1]?.id ? data[data.length - 1]?.id + 1 : Math.floor(Math.random() * 100000),
        value: formItem.item,
        width: 900
      }
    ]);
  };
  return (
    <>
      <Grid container className="site-header" spacing={1}>
        <Grid item xs={12}>
          <div className="site-header-right">
            <div className="form-group">
              <label>types</label>
              <SelectBox
                options={types}
                value={formItem.types}
                onSelected={(value) => handleSelect(value, "types")}
              />
            </div>
            <div className="form-group">
              <label>Items</label>
              <SelectBox
                options={
                  formItem?.types?.value === "object" ? objectList : itemList
                }
                isMulti={formItem?.types?.value === "object"}
                value={formItem.item}
                onSelected={(value) => handleSelect(value, "item")}
              />
            </div>
            <div className="add-button">
              <Button onClick={() => handleAdd()} >Add</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
