import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  userData: null,
  userId: null,
  role: "guest",
};

const TokenSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      const userData = jwtDecode(token);
      state.token = token;
      state.userData = userData;
      state.userId = userData._id;

      if (userData.isAdmin) {
        state.role = "admin";
      } else if (userData.isBusiness) {
        state.role = "business";
      } else {
        state.role = "regular";
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.userData = null;
      state.userId = null;
      state.role = "guest";
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { login, logout, setRole } = TokenSlice.actions;
export default TokenSlice.reducer;
