import React from "react";
import { Link } from "react-router-dom";
import { GitHub, LinkedIn } from "@mui/icons-material";
import "./Footer.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useTheme } from "@mui/material/styles";

function Footer1() {
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  };
  return (
    <div className='footer' style={style}>
      <div className='footer_container'>
        <div className='footer_brand'>
          <Link to='/'>
            <img src='/logo1.png' alt='logo' className='logo' />
            <span
              className='brand_name'
              style={{
                color: theme.palette.tertiary.main,
              }}
            >
              DigitalGalaxy
            </span>
          </Link>
        </div>
        <div className='footer_links'>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact As</h3>
            <ul>
              <li>Tel : +972-054-675-3533</li>
              <li>Email : marishka100281@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3>Legal Information</h3>
            <ul>
              <a
                href='https://www.freeprivacypolicy.com/live/011a593b-10cd-403d-b6b9-04c1eb92549a'
                target='_blank'
                rel='noopener noreferrer'
              >
                Privacy Policy
              </a>
            </ul>
          </div>
        </div>
      </div>
      <hr />

      <div className='footer-bottom'>
        <p>© {new Date().getFullYear()} DigitalGalaxy</p>
        <div className='footer-social-icons'>
          <Link
            to='https://www.facebook.com/profile.php?id=100009959705302'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookOutlinedIcon />
          </Link>
          <Link
            to='https://github.com/MarinaPanchenko12345'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHub />
          </Link>
          <Link
            to='https://www.linkedin.com/in/marild'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedIn />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer1;
