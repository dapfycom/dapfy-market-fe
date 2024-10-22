"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const Login = dynamic(() => import("@/components/Login/Login"), { ssr: false });

const mapRouts = [
  {
    path: "/",
    name: "Discover",
    icon: Globe,
  },
];

const TopBar = () => {
  const path = usePathname();

  const currentRoute = mapRouts.find((route) => route.path === path);
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[68px] fixed top-0 left-0 right-0 flex z-10 items-center justify-between  pl-[219px]  bg-white text-gray-800"
    >
      <div className="flex w-full mx-auto h-full max-w-screen-md px-md md:px-lg px-7">
        {currentRoute && (
          <h1 className="text-3xl flex items-center">
            <currentRoute.icon className="w-7 h-7 mr-2" />
            {currentRoute.name}
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-10 absolute left-0 right-0 top-0 bottom-0 w-full justify-end pr-5">
        <Login />
      </div>
    </motion.header>
  );
};

export default TopBar;
