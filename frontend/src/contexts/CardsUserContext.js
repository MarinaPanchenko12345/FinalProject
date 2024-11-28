import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useCardAPI, { METHOD as CARD_METHOD } from "../hooks/useCardAPI";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../helpers/AlertToasty";

const CardsUserContext = createContext();

export const useCardsUser = () => useContext(CardsUserContext);

export const CardsUserProvider = ({ children }) => {
  const { apiCard, isLoading, error } = useCardAPI();
  const userId = useSelector((state) => state.token.userId);
  const isLoggedIn = !!userId;
  const [userCards, setUserCards] = useState([]);
  const [deletedCardsCount, setDeletedCardsCount] = useState(0);

  //Function to get user cards
  const fetchUserCards = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await apiCard(CARD_METHOD.GET_ALL_MY_CARDS);
      if (response) {
        setUserCards(response);
      } else {
        setUserCards([]);
      }
    } catch (error) {
      errorToast(`Error fetching user cards: ${error}`);
      setUserCards([]);
    }
  }, [apiCard, isLoggedIn]);

  // Function to get deleted user cards
  const fetchDeletedUserCards = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await apiCard(CARD_METHOD.GET_DELETED_CARDS);
      const deletedCards = Array.isArray(response) ? response : [];
      setDeletedCardsCount(deletedCards.length);
      return deletedCards;
    } catch (error) {
      errorToast(`Error fetching deleted cards: ${error}`);
      return [];
    }
  }, [apiCard, isLoggedIn]);

  useEffect(() => {
    fetchUserCards();
    fetchDeletedUserCards();
  }, [fetchUserCards, fetchDeletedUserCards]);

  //Function for Restore card
  const restoreCard = useCallback(
    async (cardId) => {
      try {
        await apiCard(CARD_METHOD.RESTORE_DELETED_CARDS, { id: cardId });
        fetchUserCards();
        fetchDeletedUserCards();
        successToast("Card restored successfully!");
      } catch (error) {
        errorToast(`Error restore card: ${error}`);
      }
    },
    [apiCard, fetchUserCards, fetchDeletedUserCards]
  );

  //Function for create card
  const createCard = useCallback(
    async (newCard) => {
      try {
        const response = await apiCard(CARD_METHOD.CREATE_CARD, newCard);
        if (response) {
          setUserCards((prev) => {
            const updatedCards = [...prev, response];
            return updatedCards;
          });
        }
      } catch (error) {
        errorToast(`Error create card: ${error}`);
      }
    },
    [apiCard]
  );

  //Function for update card
  const updateCard = useCallback(
    async (id, updatedData) => {
      try {
        const response = await apiCard(CARD_METHOD.UPDATE_CARD, {
          id,
          data: updatedData,
        });
        if (response) {
          setUserCards((prev) =>
            prev.map((card) => (card._id === id ? response : card))
          );
        }
      } catch (error) {
        errorToast(`Error update card: ${error}`);
      }
    },
    [apiCard]
  );

  //Function for delete card
  const deleteCard = useCallback(
    async (id) => {
      try {
        await apiCard(CARD_METHOD.DELETE_CARD, { id });
        setUserCards((prev) => {
          const updatedCards = prev.filter((card) => card._id !== id);
          return updatedCards;
        });
        fetchDeletedUserCards();
      } catch (error) {
        errorToast(`Error delete card: ${error}`);
      }
    },
    [apiCard, fetchDeletedUserCards]
  );

  return (
    <CardsUserContext.Provider
      value={{
        isLoggedIn,
        userCards,
        fetchUserCards,
        fetchDeletedUserCards,
        restoreCard,
        deletedCardsCount,
        createCard,
        updateCard,
        deleteCard,
        isLoading,
        error,
      }}
    >
      {children}
    </CardsUserContext.Provider>
  );
};
