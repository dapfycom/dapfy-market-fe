"use client";
import { selectSidebarOpen, setSidebarOpen } from "@/store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ArrowLeftToLine } from "lucide-react";
import { GhostButton } from "./buttonts";

const CloseSidebarButton = () => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };
  return (
    <GhostButton
      size="sm"
      onClick={toggleSidebar}
      className="rounded-full hover:bg-gray-500/10 h-7 w-7 p-0"
    >
      <ArrowLeftToLine className="h-4 w-4" color="rgba(0,0,0,0.5)" />
    </GhostButton>
  );
};

export default CloseSidebarButton;
