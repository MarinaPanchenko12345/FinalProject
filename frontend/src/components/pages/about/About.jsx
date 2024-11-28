import React from "react";
import "./About.css";
import Groups3Icon from "@mui/icons-material/Groups3";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useTheme } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  };
  return (
    <div className='div_about'>
      <h1
        style={{
          color: theme.palette.text.primary,
        }}
      >
        About Us
      </h1>
      <div className='container_about'>
        <div className='container_about_one'>
          <div className='about_store' style={style}>
            <div
              className='about_header'
              style={{ color: theme.palette.tertiary.main }}
            >
              <img src='/logo1.png' alt='logo' className='logo_about' />
              <h2> DigitalGalaxy</h2>
            </div>
            <div className='about_text'>
              <p>
                Welcome to DigitalGalaxy - place where you can find the best
                electronic products for your home, work, and leisure. We offer a
                wide range of products, including:
              </p>
              <ul>
                <li>Smartphones</li>
                <li>Computers</li>
                <li>Laptops</li>
                <li>Monitors</li>
                <li>Keyboards</li>
                <li>Computer Mice</li>
                <li>Headphones</li>
                <li>Smartwatches</li>
              </ul>
              <p>
                We strive to make your shopping experience simple and
                convenient, whether you are a guest or a registered user.
              </p>
            </div>
          </div>
          <div className='about_auth' style={style}>
            <div
              className='about_header'
              style={{ color: theme.palette.tertiary.main }}
            >
              <HowToRegIcon sx={{ fontSize: 60 }} className='logo_about' />
              <h2> Authentication and Password Features</h2>
            </div>
            <div className='about_text'>
              <h3>Registration and Login</h3>
              <p>
                You can quickly register or log in through the links on our
                website. We also provide an option to register using Google for
                added convenience.
              </p>

              <h3>Account Protection</h3>
              <p>
                If the password is entered incorrectly 3 times, your account
                will be locked for 24 hours to ensure security.
              </p>

              <h3>Password Reset</h3>
              <p>
                In case you lose your password, we will send a link to your
                registered email for recovery.
              </p>

              <h3>Session Expiration</h3>
              <p>
                For your security, tokens are valid for 4 hours. After this
                period, you will be automatically logged out and need to log in
                again.
              </p>
            </div>
          </div>
        </div>
        <div className='container_about_two'>
          <div className='about_users' style={style}>
            <div
              className='about_header'
              style={{ color: theme.palette.tertiary.main }}
            >
              <Groups3Icon sx={{ fontSize: 60 }} className='logo_about' />
              <h2> User Types</h2>
            </div>
            <div className='about_text'>
              <p>
                DigitalGalaxy offers four categories of users, each with unique
                features:
              </p>

              <h3>Guests</h3>
              <ul>
                <li>Can browse products and like them.</li>
                <li>Do not have access to a personal dashboard.</li>
              </ul>

              <h3>All Registered Users</h3>
              <ul>
                <li>
                  Have access to a personal dashboard with features to manage.
                </li>
                <li>
                  Have access to a Cart for managing items they wish to
                  purchase.
                </li>
                <li>
                  Can use the Favorite page to save and revisit their favorite
                  products.
                </li>
              </ul>

              <h3>Business Users</h3>
              <ul>
                <li>
                  Have access to a personal dashboard to create, edit, delete and restore their products.
                </li>
                <li>Can sell their own products.</li>
              </ul>

              <h3>Administrator</h3>
              <ul>
                <li>
                  Have access to an advanced dashboard for managing their
                  products and users.
                </li>
                <li>Can delete and restore user accounts if necessary.</li>
              </ul>
            </div>
          </div>
          <div className='about_functions' style={style}>
            <div
              className='about_header'
              style={{ color: theme.palette.tertiary.main }}
            >
              <AutoFixHighIcon sx={{ fontSize: 60 }} className='logo_about' />
              <h2>Convenient Features for Users</h2>
            </div>
            <div className='about_text'>
              <h3>Personal Dashboard</h3>
              <p>
                Registered users, business users, and administrators can manage
                their profiles, view the orders they’ve made, and handle their
                products through a personalized dashboard.
              </p>

              <h3>Upgrade to Business Status</h3>
              <p>
                Registered users can upgrade their profile to "Business" to sell
                their products.
              </p>

              <h3>Low Stock Notifications</h3>
              <p>
                Business users receive notifications if their product stock
                becomes critically low.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
