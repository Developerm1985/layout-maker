import React, { useCallback, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import "../components/style.scss";
import Tyre from "../images/tyre.png";
import { BsUpload } from "react-icons/bs";
import RadioBox from "./RadioBox/index";
import SelectBox from "./SelectBox/index";
import MultiSelect from "./MultiSelect/index";
import DatePicker from "./DatePicker/index";
import TextBox from "./TextBox/index";
import ToggleBox from "./ToggleBox/index";
import BlockElement from "./BlockElement/BlockElement";
import { Grid } from "../../node_modules/@mui/material/index";
import Header from "./Header/index";
import update from 'immutability-helper'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function Home() {
  const itemList = [
    { value: "DropdownBox", label: "Dropdown Box" },
    { value: "MulticheckDropDownBox", label: "Multicheck DropDown Box" },
    { value: "DatePickerBox", label: "Date Picker Box" },
  ];

  const [image, setImage] = useState(Tyre);
  const [data, setData] = useState([]);

  const [isResizing, setIsResizing] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  useEffect(() => {
    if (isResizing) setIsDraggingEnabled(false);
    else setIsDraggingEnabled(true);
  }, [isResizing, isDraggingEnabled]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  const DragableRender = useCallback(() => {
    return (
      <div className="drag-list-wrapper">
        <DndProvider backend={HTML5Backend}>
          {data?.map((item, index) => {
            const _item = item.value
            switch (true) {
              case _item?.value === "TextBox":
                return <TextBox />;

              case _item?.value === "DropdownBox":
                return (
                  <BlockElement setData={setData} index={index} moveCard={moveCard} setIsResizing={setIsResizing} data={data} id={item.id} width={item.width}>
                    <SelectBox options={itemList} />
                  </BlockElement>
                );
              case _item?.value === "MulticheckDropDownBox":
                return (
                  <BlockElement setData={setData} index={index} moveCard={moveCard} setIsResizing={setIsResizing} data={data} id={item.id} width={item.width}>
                    <MultiSelect options={itemList} />
                  </BlockElement>
                );
              case _item?.value === "DatePickerBox":
                return (
                  <BlockElement setData={setData} index={index} moveCard={moveCard} setIsResizing={setIsResizing} data={data} id={item.id} width={item.width}>
                    <DatePicker />
                  </BlockElement>
                );
              case _item?.value === "ToggleBox":
                return (
                  <BlockElement setData={setData} index={index} moveCard={moveCard} setIsResizing={setIsResizing} data={data} id={item.id} width={item.width}>
                    <ToggleBox />
                  </BlockElement>
                );
              case Array.isArray(_item):
                return (
                  <BlockElement setData={setData} index={index} moveCard={moveCard} setIsResizing={setIsResizing} data={data} id={item.id} width={item.width}>
                    {_item.map((ele) => {
                      if (ele.value === "TextBox") {
                        return <TextBox />;
                      } else if (ele.value === "ToggleBox") {
                        return <ToggleBox />;
                      } else if (ele.value === "RadioBox") {
                        return (
                          <RadioBox
                            data={[
                              { value: "DropdownBox", label: "Dropdown Box" },
                            ]}
                          />
                        );
                      }
                    })}
                  </BlockElement>
                );
              default:
            }
          })}
        </DndProvider>
      </div>
    );
  }, [data]);

  return (
    <>
      <Header setData={setData} setIsResizing={setIsResizing} data={data} />
      <Container className="site-content">
        <Grid container className="content-wrapper" spacing={1}>
          <Grid item md={3} className="custome-center">
            <div className="image-wrapper">
              <img src={image} alt="car" />
            </div>
            <div className="image-wrapper-cta">
              <div className="block-elements-content-heading">
                <div className="uploadfile">
                  <span>
                    Upload <BsUpload />
                  </span>
                  <input
                    type="file"
                    onChange={(val) =>
                      setImage(URL.createObjectURL(val.target.files[0]))
                    }
                  />
                </div>
              </div>
            </div>
          </Grid>
          <DragableRender />
        </Grid>
      </Container>
    </>
  );
}

export default React.memo(Home);
