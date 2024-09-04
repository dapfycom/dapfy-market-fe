"use client";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { selectTab, setTab } from "@/store/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import {
  BarChart,
  DollarSign,
  Edit2,
  Gift,
  Magnet,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const sidebarItems = [
  { name: "Dashboard", icon: BarChart, emoji: "📊" },
  { name: "Stores", icon: ShoppingBag, emoji: "🏪" },
  { name: "Digital Products", icon: Package, emoji: "📦" },
  { name: "Lead Magnet", icon: Magnet, emoji: "🧲" },
  { name: "Memberships", icon: Users, emoji: "🤝" },
  { name: "Fundraising", icon: Gift, emoji: "🎁" },
  { name: "Payouts", icon: DollarSign, emoji: "💰" },
  { name: "My Orders", icon: ShoppingCart, emoji: "🛒" },
  { name: "Upgrade to Pro", icon: Zap, emoji: "⚡" },
];

const SideBar = () => {
  const { user } = useGetCurrentUser();
  const [storeName, setStoreName] = useState("My Digital Store");
  const [isEditingName, setIsEditingName] = useState(false);
  const activeTab = useAppSelector(selectTab);
  const username = user?.username.split("@")[0];

  const dispatch = useAppDispatch();

  const setActiveTab = (tab: string) => {
    dispatch(setTab(tab));
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white shadow-md flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        {isEditingName ? (
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
            className="text-xl font-bold text-blue-600 w-full outline-none"
            autoFocus
          />
        ) : (
          <h2 className="text-xl font-bold text-blue-600 flex items-center">
            {storeName}
            <button
              onClick={() => setIsEditingName(true)}
              className="ml-2 text-blue-400 hover:text-blue-600"
            >
              <Edit2 size={16} />
            </button>
          </h2>
        )}
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Image
            src={user?.avatar || "/images/person.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold text-gray-800">{username}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-grow mt-4">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center w-full px-4 py-3 text-left ${
              activeTab === item.name
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            <span className="w-8 h-8 flex items-center justify-center text-xl mr-3">
              {item.emoji}
            </span>
            {item.name}
          </motion.button>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center w-full px-4 py-3 text-left text-gray-600 hover:bg-blue-50 mt-auto border-t border-gray-200"
        onClick={() => setActiveTab("Settings")}
      >
        <span className="w-8 h-8 flex items-center justify-center text-xl mr-3">
          ⚙️
        </span>
        Settings
      </motion.button>
    </motion.aside>
  );
};

export default SideBar;
