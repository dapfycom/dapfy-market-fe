"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

const categories = [
  { name: "All", emoji: "🏠" },
  { name: "Artificial intelligence", emoji: "🤖" },
  { name: "Productivity", emoji: "📈" },
  { name: "Marketing", emoji: "📢" },
  { name: "Developer tools", emoji: "💻" },
  { name: "Design", emoji: "🎨" },
];
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const MainLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <div>
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
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                >
                  <span className="mr-2 text-lg">{category.emoji}</span>
                  <span className="text-sm">{category.name}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </motion.aside>

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
