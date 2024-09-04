
import Content from "./components/Content";
import SideBar from "./components/SideBar";

export default function DashboardPage() {



  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Content />

   
    </div>
  );
}
