import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GenericObject = {
  [key: string]: any;
};

export interface StateInterface {
  artworks: GenericObject[];
  addedArtIds: GenericObject;
}

const INITIAL_STATE: StateInterface = {
  artworks: [],
  addedArtIds: {},
};

export const artworksSlice = createSlice({
  name: "artworks",
  initialState: {
    ...INITIAL_STATE,
  },
  reducers: {
    setArtwork: (state, action: PayloadAction<GenericObject[]>) => {
      state.artworks = [...state.artworks, ...action.payload];
    },
    addArtwork: (state, action: PayloadAction<GenericObject>) => {
      state.artworks = [...state.artworks, action.payload];
    },
    updateAddedArtIds: (state, action: PayloadAction<number>) => {
      state.addedArtIds = { ...state.addedArtIds, [action.payload]: true };
    },
    removeArtWork: (state, action: PayloadAction<number>) => {
      state.artworks = state.artworks.map((artwork: GenericObject) =>
        artwork.id === action.payload ? { ...artwork, disabled: true } : artwork
      );
    },

    setRating: (
      state,
      action: PayloadAction<{ id: number; rating: number }>
    ) => {
      const { id, rating } = action.payload;
      state.artworks = state.artworks.map((artwork: GenericObject) =>
        artwork.id === id ? { ...artwork, rating } : artwork
      );
    },
  },
});

export const {
  setArtwork,
  addArtwork,
  removeArtWork,
  setRating,
  updateAddedArtIds,
} = artworksSlice.actions;

export default artworksSlice.reducer;
