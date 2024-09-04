import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface DashboardState {
  tab: string;
}

// Define the initial state using that type
const initialState: DashboardState = {
  tab: "Dashboard",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = dashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTab = (state: RootState) => state.dashboard.tab;

export default dashboardSlice.reducer;
