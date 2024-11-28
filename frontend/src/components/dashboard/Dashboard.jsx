import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Profile from "../users/Profile";
import MyCards from "../products/UserCards";
import Orders from "../orders/Orders";
import ViewUser from "../users/ViewUser";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import StyleIcon from "@mui/icons-material/Style";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useSelector } from "react-redux";
import AllUsers from "../users/AllUsers";
import { ThemeContext } from "../../contexts/ThemeContext";
import Overview from "./Overview";
import DeletedUsers from "../users/DeletedUsers";
import DeletedCards from '../products/DeletedCards';

function Dashboard() {
  const role = useSelector((state) => state.token.role);
  const [activeComponent, setActiveComponent] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { customStyles } = useContext(ThemeContext);

  const handleLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <Overview />;
      case "Profile":
        return <Profile />;
      case "All Users":
        return (
          <AllUsers
            setActiveComponent={setActiveComponent}
            setSelectedUserId={setSelectedUserId}
          />
        );
      case "ViewUser":
        return (
          <ViewUser
            userId={selectedUserId}
            setActiveComponent={setActiveComponent}
          />
        );
      case "My Cards":
        return <MyCards />;
      case "My Orders":
        return <Orders />;

      case "Deleted Users":
        return <DeletedUsers />;

      case "Deleted Cards":
        return <DeletedCards/>;

      default:
        return <Overview />;
    }
  };

  return (
    <div className='dashboard'>
      <div className='sidebar' style={customStyles.container}>
        <h2>
          <Link
            to='/profile'
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("Overview");
            }}
            style={customStyles.text}
          >
            <DashboardIcon style={{ marginRight: "8px" }} /> Dashboard
          </Link>
        </h2>
        <div className='sidebar_links'>
          {(role === "admin" || role === "business" || role === "regular") && (
            <Link
              to='/profile'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("Profile");
              }}
              style={customStyles.text}
            >
              <AccountCircleSharpIcon style={{ marginRight: "8px" }} /> Profile
            </Link>
          )}
          {role === "admin" && (
            <Link
              to='/all-users'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("All Users");
              }}
              style={customStyles.text}
            >
              <GroupsIcon style={{ marginRight: "8px" }} /> All Users
            </Link>
          )}

          {(role === "admin" || role === "business") && (
            <Link
              to='/my-cards'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("My Cards");
              }}
              style={customStyles.text}
            >
              <StyleIcon style={{ marginRight: "8px" }} /> My Products
            </Link>
          )}
          {(role === "admin" || role === "business" || role === "regular") && (
            <Link
              to='/orders'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("My Orders");
              }}
              style={customStyles.text}
            >
              <CreditScoreRoundedIcon style={{ marginRight: "8px" }} /> My
              Orders
            </Link>
          )}
          <hr />
          {role === "admin" && (
            <Link
              to='/deleted-users'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("Deleted Users");
              }}
              style={customStyles.text}
            >
              <PersonRemoveIcon style={{ marginRight: "8px" }} /> Deleted Users
            </Link>
          )}
          {(role === "admin" || role === "business") && (
            <Link
              to='/deleted-cards'
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("Deleted Cards");
              }}
              style={customStyles.text}
            >
              <DeleteSweepIcon style={{ marginRight: "8px" }} /> Deleted
              Products
            </Link>
          )}
        </div>
      </div>
      <div className='main-content'>{renderActiveComponent()}</div>
    </div>
  );
}

export default Dashboard;
