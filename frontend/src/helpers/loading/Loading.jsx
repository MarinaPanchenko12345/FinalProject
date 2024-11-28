import React, { useState, useEffect } from "react";
import "./Loading.css";
import { useTheme } from "@mui/material/styles";

const Loading = ({ isLoading }) => {
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadTimePassed(true); 
    }, 1000);
    return () => clearTimeout(timer); 
  }, []);

  if (!isLoading && minLoadTimePassed) {
    return null;
  }

  return (
    <div
      className='load_container'
    >
      <div
        className='lds-default'
        style={{
          color: theme.palette.text.primary,
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
