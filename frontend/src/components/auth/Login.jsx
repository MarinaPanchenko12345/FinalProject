import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/TokenSlice";
import { Link } from "react-router-dom";
import { loginValidation } from "../../validation/authJoi";
import { showAlert, showLoginErrorAlert } from "../../helpers/Alert";
import useValidation from "../../hooks/useValidation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(loginValidation);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    resetErrorMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9898/auth/login",
        formData
      );
      const token = await response.data;
      if (!token) {
        return;
      }
      dispatch(login(token));
      showAlert("success", "You have successfully logged in!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        if (
          error.response.data ===
          "Account is locked for 24 hours. Try again later."
        ) {
          showAlert(
            "error",
            "Account is locked for 24 hours. Try again later."
          );
        } else {
          showLoginErrorAlert(navigate);
        }
      } else {
        showAlert("error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:9898/auth/google";
  };

  const toggleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  const EndAdorment = () => {
    return (
      <InputAdornment position='end'>
        <IconButton onClick={toggleVisibility}>
          {visibility ? (
            <VisibilityOffIcon
              sx={{
                color: theme.palette.text.primary,
              }}
            />
          ) : (
            <VisibilityIcon
              sx={{
                color: theme.palette.text.primary,
              }}
            />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <Container
      maxWidth='xs'
      sx={{
        marginTop: "50px",
        width: "350px",
        marginBottom: "15px",
      }}
    >
      <Paper elevation={10} style={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              m: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
            }}
          >
            <LockOutlinedIcon fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>

          {/* Google Sign-In Button */}
          <Button
            variant='outlined'
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              mt: 2,
              mb: 1,
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.primary.main,
            }}
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </Button>

          {/* Divider */}
          <Divider sx={{ width: "100%", my: 2 }} />
          <Box
            component='form'
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              error={!!errorMessages.email}
              helperText={errorMessages.email}
            />
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={visibility ? "text" : "password"}
              id='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              error={!!errorMessages.password}
              helperText={errorMessages.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <EndAdorment
                      visibility={visibility}
                      setVisibility={{ setVisibility }}
                    />
                  ),
                },
              }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !formData.email ||
                !formData.password ||
                Object.values(errorMessages).some((msg) => msg)
              }
            >
              Login
            </Button>
            <Grid container justifyContent='center'>
              <Grid>
                <Link
                  to='/reset-password'
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >
                  Forgot Password
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent='center' sx={{ mt: 2 }}>
              <Grid>
                <Link
                  to='/sign-up'
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
