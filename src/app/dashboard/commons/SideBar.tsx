"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dashboardRoutes, routes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { selectIsSidebarOpen } from "@/store/slices/dashboardSlice";
import { useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import {
  BarChart,
  Edit2,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    name: "Customers",
    icon: UserIcon,
    emoji: "👥",
    route: dashboardRoutes.customers,
  },
  {
    name: "Email Marketing",
    icon: Mail,
    emoji: "📧",
    route: dashboardRoutes.emailMarketing,
  },
  {
    name: "My Orders",
    icon: ShoppingCart,
    emoji: "🛒",
    route: dashboardRoutes.myOrders,
  },
];

const SideBar = () => {
  const { user } = useGetCurrentUser();
  const username = user?.name?.split("@")[0];
  const currentPath = usePathname();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const [userName, setUserName] = useState(username);
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  useEffect(() => {
    setUserName(username);
  }, [username]);

  return (
    <motion.aside
      initial={{ width: isSidebarOpen ? 256 : 80 }}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md flex flex-col"
    >
      <div className="p-4 border-b border-gray-200">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href={routes.home}>
            {isSidebarOpen ? (
              <>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Dapfy Market
              </>
            ) : (
              <span className="text-2xl">🏪</span>
            )}
          </Link>
        </Button>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar || ""} alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {isSidebarOpen && (
            <div className="ml-3">
              {isEditingUserName ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={() => setIsEditingUserName(false)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && setIsEditingUserName(false)
                  }
                  className="text-sm font-semibold text-gray-800 w-full outline-none"
                  autoFocus
                />
              ) : (
                <p className="font-semibold text-gray-800 flex items-center">
                  {userName}
                  <button
                    onClick={() => setIsEditingUserName(true)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 size={12} />
                  </button>
                </p>
              )}
              <p className="text-[11px] text-gray-500">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
      <nav className="flex-grow mt-4">
        {sidebarItems.map((item) => (
          <Link href={item.route} key={item.name}>
            <motion.button
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
              {isSidebarOpen && item.name}
            </motion.button>
          </Link>
        ))}
      </nav>
      <Link href={dashboardRoutes.settings}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full px-4 py-3 text-left text-gray-600 hover:bg-blue-50 border-t border-gray-200"
        >
          <Settings className="w-5 h-5 mr-3" />
          {isSidebarOpen && "Settings"}
        </motion.button>
      </Link>
    </motion.aside>
  );
};

export default SideBar;
