import React, { createContext, useState } from "react";

export const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSortCategory = (category) => setSelectedCategory(category);
  const handleSortColor = (color) => setSelectedColor(color);

  return (
    <SortContext.Provider
      value={{
        selectedCategory,
        selectedColor,
        handleSortCategory,
        handleSortColor,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
