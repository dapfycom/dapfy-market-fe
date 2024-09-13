import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import {
  openLoginModal,
  selectIsLoginModalOpen,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { OutlineButton } from "../buttonts";

const LoginModal = dynamic(() => import("./login-modal"), {
  ssr: false,
});

const LoginButton = () => {
  const { isLoading } = useGetCurrentUser();
  const isLoginModalOpen = useAppSelector(selectIsLoginModalOpen);
  const dispatch = useAppDispatch();

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal());
  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenLoginModal}
      >
        <OutlineButton disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
          Log in
        </OutlineButton>
      </motion.div>

      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default LoginButton;
