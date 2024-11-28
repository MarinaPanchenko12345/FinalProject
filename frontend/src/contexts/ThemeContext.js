import React, { createContext, useState, useMemo, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

export const ThemeContext = createContext();

export default function Theme({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#021645";
  }, [darkMode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: darkMode ? "#f5f5f5" : "#010927",
          },
          secondary: {
            main: darkMode ? "#ffffff" : "#021645",
          },
          tertiary: {
            main: darkMode ? "#021645" : "#e1a603",
          },
          icons: {
            main: darkMode ? "#7c7c7c" : "#e1a603",
          },
          text: {
            primary: darkMode ? "#7c7c7c" : "#1ebcff",
          },
          rating: {
            main: darkMode ? "#ffd700" : "#e1a603",
          },
        },
        components: {
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: darkMode ? "#7c7c7c" : "#1ebcff",
                "&.Mui-focused": {
                  color: darkMode ? "#021645" : "#1ebcff",
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#7c7c7c" : "#1ebcff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#021645" : "#1ebcff",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#021645" : "#1ebcff",
                },
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                color: darkMode ? "#7c7c7c" : "#010927",
                "&.Mui-checked": {
                  color: darkMode ? "#021645" : "#1ebcff",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              select: {
                backgroundColor: darkMode ? "#ffffff" : "#021645",
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? "#ffffff" : "#010927",
                color: darkMode ? "#7c7c7c" : "#1ebcff",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const customStyles = useMemo(
    () => ({
      container: {
        backgroundColor: darkMode ? "#2c3e50" : "#010927",
        color: darkMode ? "#ffffff" : "#1ebcff",
      },
      text: {
        color: darkMode ? "#ffffff" : "#1ebcff",
      },
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, customStyles }}>
      <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
