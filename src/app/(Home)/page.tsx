import Content from "./components/Content";
import Aside from "./components/Sidebar";
import TopBar from "./components/TopBar";

interface DigitalMarketplaceProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DigitalMarketplace({
  searchParams,
}: DigitalMarketplaceProps) {
  const category = searchParams.category as string | undefined;
  const search = searchParams.search as string | undefined;

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <Content category={category || "All"} search={search} />
      </main>
    </div>
  );
}
