import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
  id: string;
  name: string;
  // Add other product properties as needed
}

interface CommonState {
  sidebarOpen: boolean;
}

const initialState: CommonState = {
  sidebarOpen: true,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = commonSlice.actions;

export const selectSidebarOpen = (state: RootState) => state.common.sidebarOpen;

export default commonSlice.reducer;
