import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import "./CardsTable.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useCard } from "../../../contexts/CardContext";
import { useCart } from "../../../contexts/CartContext";

const FavoriteTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { favoriteCards, handleUnlike } = useCard();
  const { handleAddToCart } = useCart();
  
  return (
    <div className='cards_table'>
      <TableContainer
        component={Paper}
        sx={{
          width: { xs: "100%", md: "80%" },
          maxWidth: "1200px",
          overflowX: "auto",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Table>
          <TableBody>
            {favoriteCards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  No result Found
                </TableCell>
              </TableRow>
            ) : (
              favoriteCards.map((card) => (
                <TableRow key={card._id}>
                  <TableCell>
                    <img
                      src={card.image.url}
                      alt={card.image.alt}
                      width='100'
                      height='100'
                      style={{ borderRadius: "5px" }}
                    />
                  </TableCell>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.subtitle}</TableCell>
                  <TableCell>{card.price}$</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <IconButton
                        onClick={() => navigate(`/cards/${card._id}`)}
                        style={{ color: theme.palette.text.primary }}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleUnlike(card._id)}
                        style={{ color: "red" }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleAddToCart(card)}
                        style={{ color: theme.palette.text.primary }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FavoriteTable;
