"use client";
import { FramerAside, FramerDiv } from "@/components/framer";
import { selectSidebarOpen } from "@/store/slices/commonSlice";
import { useAppSelector } from "@/store/store";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { staggerChildren } from "./constants";

const SideBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ariaChecked = isClient
    ? sidebarOpen
    : (getCookie("sidebarOpen") as unknown as boolean);

  return (
    <FramerAside
      initial={false}
      animate={{ width: ariaChecked ? 220 : 90 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="border-r border-blue-200 bg-blue-100 overflow-hidden h-full relative z-20"
    >
      {isClient ? (
        <FramerDiv
          className="space-y-1 py-4 h-full group"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          aria-checked={ariaChecked}
        >
          {children}
        </FramerDiv>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </FramerAside>
  );
};

export default SideBarWrapper;
