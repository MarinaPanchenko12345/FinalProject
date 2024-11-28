import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../slices/TokenSlice";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
