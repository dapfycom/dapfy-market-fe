import categoriesService from "@/services/categoriesServices";
import Content from "./components/Content";
import Aside from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default async function DigitalMarketplace() {
  const { data: categories } = await categoriesService.findAll();

  // insert manually "ALL" category
  const allCategory = {
    id: "all",
    name: "All",
    emoji: "🏠",
  };

  categories.unshift(allCategory);

  console.log({ categories });

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside categories={categories} />

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
