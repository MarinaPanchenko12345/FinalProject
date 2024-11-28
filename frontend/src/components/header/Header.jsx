import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();
  const style = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  };
  return (
    <div className='header_container' style={style}>
      <img
        src='./header.webp'
        alt='Header Background'
        loading='lazy'
        className='header_image'
      />
      <div className='header_div'>
        <div className='header_information'>
          <h1>Digital Galaxy</h1>
          <p>
            Welcome to DigitalGalaxy – your destination for cutting-edge
            technology! Explore our wide range of devices, from smartphones and
            laptops to smartwatches and headphones. Discover the world of
            electronics with us!
          </p>
        </div>

        <div className='header_about'>
          <p>Click to learn more about our website and its features!</p>
          <Link to='/about'>
            <button>About Us</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
