import React, { useContext } from "react";
import { SortContext } from "../../../contexts/SortContext";
import "./SortCategory.css";
import categories from "../../../models/CategoryModel";

const SortCategory = () => {
  const { selectedCategory, handleSortCategory } = useContext(SortContext);

  const onSelectCategory = (category) => {
    handleSortCategory(category);
  };

  return (
    <div className='category_div'>
      {categories.map((category) => (
        <div
          key={category.id}
          className='category'
          onClick={() => onSelectCategory(category.id)}
        >
          <div
            className={`category_image_wrapper ${
              selectedCategory === category.id ? "selected" : ""
            }`}
          >
            <img
              src={category.imgSrc}
              alt={category.label}
              loading="lazy"
              className='category_image'
            />
          </div>
          <span>{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SortCategory;
