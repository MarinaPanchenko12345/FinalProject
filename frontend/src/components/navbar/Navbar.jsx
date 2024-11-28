import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slices/TokenSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { useCard } from "../../contexts/CardContext";
import { showAlert } from "../../helpers/Alert";


export default function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.token.role);
  const { loggedUser } = useUser();
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("Account");
  const { cartItemsLength } = useCart();
  const { favoriteCount } = useCard();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      setUserImage(
        loggedUser.image?.url ||
          "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
      );
      setUserName(
        `${loggedUser.name?.first || "Account"} ${loggedUser.name?.last || ""}`.trim()
      );
    }
  }, [loggedUser]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9898/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        dispatch(logout());
        showAlert("success", "Thanks for visiting. Hope to see you back soon!");
        navigate("/");
      } else {
        showAlert("error", "Error exiting. Try again");
      }
    } catch (error) {
      showAlert("error", "Network error. Try again.");
    }
  };

  return (
    <Box>
      <AppBar
        position='static'
        elevation={0}
        sx={{
          height: "50px",
          justifyContent: "center",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{ color: theme.palette.icons.main, p: 0 }}
              component={Link}
              to='/'
            >
              <img src='/logo1.png' alt='Logo' style={{ width: "60px" }} />
            </IconButton>
            <Typography
              component={Link}
              to='/'
              sx={{
                color: theme.palette.tertiary.main,
                fontFamily: "Audiowide, sans-serif",
                fontSize: "1.2rem",
                textDecoration: "none",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              DigitalGalaxy
            </Typography>
          </Box>
          <Box sx={{ display: "flex", ml: 2 }}>
            {(role === "admin" ||
              role === "business" ||
              role === "regular") && [
              <Tooltip
                key='account'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>
                    {userName}
                  </Typography>
                }
              >
                <Avatar
                  src={userImage}
                  alt='User Avatar'
                  sx={{ width: "2rem", height: "2rem" }}
                />
              </Tooltip>,
              <Tooltip
                key='favorite'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>Favorite</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  component={Link}
                  to='/favorite'
                >
                  <Badge
                    badgeContent={favoriteCount > 0 ? favoriteCount : 0}
                    color='error'
                    showZero
                  >
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Tooltip>,
              <Tooltip
                key='cart'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>Cart</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  component={Link}
                  to='/cart'
                >
                  <Badge
                    badgeContent={cartItemsLength > 0 ? cartItemsLength : 0}
                    color='error'
                    showZero
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>,
              <Tooltip
                key='dashboard'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>Dashboard</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  component={Link}
                  to='/dashboard'
                >
                  <DashboardIcon />
                </IconButton>
              </Tooltip>,
              <Tooltip
                key='logout'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}> Logout</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>,
            ]}
            {role === "guest" && [
              <Tooltip
                key='login'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>Login</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  component={Link}
                  to='/login'
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>,
              <Tooltip
                key='sign-up'
                title={
                  <Typography sx={{ fontSize: "0.7rem" }}>SignUp</Typography>
                }
              >
                <IconButton
                  sx={{ color: theme.palette.icons.main }}
                  component={Link}
                  to='/sign-up'
                >
                  <AppRegistrationIcon />
                </IconButton>
              </Tooltip>,
            ]}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
