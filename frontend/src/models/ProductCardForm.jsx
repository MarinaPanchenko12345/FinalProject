import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

const ProductCardForm = ({
  formData,
  errorMessages,
  handleChange,
  handleSubmit,
  handleCancel,
  actionLabel,
  title,
  avatarIcon,
  style,
}) => {
  const theme = useTheme();
  return (
    <div className='card_form_container'>
      <Container maxWidth='sm'>
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
              {avatarIcon}
            </Avatar>
            <Typography variant='h5'>{title}</Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} justifyContent='center' sx={{ p: 2 }}>
                <Grid xs={12} sm={6}>
                  <Grid container direction='column' spacing={2}>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        required
                        id='title'
                        label='Title'
                        name='title'
                        type='text'
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errorMessages["title"]}
                        helperText={errorMessages["title"]}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        required
                        id='subtitle'
                        label='Subtitle'
                        name='subtitle'
                        type='text'
                        value={formData.subtitle}
                        onChange={handleChange}
                        error={!!errorMessages["subtitle"]}
                        helperText={errorMessages["subtitle"]}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        required
                        id='description'
                        label='Description'
                        name='description'
                        type='text'
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errorMessages["description"]}
                        helperText={errorMessages["description"]}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='image.url'
                        label='Image URL'
                        name='image.url'
                        type='text'
                        value={formData.image.url}
                        onChange={handleChange}
                        error={!!errorMessages["image.url"]}
                        helperText={errorMessages["image.url"]}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='image.alt'
                        label='Image Alt Text'
                        name='image.alt'
                        type='text'
                        value={formData.image.alt}
                        onChange={handleChange}
                        error={!!errorMessages["image.alt"]}
                        helperText={errorMessages["image.alt"]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Grid container direction='column' spacing={2}>
                    <Grid>
                      <FormControl
                        variant='outlined'
                        fullWidth
                        margin='dense'
                        size='small'
                      >
                        <InputLabel id='color-label'>Color</InputLabel>
                        <Select
                          labelId='color-label'
                          label='Color'
                          id='color'
                          name='color'
                          value={formData.color}
                          onChange={handleChange}
                        >
                          <MenuItem value='red'>Red</MenuItem>
                          <MenuItem value='green'>Green</MenuItem>
                          <MenuItem value='blue'>Blue</MenuItem>
                          <MenuItem value='black'>Black</MenuItem>
                          <MenuItem value='white'>White</MenuItem>
                          <MenuItem value='yellow'>Yellow</MenuItem>
                          <MenuItem value='orange'>Orange</MenuItem>
                          <MenuItem value='purple'>Purple</MenuItem>
                          <MenuItem value='pink'>Pink</MenuItem>
                          <MenuItem value='metallic'>Metallic</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errorMessages["color"]}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='quantity'
                        label='Quantity'
                        name='quantity'
                        type='number'
                        value={formData.quantity}
                        onChange={handleChange}
                        error={!!errorMessages["quantity"]}
                        helperText={errorMessages["quantity"]}
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='price'
                        label='Price'
                        name='price'
                        type='number'
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errorMessages["price"]}
                        helperText={errorMessages["price"]}
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='model'
                        label='Model'
                        name='model'
                        type='text'
                        value={formData.model}
                        onChange={handleChange}
                        error={!!errorMessages["model"]}
                        helperText={errorMessages["model"]}
                      />
                    </Grid>
                    <Grid>
                      <FormControl
                        variant='outlined'
                        margin='dense'
                        size='small'
                        fullWidth
                      >
                        <InputLabel id='category-label'>Category</InputLabel>
                        <Select
                          labelId='category-label'
                          label='Category'
                          id='category'
                          name='category'
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <MenuItem value='phones'>Phones</MenuItem>
                          <MenuItem value='computers'>Computers</MenuItem>
                          <MenuItem value='laptops'>Laptops</MenuItem>
                          <MenuItem value='monitors'>Monitors</MenuItem>
                          <MenuItem value='keyboards'>Keyboards</MenuItem>
                          <MenuItem value='computer Mice'>
                            Computer Mice
                          </MenuItem>
                          <MenuItem value='headphones'>Headphones</MenuItem>
                          <MenuItem value='smartwatches'>Smartwatches</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errorMessages["category"]}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid>
                      <TextField
                        margin='dense'
                        fullWidth
                        size='small'
                        id='company'
                        label='Company'
                        name='company'
                        type='text'
                        value={formData.company}
                        onChange={handleChange}
                        error={!!errorMessages["company"]}
                        helperText={errorMessages["company"]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button type='submit' variant='contained' sx={{ ml: 2, mb: 2 }}>
                {actionLabel}
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 2, mb: 2 }}
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

export default ProductCardForm;
