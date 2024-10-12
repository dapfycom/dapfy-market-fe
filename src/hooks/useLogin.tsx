import {
  openLoginModal,
  selectIsLoginModalOpen,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export const useLogin = () => {
  const isLoginModalOpen = useAppSelector(selectIsLoginModalOpen);
  const dispatch = useAppDispatch();

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };
  return { isLoginModalOpen, handleOpenLoginModal };
};
