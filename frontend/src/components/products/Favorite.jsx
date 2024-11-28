import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { SearchContext } from "../../contexts/SearchContext.js";
import { searchCards } from "../../helpers/SearchBox";
import "./Cards.css";
import Loading from "../../helpers/loading/Loading.jsx";
import { ModeContext } from "../../contexts/ModeContext.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FavoriteTable from "./table/FavoriteTable.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.js";
import { useCard } from "../../contexts/CardContext.js";

const Favorite = () => {
  const { searchText } = useContext(SearchContext);
  const { viewMode } = useContext(ModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { fetchAllCards, favoriteCards, handleUnlike, isLoading, error } =
    useCard();
  const { handleAddToCart } = useCart();
  const [page, setPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    fetchAllCards();
  }, [fetchAllCards]);

  const searchedCards = searchCards(favoriteCards, searchText);
  //Pagination
  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchedCards.slice(indexOfFirstCard, indexOfLastCard);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;
  const noFavoriteCards =
    !currentCards || currentCards.length === 0 || searchedCards.length === 0;

  return (
    <div
      className='cards_container'
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <h1>Favorite</h1>
      {noFavoriteCards ? (
        <div className='message message_empty'>No favorite cards found</div>
      ) : (
        <>
          {viewMode === "cards" ? (
            <div className='cards_div'>
              {searchedCards.map((card) => (
                <div
                  key={card._id}
                  className='card'
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  <div className='card_img'>
                    <div className='card_icons'>
                      <IconButton
                        onClick={() => navigate(`/cards/${card._id}`)}
                        className='card_icon'
                        style={{ color: "#7c7c7c" }}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                      <IconButton onClick={() => handleUnlike(card._id)}>
                        <FavoriteIcon
                          className='card_icon'
                          style={{ cursor: "pointer", color: "red" }}
                        />
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
            <FavoriteTable />
          )}
          <Stack spacing={2} className='pagination'>
            <Pagination
              count={Math.ceil(searchedCards.length / cardsPerPage)}
              page={page}
              onChange={handleChangePage}
              variant='outlined'
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default Favorite;
