import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import { RootState } from "../store";

interface CommonState {
  sidebarOpen: boolean;
}

const initialState: CommonState = {
  sidebarOpen: getSavedSidebarState(),
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
      saveSidebarState(action.payload);
    },
  },
});

export const { setSidebarOpen } = commonSlice.actions;

export const selectSidebarOpen = (state: RootState) => state.common.sidebarOpen;

// Helper functions
export function getSavedSidebarState(): boolean {
  const savedState = getCookie("sidebarOpen");
  return savedState !== undefined ? JSON.parse(savedState as string) : true;
}

function saveSidebarState(isOpen: boolean): void {
  setCookie("sidebarOpen", JSON.stringify(isOpen), {
    maxAge: 60 * 60 * 24 * 365,
  }); // 1 year
}

export default commonSlice.reducer;
