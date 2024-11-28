import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Box, Tooltip, Typography, AppBar } from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import StyleIcon from "@mui/icons-material/Style";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchBox from "../../helpers/SearchBox";

export default function NavbarCenter({
  darkMode,
  setDarkMode,
  viewMode,
  setViewMode,
  searchText,
  setSearchText,
}) {
  const theme = useTheme();

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "cards" ? "table" : "cards"));
  };

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{ height: "50px", justifyContent: "center" }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={
            <Typography sx={{ fontSize: "0.7rem" }}>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
          }
        >
          <IconButton
            sx={{ color: theme.palette.icons.main }}
            onClick={handleToggle}
          >
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography sx={{ fontSize: "0.7rem" }}>
              {viewMode === "cards" ? "View Table" : "View Cards"}
            </Typography>
          }
        >
          <IconButton
            sx={{ color: theme.palette.icons.main }}
            onClick={toggleViewMode}
          >
            {viewMode === "cards" ? <TableViewIcon /> : <StyleIcon />}
          </IconButton>
        </Tooltip>
        <SearchBox searchText={searchText} setSearchText={setSearchText} />
      </Box>
    </AppBar>
  );
}
