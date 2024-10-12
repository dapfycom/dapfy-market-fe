"use client";
import Aside from "@/components/Sidebar/Sidebar";
import TopBar from "@/components/TopBar";
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
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <main>{children}</main>
      </main>
    </div>
  );
};

export default MainLayout;
