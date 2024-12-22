import { configureStore } from "@reduxjs/toolkit";
import { boardAPI } from "../services/boardAPI";
import { commentAPI } from "../services/commentAPI";

const store = configureStore({
  reducer: {
    [boardAPI.reducerPath]: boardAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardAPI.middleware)
      .concat(commentAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
