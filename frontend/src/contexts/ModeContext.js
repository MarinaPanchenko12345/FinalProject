import React, { createContext, useState } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState("cards");

  return (
    <ModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ModeContext.Provider>
  );
};
