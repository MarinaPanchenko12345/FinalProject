import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./CardsTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useCard } from '../../../contexts/CardContext';
import { useCart } from '../../../contexts/CartContext';

const ProductCardTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    isLoggedIn,
    cards,
    likedCards,
    storedLikedCards,
    handleLike,
  } = useCard();
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
            {cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  No result Found
                </TableCell>
              </TableRow>
            ) : (
              cards.map((card) => (
                <TableRow key={card._id}>
                  <TableCell>
                    <img
                      src={card.image.url}
                      alt={card.image.alt}
                      width='100'
                      height='100'
                    />
                  </TableCell>

                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.subtitle}</TableCell>
                  <TableCell>{card.price}$</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/cards/${card._id}`)}
                      style={{ color: theme.palette.text.primary }}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleLike(card)}
                      style={{
                        color: isLoggedIn
                          ? likedCards.includes(card._id)
                            ? "red"
                            : theme.palette.text.primary
                          : storedLikedCards.includes(card._id)
                            ? "red"
                            : theme.palette.text.primary,
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAddToCart(card)}
                      style={{ color: theme.palette.text.primary }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
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

export default ProductCardTable;
