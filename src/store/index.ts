import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "../reducers/";

export const store = configureStore({
  reducer: {
    artworks: artworksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
