import { useState, useCallback } from "react";
import axios from "axios";

const cartURL = "http://localhost:9898/cart";

const useCartAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiCart = useCallback(async (method, payload = {}) => {
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
        case METHOD.ADD_TO_CART:
          response = await axios.post(
            `${cartURL}/add-to-cart/${payload.cardId}`,
            payload,
            config
          );
          break;
        case METHOD.GET_CART:
          response = await axios.get(`${cartURL}/get-cart`, config);
          break;
        case METHOD.REMOVE_FROM_CART:
          response = await axios.delete(
            `${cartURL}/remove-from-cart/${payload.cardId}`,
            config
          );
          break;
        case METHOD.UPDATE_QUANTITY:
          response = await axios.patch(
            `${cartURL}/update-quantity/${payload.cardId}`,
            payload,
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

  return { data, error, isLoading, apiCart };
};

export const METHOD = {
  ADD_TO_CART: "ADD_TO_CART",
  GET_CART: "GET_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

export default useCartAPI;
