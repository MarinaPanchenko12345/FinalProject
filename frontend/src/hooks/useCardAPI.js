import { useState, useCallback } from "react";
import axios from "axios";

const cardURL = "http://localhost:9898/cards";

const useCardAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiCard = useCallback(async (method, payload = {}) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      setIsLoading(true);
      let response;

      switch (method) {
        case METHOD.GET_ALL_CARDS:
          response = await axios.get(cardURL);
          break;

        case METHOD.GET_DELETED_CARDS:
          response = await axios.get(`${cardURL}/deleted-cards`, config);
          break;

        case METHOD.RESTORE_DELETED_CARDS:
          response = await axios.patch(
            `${cardURL}/restore-card/${payload.id}`,
            payload,
            config
          );
          break;

        case METHOD.GET_CARD_BY_ID:
          response = await axios.get(`${cardURL}/${payload.id}`, config);
          break;

        case METHOD.GET_ALL_MY_CARDS:
          response = await axios.get(`${cardURL}/my-cards`, config);
          break;

        case METHOD.CREATE_CARD:
          response = await axios.post(cardURL, payload, config);
          break;

        case METHOD.UPDATE_CARD:
          response = await axios.put(
            `${cardURL}/${payload.id}`,
            payload.data,
            config
          );
          break;
        case METHOD.DELETE_CARD:
          response = await axios.delete(`${cardURL}/${payload.id}`, config);
          break;

        case METHOD.LIKE_UNLIKE_CARD:
          response = await axios.patch(
            `${cardURL}/${payload.id}`,
            { like: payload.like },
            config
          );
          break;
        default:
          throw new Error("Unsupported API method");
      }
      setData(response.data);
      setError("");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, apiCard };
};

export const METHOD = {
  GET_ALL_CARDS: "GET_ALL_CARDS",
  GET_ONE_CARD: "GET_CARD_BY_ID",
  GET_ALL_MY_CARDS: "GET_ALL_MY_CARDS",
  GET_DELETED_CARDS: "GET_DELETED_CARDS",
  RESTORE_DELETED_CARDS: "RESTORE_DELETED_CARDS",
  CREATE_CARD: "CREATE_CARD",
  UPDATE_CARD: "UPDATE_CARD",
  DELETE_CARD: "DELETE_CARD",
  LIKE_UNLIKE_CARD: "LIKE_UNLIKE_CARD",
};

export default useCardAPI;
