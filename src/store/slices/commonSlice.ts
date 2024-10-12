import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
  id: string;
  name: string;
  // Add other product properties as needed
}

interface CommonState {
  cart: Product[];
  sidebarOpen: boolean;
}

const initialState: CommonState = {
  cart: [],
  sidebarOpen: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setSidebarOpen } =
  commonSlice.actions;

export const selectCart = (state: RootState) => state.common.cart;
export const selectSidebarOpen = (state: RootState) => state.common.sidebarOpen;

export default commonSlice.reducer;
