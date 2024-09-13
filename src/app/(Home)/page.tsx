import Content from "./components/Content";
import Aside from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default function DigitalMarketplace() {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <Content />
      </main>
    </div>
  );
}
