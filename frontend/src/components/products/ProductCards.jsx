import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ModeContext } from "../../contexts/ModeContext";
import { SearchContext } from "../../contexts/SearchContext";
import { searchCards } from "../../helpers/SearchBox";
import { useNavigate } from "react-router-dom";
import "./Cards.css";
import ProductCardTable from "./table/ProductCardTable";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { SortContext } from "../../contexts/SortContext";
import { useCart } from "../../contexts/CartContext";
import Loading from "../../helpers/loading/Loading";
import { useCard } from "../../contexts/CardContext";

const ProductCards = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const style = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  };
  const {
    isLoggedIn,
    cards,
    fetchAllCards,
    likedCards,
    storedLikedCards,
    handleLike,
    isLoading,
    error,
  } = useCard();
  const { viewMode } = useContext(ModeContext);
  const { searchText } = useContext(SearchContext);
  const { selectedCategory, selectedColor } = useContext(SortContext);
  const { handleAddToCart } = useCart();
  const [page, setPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    fetchAllCards();
  }, [fetchAllCards]);

  const searchedCards = searchCards(cards, searchText)
    .filter((card) =>
      selectedCategory ? card.category === selectedCategory : true
    )
    .filter((card) => (selectedColor ? card.color === selectedColor : true));

  //Pagination
  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchedCards.slice(indexOfFirstCard, indexOfLastCard);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <Loading />;
  if (error)
    return <div className='message message_error '>Error: {error}</div>;

  if (searchedCards.length === 0 || currentCards.length === 0) {
    return <div className='message message_empty'>No Result Found</div>;
  }

  return (
    <div className='cards_container'>
      {viewMode === "cards" ? (
        <div className='cards_div'>
          {currentCards.map((card) => (
            <div key={card._id} className='card' style={style}>
              <div className='card_img'>
                <div className='card_icons'>
                  <IconButton
                    onClick={() => navigate(`/cards/${card._id}`)}
                    className='card_icon'
                    style={{ color: "#7c7c7c" }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleLike(card)}
                    className='card_icon'
                    style={{
                      color: isLoggedIn
                        ? likedCards.includes(card._id)
                          ? "red"
                          : "#7c7c7c"
                        : storedLikedCards.includes(card._id)
                        ? "red"
                        : "#7c7c7c",
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleAddToCart(card)}
                    className='card_icon'
                    style={{ color: "#7c7c7c" }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </div>
                <img src={card.image.url} alt={card.image.alt} />
              </div>
              <div className='card_text'>
                <p>{card.title}</p>
                <p>{card.subtitle}</p>
              </div>
              <div className='card_price'>
                <p>{card.price}$</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductCardTable />
      )}

      {/* Pagination */}
      <Stack spacing={2} className='pagination'>
        <Pagination
          count={Math.ceil(searchedCards.length / cardsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant='outlined'
        />
      </Stack>
    </div>
  );
};

export default ProductCards;
