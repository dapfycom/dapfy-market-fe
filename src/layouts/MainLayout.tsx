import Aside from "@/components/Sidebar/Sidebar";
import TopBar from "@/components/TopBar";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
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
