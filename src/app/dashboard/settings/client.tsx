"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Briefcase, Heart, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

const Business = dynamic(() => import("./components/Business/Business"), {
  ssr: false,
});
const Interests = dynamic(() => import("./components/Interests/Interests"), {
  ssr: false,
});
const Notifications = dynamic(
  () => import("./components/Notifications/Notifications"),
  {
    ssr: false,
  }
);
const Personal = dynamic(() => import("./components/Personal/Personal"), {
  ssr: false,
});

export const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "personal";

  const handleTabChange = (tabId: string) => {
    router.push(`/dashboard/settings?tab=${tabId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <Personal />;
      case "business":
        return <Business />;
      case "interests":
        return <Interests />;
      case "notifications":
        return <Notifications />;
      default:
        return <Personal />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Settings ⚙️</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "personal", icon: User, label: "Personal", emoji: "👤" },
              {
                id: "business",
                icon: Briefcase,
                label: "Business",
                emoji: "💼",
              },
              { id: "interests", icon: Heart, label: "Interests", emoji: "❤️" },
              {
                id: "notifications",
                icon: Bell,
                label: "Notifications",
                emoji: "🔔",
              },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                className={`h-10 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => handleTabChange(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label} {item.emoji}
              </Button>
            ))}
          </div>
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
