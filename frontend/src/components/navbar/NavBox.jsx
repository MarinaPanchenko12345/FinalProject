import React, { useContext } from "react";
import NavbarCenter from "./NavbarCenter";
import Navbar from "./Navbar";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ModeContext } from "../../contexts/ModeContext";
import { SearchContext } from "../../contexts/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBox = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { viewMode, setViewMode } = useContext(ModeContext);
  const { searchText, setSearchText } = useContext(SearchContext);

  return (
    <div style={{ width: "100vw", position: "fixed", top: "0", zIndex: "2" }}>
      <Navbar />
      <NavbarCenter
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ToastContainer />
    </div>
  );
};

export default NavBox;
