"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: { steps:    {frame?: any; image?: any; postcard?:any; pfp?:any ; caption?: AudioNode;} | null } = {
  steps: null,
};

export const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    selectWallet: (state, action) => {
      state.steps = action.payload;
    },
    disconnect: (state) => {
      state.steps = null;
    },
  },
});

// actions
export const { selectWallet, disconnect } = stepsSlice.actions;
// selectors
export const selectedWallet = (state: RootState) => state.steps.steps;

export default stepsSlice.reducer;
