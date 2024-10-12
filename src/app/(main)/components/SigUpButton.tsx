"use client";

import { FramerDiv } from "@/components/framer";
import { Button } from "@/components/ui/button";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { openLoginModal } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { fadeInUp } from "../../../components/Sidebar/constants";

const SigUpButton = () => {
  const { user } = useGetCurrentUser();
  const dispatch = useAppDispatch();

  const handleOpenSignUpModal = () => {
    dispatch(openLoginModal());
  };
  if (user) return null;
  return (
    <FramerDiv variants={fadeInUp} className="mt-4">
      <Button
        onClick={handleOpenSignUpModal}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Sign up instantly 🚀
      </Button>
    </FramerDiv>
  );
};

export default SigUpButton;
