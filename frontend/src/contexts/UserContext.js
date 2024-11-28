import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useUserAPI, { METHOD as USER_METHOD } from "../hooks/useUserAPI";
import SimpleAlert, {
  showAlert,
  showAlertDelete,
} from "../helpers/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../slices/TokenSlice";
import { errorToast, successToast } from "../helpers/AlertToasty";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { apiUser, error, isLoading } = useUserAPI();
  const [users, setUsers] = useState([]);
  const [deletedUsersCount, setDeletedUsersCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.token.userId);
  const role = useSelector((state) => state.token.role);
  const isLoggedIn = !!userId;

  //Function to get all users
  const fetchAllUsers = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await apiUser(USER_METHOD.GET_ALL_USERS);
      const users = Array.isArray(response)
        ? response.filter((user) => !user.isAdmin)
        : [];
      if (users.length > 0) {
        setUsers(users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      errorToast(error);
    }
  }, [apiUser, isLoggedIn]);

  // Function to get deleted users
  const fetchDeletedUsers = useCallback(async () => {
    if (!isLoggedIn || role !== "admin") {
      return;
    }
    try {
      const response = await apiUser(USER_METHOD.GET_DELETED_USERS);
      const deletedUsers = Array.isArray(response) ? response : [];
      setDeletedUsersCount(deletedUsers.length);
      return deletedUsers;
    } catch (error) {
      errorToast(`Error fetching deleted users: ${error}`);
      return [];
    }
  }, [apiUser, isLoggedIn, role]);

  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      fetchAllUsers();
      fetchDeletedUsers();
    }
  }, [fetchAllUsers, fetchDeletedUsers, isLoggedIn, role]);

  // Function to restore a deleted user
  const restoreUser = useCallback(
    async (userId) => {
      try {
        await apiUser(USER_METHOD.RESTORE_DELETED_USERS, {
          id: userId,
        });
        fetchAllUsers();
        successToast("The user was successfully restored!");
      } catch (error) {
        errorToast(`Error restoring user: ${error.message || error}`);
      }
    },
    [apiUser, fetchAllUsers]
  );

  // Function to fetch the details of the currently logged-in user from the server.
  // Used after Google Login where a token is provided.
  const fetchLoggedUser = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await apiUser(USER_METHOD.GET_USER_BY_ID, {
        id: userId,
      });
      setLoggedUser(response);
    } catch (error) {
      errorToast(`Error fetching logged user: ${error}`);
    }
  }, [apiUser, isLoggedIn, userId]);

  useEffect(() => {
    if (isLoggedIn) fetchLoggedUser();
  }, [isLoggedIn, fetchLoggedUser]);

  // Function to get user by ID
  const fetchUserById = useCallback(
    async (id) => {
      if (!id) return null;
      try {
        const response = await apiUser(USER_METHOD.GET_USER_BY_ID, { id });
        setCurrentUser(response);
        return response;
      } catch (error) {
        errorToast(`Error fetching selected user: ${error}`);
        return null;
      }
    },
    [apiUser]
  );

  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [fetchUserById, userId]);

  // Function delete user
  const deleteUser = async (userId) => {
    try {
      const result = await showAlertDelete();
      if (result.isConfirmed) {
        await apiUser(USER_METHOD.DELETE_USER, { id: userId });
        fetchAllUsers();
        fetchDeletedUsers();
      }
    } catch (error) {
      errorToast(`Error: ${error}`);
      errorToast(error);
    }
  };

  // Function for changing the user's business status
  const handleChangeStatus = async (isBusiness) => {
    try {
      const updatedStatus = { isBusiness: !isBusiness };
      await apiUser(USER_METHOD.CHANGE_BUSINESS_STATUS, {
        id: userId,
        ...updatedStatus,
      });
      // Updating a Role in Redux
      dispatch(setRole(updatedStatus.isBusiness ? "business" : "regular"));
      // Update status in selectedUser
      setCurrentUser((prevUser) => {
        const updatedUser = { ...prevUser, ...updatedStatus };
        return updatedUser;
      });
      SimpleAlert(
        "Status updated successfully! You now have access to additional features, including the ability to list and sell your own products."
      );
    } catch (error) {
      errorToast(`Error changing status: ${error}`);
    }
  };

  // Function for update user
  const updateUser = async (userId, updatedData) => {
    try {
      const updatedUserData = await apiUser(USER_METHOD.UPDATE_USER, {
        id: userId,
        data: updatedData,
      });
      if (updatedUserData) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...updatedUserData,
        }));
        showAlert("success", "Your profile updated successfully!");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        showAlert(
          "warning",
          "This email is already in use. Please use a different email."
        );
      } else {
        errorToast(`Error update user: ${error}`);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        users,
        currentUser,
        fetchLoggedUser,
        loggedUser,
        isLoggedIn,
        error,
        isLoading,
        fetchAllUsers,
        fetchUserById,
        deleteUser,
        updateUser,
        handleChangeStatus,
        fetchDeletedUsers,
        deletedUsersCount,
        restoreUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
