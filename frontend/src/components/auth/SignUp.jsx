import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerValidation } from "../../validation/authJoi";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import SignupFormFields from "../../models/SignupFormFields";
import {showAlert } from "../../helpers/Alert";
import useValidation from "./../../hooks/useValidation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { FormControlLabel } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Checkbox from "@mui/material/Checkbox";

const SingUp = () => {
  const navigate = useNavigate();
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(registerValidation);
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };

  const [formData, setFormData] = useState({
    name: { first: "", middle: "", last: "" },
    phone: "",
    email: "",
    password: "",
    image: { url: "", alt: "" },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    isBusiness: false,
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let lastObj = keys.reduce((obj, key) => {
        return (obj[key] = obj[key] || {});
      }, prev);
      lastObj[lastKey] = value;
      resetErrorMessages();
      return { ...prev };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate(formData)) {
      try {
        const response = await axios.post(
          "http://localhost:9898/auth",
          formData
        );
        if (response.status === 201) {
          showAlert("success", "Registration successful!");
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            showAlert(
              "info",
              "Email already exists. Please choose another email."
            );
            navigate("/login");
          }
        } else {
          showAlert("error", "Network error or server is unreachable.");
        }
      }
    }
  };

  return (
    <Container maxWidth='md' sx={{ marginTop: "10px" }}>
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
            <KeyIcon fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            SignUp
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2} justifyContent='center'>
              {SignupFormFields.map((field) => (
                <Grid key={field.name} xs={6} sm={field.block ? 8 : 4}>
                  <TextField
                    margin='dense'
                    fullWidth
                    size='small'
                    required={field.required}
                    id={field.name}
                    label={field.placeholder}
                    name={field.name}
                    type={field.type}
                    autoComplete={
                      field.name === "email"
                        ? "email"
                        : field.name === "password"
                          ? "new-password"
                          : field.name === "phone"
                            ? "tel"
                            : field.name === "zip"
                              ? "postal-code"
                              : "off"
                    }
                    onChange={handleChange}
                    error={!!errorMessages[field.name]}
                    helperText={errorMessages[field.name]}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid sx={{ mt: 3, mb: 2, ml: 7 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!formData.isBusiness}
                    onChange={handleChange}
                    name='isBusiness'
                    color='primary'
                  />
                }
                label='Is Business?'
                labelPlacement='end'
              />
            </Grid>
            <Button type='submit' variant='contained' sx={{ ml: 7 }}>
              SignUp
            </Button>
            <Grid container justifyContent='center'>
              <Grid sx={{ mt: 4 }}>
                <Link
                  to='/login'
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SingUp;
