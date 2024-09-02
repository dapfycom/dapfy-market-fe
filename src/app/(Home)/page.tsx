"use client";
import { useEffect, useState } from "react";
import Content from "./components/Content";
import Aside from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default function DigitalMarketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const addToCart = (product: any) => {
    console.log(product);

    setCart([...cart, product]);
    setNotification(`Added ${product.name} to cart!`);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Aside sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <TopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          notification={notification}
          cart={cart}
        />

        {/* Content Area */}
        <Content addToCart={addToCart} />
      </main>
    </div>
  );
}
