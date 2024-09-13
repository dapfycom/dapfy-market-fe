"use client";
import { FramerAside, FramerDiv } from "@/components/framer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectSidebarOpen } from "@/store/slices/commonSlice";
import { useAppSelector } from "@/store/store";
import React from "react";
import { staggerChildren } from "../constants";

const SideBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);

  return (
    <FramerAside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="border-r border-blue-200 bg-white overflow-hidden"
    >
      <ScrollArea className="h-full">
        <FramerDiv
          className="space-y-1 p-4"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          {children}
        </FramerDiv>
      </ScrollArea>
    </FramerAside>
  );
};

export default SideBarWrapper;
