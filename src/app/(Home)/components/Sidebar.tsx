"use client";
import { GhostButton } from "@/components/buttonts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren } from "../constants";
import { categories } from "../data";

const Aside = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="border-r border-blue-200 bg-white overflow-hidden"
    >
      <ScrollArea className="h-full">
        <motion.div
          className="space-y-1 p-4"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <GhostButton
                variant="ghost"
                className="w-full justify-start text-left font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-800"
              >
                <span className="mr-2 text-lg">{category.emoji}</span>
                <span className="text-sm">{category.name}</span>
              </GhostButton>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </motion.aside>
  );
};

export default Aside;
