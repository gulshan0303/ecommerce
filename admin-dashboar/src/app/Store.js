import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice.jsx";
export const store = configureStore({
    reducer: {
      auth: authReducers,

    },
});