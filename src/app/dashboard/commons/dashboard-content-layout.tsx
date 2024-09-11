import {
  AnimatePresence,
  FramerButton,
  FramerDiv,
  FramerHeader,
} from "@/components/framer";
import { dashboardRoutes } from "@/config/routes";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardContentLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <main className="flex-1 p-8 overflow-auto">
      <FramerHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

        <Link href={dashboardRoutes.addProduct}>
          <FramerButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Product
          </FramerButton>
        </Link>
      </FramerHeader>

      <AnimatePresence mode="wait">
        <FramerDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </FramerDiv>
      </AnimatePresence>
    </main>
  );
};

export default DashboardContentLayout;
