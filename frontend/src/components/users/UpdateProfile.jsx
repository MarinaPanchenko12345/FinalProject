import React, { useEffect, useState } from "react";
import { userUpdateValidation } from "../../validation/userUpdateJoi";
import UserUpdateFormFields from "../../models/UserUpdateFormFields";
import useValidation from "../../hooks/useValidation";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DrawIcon from "@mui/icons-material/Draw";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../../contexts/UserContext";
import { showAlert } from "../../helpers/Alert";

const UpdateProfile = ({ user, close }) => {
  const theme = useTheme();
  const style = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(userUpdateValidation);
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: { first: "", middle: "", last: "" },
    phone: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      image: { url: "", alt: "" },
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: {
          first: user.name?.first || "",
          middle: user.name?.middle || "",
          last: user.name?.last || "",
        },
        phone: user.phone || "",
        address: {
          state: user.address?.state || "",
          country: user.address?.country || "",
          city: user.address?.city || "",
          street: user.address?.street || "",
          houseNumber: user?.address.houseNumber || "",
          zip: user.address?.zip || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let lastObj = keys.reduce(
        (obj, key) => (obj[key] = obj[key] || {}),
        prev
      );
      lastObj[lastKey] = value;
      resetErrorMessages();
      return { ...prev };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      try {
        await updateUser(user._id, formData);
        close();
      } catch (error) {
        showAlert("error", error);
      }
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <div className='user_form_container'>
      <Container maxWidth='md'>
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
            <Typography variant='h5' margin={1}>
              Update Profile
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} justifyContent='center'>
                {UserUpdateFormFields.map((field) => (
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
                      autoComplete={field.name}
                      onChange={handleChange}
                      value={
                        field.name.includes("image.")
                          ? formData.image?.[field.name.split(".")[1]] || ""
                          : field.name.includes("name.")
                          ? formData.name?.[field.name.split(".")[1]] || ""
                          : field.name.includes("address.")
                          ? formData.address?.[field.name.split(".")[1]] || ""
                          : formData?.[field.name] || ""
                      }
                      error={!!errorMessages[field.name]}
                      helperText={errorMessages[field.name]}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type='submit'
                variant='contained'
                sx={{ ml: 5, mt: 2, mb: 2 }}
              >
                Update
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 2, mt: 2, mb: 2 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default UpdateProfile;
