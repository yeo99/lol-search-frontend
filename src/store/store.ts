import { configureStore } from "@reduxjs/toolkit";
import { boardAPI } from "../services/boardAPI";

const store = configureStore({
  reducer: {
    [boardAPI.reducerPath]: boardAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
