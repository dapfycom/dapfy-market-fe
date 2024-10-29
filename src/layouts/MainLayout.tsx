import Aside from "@/components/Sidebar/Sidebar";
import TopBar from "@/components/TopBar";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen bg-blue-50 relative">
      {/* Sidebar */}
      <div className="sticky top-0 bottom-0 h-screen z-20">
        <Aside />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <main className="mx-auto  w-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
