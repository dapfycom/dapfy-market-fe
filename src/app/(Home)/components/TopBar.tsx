"use client";
import { GhostButton, OutlineButton } from "@/components/buttonts";
import { motion } from "framer-motion";
import { Bell, FileText, LogIn, Menu, ShoppingCart } from "lucide-react";

const TopBar = ({
  sidebarOpen,
  setSidebarOpen,
  notification,
  cart,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  notification: string | null;
  cart: any[];
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between border-b border-blue-200 p-4 bg-white text-gray-800"
    >
      <GhostButton size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="h-6 w-6" />
      </GhostButton>
      <div className="flex-1 flex justify-center items-center">
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
          >
            <Bell className="h-4 w-4 mr-2" />
            {notification}
          </motion.div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <GhostButton size="sm">Blog</GhostButton>
        <GhostButton size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Docs
        </GhostButton>
        <OutlineButton size="sm">
          <LogIn className="h-4 w-4 mr-2" />
          Log in
        </OutlineButton>
        <OutlineButton size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({cart.length})
        </OutlineButton>
      </div>
    </motion.header>
  );
};

export default TopBar;
