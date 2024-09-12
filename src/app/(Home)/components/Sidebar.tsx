"use client";
import { GhostButton } from "@/components/buttonts";
import { FramerAside, FramerDiv } from "@/components/framer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectSidebarOpen } from "@/store/slices/commonSlice";
import { useAppSelector } from "@/store/store";
import { ICategoryResponse } from "@/types/category.types";
import { fadeInUp, staggerChildren } from "../constants";

const Aside = ({ categories }: { categories: ICategoryResponse[] }) => {
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
          {categories.map((category, index) => (
            <FramerDiv key={index} variants={fadeInUp}>
              <GhostButton
                variant="ghost"
                className="w-full justify-start text-left font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-800"
              >
                {category.emoji && (
                  <span className="mr-2 text-lg">{category.emoji}</span>
                )}
                <span className="text-sm">{category.name}</span>
              </GhostButton>
            </FramerDiv>
          ))}
        </FramerDiv>
      </ScrollArea>
    </FramerAside>
  );
};

export default Aside;
