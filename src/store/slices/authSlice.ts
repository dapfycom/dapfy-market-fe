import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  user: IUserResponse | null;
  isLoginModalOpen: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isLoginModalOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const { setUser, clearUser, openLoginModal, closeLoginModal } =
  authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoginModalOpen = (state: RootState) =>
  state.auth.isLoginModalOpen;

export default authSlice.reducer;
