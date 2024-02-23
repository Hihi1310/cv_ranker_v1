import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "match",
  initialState: {
    isMatched: false,
  },
  reducers: {
    click: (state, action) => {
      return { ...state, isMatched: !action.payload };
    },
  },
});

export const { click } = matchSlice.actions;

export default matchSlice.reducer;
