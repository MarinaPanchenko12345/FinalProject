import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useCardAPI, { METHOD as CARD_METHOD } from "../hooks/useCardAPI";
import { useSelector } from "react-redux";
import { errorToast } from "../helpers/AlertToasty";

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const { apiCard, isLoading, error } = useCardAPI();
  const userId = useSelector((state) => state.token.userId);
  const isLoggedIn = !!userId;
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [storedLikedCards, setStoredLikedCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

  //Function to get all cards
  const fetchAllCards = useCallback(async () => {
    try {
      const response = await apiCard(CARD_METHOD.GET_ALL_CARDS);
      if (response) {
        setCards(response);
      } else {
        setCards([]);
      }
    } catch (error) {
      return;
    }
  }, [apiCard]);

  useEffect(() => {
    fetchAllCards();
  }, [fetchAllCards]);

  useEffect(() => {
    if (cards) {
      setCards(cards);
      if (isLoggedIn) {
        // Logic for an authorized user
        if (cards.length > 0) {
          const likeCard = cards.filter((card) => card.likes.includes(userId));
          setLikedCards(likeCard.map((card) => card._id));
        }
      } else {
        // Logic for unauthorized user
        const storedLikes =
          JSON.parse(localStorage.getItem("likedCards")) || [];
        setStoredLikedCards(storedLikes);
      }
    }
  }, [cards, isLoggedIn, userId]);

  //Function for likes
  const handleLike = useCallback(
    async (card) => {
      const cardId = card?._id;
      if (!cardId) {
        return;
      }
      // Logic for unauthorized user
      if (!isLoggedIn) {
        const updatedStoredLikedCards = storedLikedCards.includes(cardId)
          ? storedLikedCards.filter((id) => id !== cardId)
          : [...storedLikedCards, cardId];
        setStoredLikedCards(updatedStoredLikedCards);
        localStorage.setItem(
          "likedCards",
          JSON.stringify(updatedStoredLikedCards)
        );
        return;
      }
      // Logic for an authorized user
      try {
        const isLiked = likedCards.includes(cardId);
        const likeStatus = !isLiked;
        await apiCard(CARD_METHOD.LIKE_UNLIKE_CARD, {
          id: cardId,
          like: likeStatus,
        });
        // Updating the status of likes
        const updatedLikedCards = likeStatus
          ? [...likedCards, cardId] // Add a like
          : likedCards.filter((id) => id !== cardId); // Delete the like
        setLikedCards(updatedLikedCards);
      } catch (error) {
        errorToast(`Error: ${error}`);
      }
    },
    [apiCard, isLoggedIn, likedCards, storedLikedCards]
  );

  //Filter Favorite Cards
  useEffect(() => {
    if (isLoggedIn && cards.length > 0) {
      const favoriteCards = cards.filter(
        (card) => Array.isArray(card.likes) && card.likes.includes(userId)
      );
      setFavoriteCards(favoriteCards);
    }
  }, [isLoggedIn, userId, cards]);

  //Function for remove like
  const handleUnlike = async (cardId) => {
    try {
      await apiCard(CARD_METHOD.LIKE_UNLIKE_CARD, { id: cardId, like: false });
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId
            ? { ...card, likes: card.likes.filter((id) => id !== userId) }
            : card
        )
      );
      setFavoriteCards((prevFavorites) =>
        prevFavorites.filter((card) => card._id !== cardId)
      );
    } catch (error) {
      errorToast(`Error remove like: ${error}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setFavoriteCount(likedCards.length);
    }
  }, [likedCards, isLoggedIn]);

  return (
    <CardContext.Provider
      value={{
        cards,
        isLoggedIn,
        fetchAllCards,
        handleLike,
        handleUnlike,
        likedCards,
        storedLikedCards,
        favoriteCards,
        favoriteCount,
        setFavoriteCount,
        isLoading,
        error,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
