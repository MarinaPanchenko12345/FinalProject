import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SimpleAlert, { showAlert } from "../../helpers/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9898/auth/reset-password", {
        email,
      });
      SimpleAlert("Check your email for reset instructions.");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showAlert("error", "Email not found.");
      } else {
        showAlert("error", "Error sending reset email.");
      }
    }
  };

  const isDisabled = email === "";
  
  return (
    <Container maxWidth='xs' sx={{ marginTop: "100px" }}>
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
            <DeleteForeverIcon fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
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
              value={email}
              onChange={handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, color: theme.palette.text.primary }}
              disabled={isDisabled}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
