"use client";
import { selectTab, setTab } from "@/store/slices/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Stores from "../stores/components/Stores";
import AddProduct from "./views/AddProduct";
import Dashboard from "./views/Dashboard";
import DigitalProducts from "./views/DigitalProducts";
import LeadMagnet from "./views/LeadMagnet";
import MyOrders from "./views/MyOrders";
import Upgrade from "./views/Upgrade";

const Content = () => {
  const activeTab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();

  const setActiveTab = (tab: string) => {
    dispatch(setTab(tab));
  };
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Stores":
        return <Stores />;
      case "Digital Products":
        return <DigitalProducts />;
      case "My Orders":
        return <MyOrders />;
      case "Add Product":
        return <AddProduct />;
      case "Lead Magnet":
        return <LeadMagnet />;
      case "Upgrade to Pro":
        return <Upgrade />;
      default:
        return null;
    }
  };
  return (
    <main className="flex-1 p-8 overflow-auto">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">{activeTab}</h1>
        {activeTab !== "Add Product" &&
          activeTab !== "Upgrade to Pro" &&
          activeTab !== "Lead Magnet" &&
          activeTab !== "Stores" &&
          activeTab !== "My Orders" &&
          activeTab !== "Digital Products" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={() => setActiveTab("Add Product")}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Product
            </motion.button>
          )}
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Content;
