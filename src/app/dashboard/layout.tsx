import React from "react";
import SideBar from "./components/SideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}

      {children}
    </div>
  );
};

export default layout;
