import { useState, useCallback } from "react";
import axios from "axios";

const orderURL = "http://localhost:9898/order";

const useOrderAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiOrder = useCallback(async (method, payload = {}) => {
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
        case METHOD.ADD_ORDER:
          response = await axios.post(`${orderURL}/add-order`, payload, config);
          break;
        case METHOD.GET_ORDERS:
          response = await axios.get(`${orderURL}/my-orders`, config);
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

  return { data, error, isLoading, apiOrder };
};

export const METHOD = {
  ADD_ORDER: "ADD_ORDER",
  GET_ORDERS: "GET_ORDERS",
};

export default useOrderAPI;
