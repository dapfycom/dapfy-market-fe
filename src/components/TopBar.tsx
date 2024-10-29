"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
const Login = dynamic(() => import("@/components/Login/Login"), { ssr: false });

const TopBar = () => {
  const path = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[68px]  flex items-center justify-between relative    bg-blue-50 border-b border-blue-200 text-gray-800"
    >
      <div className=" w-full mx-auto h-full max-w-screen-md  md:px-6 pl-5 md:pl-6 flex md:hidden">
        <Logo />
      </div>
      <div className="flex items-center space-x-10 absolute left-0 right-0 top-0 bottom-0 w-full justify-end md:pr-5">
        <Login />
      </div>
    </motion.header>
  );
};

export default TopBar;
