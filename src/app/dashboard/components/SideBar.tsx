"use client";
import { FramerButton } from "@/components/framer";
import { dashboardRoutes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const sidebarItems = [
  {
    name: "Dashboard",
    icon: BarChart,
    emoji: "📊",
    route: dashboardRoutes.dashboard,
  },
  {
    name: "Stores",
    icon: ShoppingBag,
    emoji: "🏪",
    route: dashboardRoutes.stores,
  },
  {
    name: "Digital Products",
    icon: Package,
    emoji: "📦",
    route: dashboardRoutes.products,
  },
  {
    name: "Lead Magnet",
    icon: Magnet,
    emoji: "🧲",
    route: dashboardRoutes.leadMagnet,
  },
  {
    name: "Memberships",
    icon: Users,
    emoji: "🤝",
    route: dashboardRoutes.memberships,
  },
  {
    name: "Fundraising",
    icon: Gift,
    emoji: "🎁",
    route: dashboardRoutes.fundraising,
  },
  {
    name: "Payouts",
    icon: DollarSign,
    emoji: "💰",
    route: dashboardRoutes.payouts,
  },
  {
    name: "My Orders",
    icon: ShoppingCart,
    emoji: "🛒",
    route: dashboardRoutes.myOrders,
  },
  {
    name: "Upgrade to Pro",
    icon: Zap,
    emoji: "⚡",
    route: dashboardRoutes.upgradeToPro,
  },
];

const SideBar = () => {
  const { user } = useGetCurrentUser();
  const [storeName, setStoreName] = useState("My Digital Store");
  const [isEditingName, setIsEditingName] = useState(false);
  const username = user?.username.split("@")[0];

  const currentPath = usePathname();

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
          <Link href={item.route} key={item.name}>
            <FramerButton
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center w-full px-4 py-3 text-left ${
                currentPath === item.route
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              <span className="w-8 h-8 flex items-center justify-center text-xl mr-3">
                {item.emoji}
              </span>
              {item.name}
            </FramerButton>
          </Link>
        ))}
      </nav>
      <Link href={dashboardRoutes.settings}>
        <FramerButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full px-4 py-3 text-left text-gray-600 hover:bg-blue-50 mt-auto border-t border-gray-200"
          // onClick={() => setActiveTab("Settings")}
        >
          <span className="w-8 h-8 flex items-center justify-center text-xl mr-3">
            ⚙️
          </span>
          Settings
        </FramerButton>
      </Link>
    </motion.aside>
  );
};

export default SideBar;
