import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";

const TextRating = ({ value = 0, likeCount = 0 }) => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 400, display: "flex", alignItems: "center" }}>
      <Rating
        name='text-feedback'
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={
          <StarIcon
            style={{ opacity: 0.55, color: theme.palette.rating.main }}
            fontSize='inherit'
          />
        }
      />
      <p
        style={{
          marginLeft: "10px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        ({likeCount} likes)
      </p>
    </Box>
  );
};

export default TextRating;
