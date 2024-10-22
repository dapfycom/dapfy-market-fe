"use client";
import { FramerAside, FramerDiv } from "@/components/framer";
import { selectSidebarOpen } from "@/store/slices/commonSlice";
import { useAppSelector } from "@/store/store";
import React, { useEffect, useState } from "react";
import { staggerChildren } from "./constants";

const SideBarWrapper = ({
  children,
  defaultSidebarOpen,
}: {
  children: React.ReactNode;
  defaultSidebarOpen: boolean;
}) => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ariaChecked = isClient ? sidebarOpen : defaultSidebarOpen;

  return (
    <FramerAside
      initial={false}
      animate={{ width: ariaChecked ? 220 : 90 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="border-r border-blue-200 bg-blue-100/70 overflow-hidden h-full relative z-20"
    >
      <FramerDiv
        className="space-y-1 py-4 h-full group"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        aria-checked={ariaChecked}
      >
        {children}
      </FramerDiv>
    </FramerAside>
  );
};

export default SideBarWrapper;
