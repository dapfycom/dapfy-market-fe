"use client";
import { AnimatePresence, FramerButton, FramerDiv } from "@/components/framer";
import { dashboardRoutes } from "@/config/routes";
import {
  selectIsSidebarOpen,
  setIsSidebarOpen,
} from "@/store/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardContentLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const dispatch = useAppDispatch();

  const handleOpenSidebar = () => {
    dispatch(setIsSidebarOpen(!isSidebarOpen));
  };
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <FramerButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white shadow"
          onClick={handleOpenSidebar}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </FramerButton>
        <Link href={dashboardRoutes.addProduct}>
          <FramerButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create 🚀
          </FramerButton>
        </Link>
      </div>
      <AnimatePresence mode="wait">
        <FramerDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </FramerDiv>
      </AnimatePresence>
    </main>
  );
};

export default DashboardContentLayout;
