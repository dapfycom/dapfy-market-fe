import React from "react";
import Aside from "../(Home)/components/Sidebar";
import TopBar from "../(Home)/components/TopBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        {children}
      </main>
    </div>
  );
};

export default layout;
