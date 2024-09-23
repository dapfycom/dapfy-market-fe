import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface DashboardState {
  isSidebarOpen: boolean;
}

// Define the initial state using that type
const initialState: DashboardState = {
  isSidebarOpen: true,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen } = dashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSidebarOpen = (state: RootState) =>
  state.dashboard.isSidebarOpen;

export default dashboardSlice.reducer;
