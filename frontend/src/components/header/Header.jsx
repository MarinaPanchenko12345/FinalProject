import React from "react";
import "./Header.css";
import WatchIcon from "@mui/icons-material/Watch";
import ComputerIcon from "@mui/icons-material/Computer";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import DevicesIcon from "@mui/icons-material/Devices";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HeaderInfo from "./HeaderInfo";

const Header = () => {
  return (
    <div className='header_container'>
      <div className='floating_icons'>
        <WatchIcon fontSize='small' className='icon icon1' />
        <DevicesIcon fontSize='large' className='icon icon2' />
        <SmartToyIcon fontSize='small' className='icon icon3' />
        <ComputerIcon fontSize='large' className='icon icon4' />
        <PhoneIphoneIcon fontSize='small' className='icon icon5' />
        <HeadphonesIcon fontSize='large' className='icon icon6' />
        <ComputerIcon fontSize='small' className='icon icon7' />
        <SmartToyIcon fontSize='large' className='icon icon8' />
        <PhoneIphoneIcon fontSize='small' className='icon icon9' />
        <WatchIcon fontSize='large' className='icon icon10' />
        <DevicesIcon fontSize='small' className='icon icon11' />
        <HeadphonesIcon fontSize='large' className='icon icon12' />
      </div>
      <HeaderInfo />
    </div>
  );
};

export default Header;
