"use client";
import { GhostButton, OutlineButton } from "@/components/buttonts";
import Login from "@/components/Login/Login";
import {
  selectCart,
  selectSidebarOpen,
  setSidebarOpen,
} from "@/store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { FileText, Menu, ShoppingCart } from "lucide-react";

const TopBar = () => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between border-b border-blue-200 p-4 bg-white text-gray-800"
    >
      <GhostButton size="sm" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </GhostButton>

      <div className="flex items-center space-x-4">
        <GhostButton size="sm">Blog</GhostButton>

        <GhostButton size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Docs
        </GhostButton>

        <Login />

        <OutlineButton size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({cart.length})
        </OutlineButton>
      </div>
    </motion.header>
  );
};

export default TopBar;
