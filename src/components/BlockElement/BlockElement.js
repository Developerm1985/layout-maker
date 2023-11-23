import React, { useState, useRef } from "react";
import { Resizable } from "re-resizable";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDrag, useDrop } from 'react-dnd'
import "./blockelement.scss";

const BlockElement = (props) => {
  const [height, setHeight] = useState(800);
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };
  const singleInputStyle={
    width: "100%",
    padding: "0 10px 10px 10px"
  }
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: props.id, index : props.index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <Resizable
      defaultSize={{
        width: props.width,
      }}
      onResizeStop={(e, direction, ref, d) => {
        props.setData([...props.data.map(items => {
          if(props.id == items.id) {
            return {
              ...items,
              width: props.width + d.width
            }
          }
          return items
        })])
        setHeight(height + d.height);
      }}
    >
      <div className="block-elements"  ref={ref} style={{ opacity }} data-handler-id={handlerId}>
        <div
          className={` block-elements-content ${
            Array.isArray(props.children) && props?.children?.length > 1 ? "flex" : ""
          }`}
        >
          {Array.isArray(props.children) ? (
            props?.children?.map((item, index) => {
              return (
                <>
                  <div className="drag-drop">
                    <RxDragHandleDots2 />
                  </div>
                  <div key={index} style={props?.children?.length == 1 ? singleInputStyle : {}} className={`${props?.children?.length > 1 ? "block-elements-content-layout" : "block-elements-content-input "}`}>
                    <div className="block-elements-content-heading">
                      <p className="title">type</p>
                    </div>
                    <div className="form-group">{item}</div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div className="drag-drop">
                <RxDragHandleDots2 />
              </div>
              <div className="block-elements-content-heading">
                <p className="title">type</p>
              </div>
              <div className="block-elements-content-input" style={singleInputStyle}>
                {props?.children}
              </div>
            </>
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default React.memo(BlockElement);
