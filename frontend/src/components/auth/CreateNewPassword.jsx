import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { passwordValidation } from "../../validation/authJoi";
import useValidation from "./../../hooks/useValidation";
import { showAlert } from "../../helpers/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import DrawIcon from "@mui/icons-material/Draw";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(passwordValidation);
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    resetErrorMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate({ password })) {
      return;
    }
    try {
      await axios.post(
        `http://localhost:9898/auth/create-new-password/${token}`,
        { password }
      );
      showAlert("success", "Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
      showAlert("error", error.response?.data || "Failed to reset password.");
    }
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
              style={{
                color: theme.palette.text.primary,
              }}
            />
          ) : (
            <VisibilityIcon
              style={{
                color: theme.palette.text.primary,
              }}
            />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  const isDisabled = password === "" || !!errorMessages.password;

  return (
    <Container maxWidth='xs' sx={{ marginTop: "150px" }}>
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
            <DrawIcon fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create New Password
          </Typography>
          <Box
            component='form'
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              name='username'
              autoComplete='username'
              style={{ display: "none" }}
              value='dummyuser'
              readOnly
            />
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              name='password'
              label='New Password'
              type={visibility ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              error={!!errorMessages.password}
              helperText={errorMessages.password}
              autoComplete='new-password'
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
              disabled={isDisabled}
            >
              Create New Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateNewPassword;
