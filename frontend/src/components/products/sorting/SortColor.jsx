import React, { useContext, useState } from "react";
import { SortContext } from "../../../contexts/SortContext";
import "./SortColor.css";
import colors from "../../../models/ColorModel";

const SortColor = () => {
  const { handleSortColor } = useContext(SortContext);
  const [selectedColor, setSelectedColor] = useState("");

  const onSelectColor = (color) => {
    setSelectedColor(color);
    handleSortColor(color);
  };

  return (
    <div className='color_div'>
      {colors.map((color) => (
        <div
          key={color.id}
          className='color'
          onClick={() => onSelectColor(color.id)}
        >
          {color.imgSrc ? (
            <div className='color_image_wrapper'>
              <img
                src={color.imgSrc}
                alt={color.label}
                loading='lazy'
                className={`color-circle ${selectedColor === color.id ? "selected" : ""}`}
              />
            </div>
          ) : (
            <div
              className={`color-circle ${color.colorClass} ${
                selectedColor === color.id ? "selected" : ""
              }`}
            ></div>
          )}
          <span>{color.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SortColor;
