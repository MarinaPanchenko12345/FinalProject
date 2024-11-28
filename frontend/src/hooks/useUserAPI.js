import { useState, useCallback } from "react";
import axios from "axios";

const userURL = "http://localhost:9898/users";

const useUserAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const apiUser = useCallback(async (method, payload = {}) => {
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
        case METHOD.GET_ALL_USERS:
          response = await axios.get(userURL, config);
          break;
        case METHOD.GET_DELETED_USERS:
          response = await axios.get(`${userURL}/deleted-users`, config);
          break;
        case METHOD.RESTORE_DELETED_USERS:
          response = await axios.patch(
            `${userURL}/restore-user/${payload.id}`,
            payload,
            config
          );
          break;
        case METHOD.GET_USER_BY_ID:
          response = await axios.get(`${userURL}/${payload.id}`, config);
          break;
        case METHOD.UPDATE_USER:
          response = await axios.put(
            `${userURL}/${payload.id}`,
            payload.data,
            config
          );
          break;
        case METHOD.CHANGE_BUSINESS_STATUS:
          response = await axios.patch(
            `${userURL}/${payload.id}`,
            payload,
            config
          );
          break;
        case METHOD.DELETE_USER:
          response = await axios.delete(`${userURL}/${payload.id}`, config);
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

  return { data, error, isLoading, apiUser };
};

export const METHOD = {
  GET_ALL_USERS: "GET_ALL_USERS",
  GET_DELETED_USERS: "GET_DELETED_USERS",
  RESTORE_DELETED_USERS: "RESTORE_DELETED_USERS",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  UPDATE_USER: "UPDATE_USER",
  CHANGE_BUSINESS_STATUS: "CHANGE_BUSINESS_STATUS",
  DELETE_USER: "DELETE_USER",
};

export default useUserAPI;
