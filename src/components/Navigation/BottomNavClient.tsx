"use client";

import { FramerDiv } from "@/components/framer";
import { routes } from "@/config/routes";
import { ICategoryResponse } from "@/types/category.types";
import { BookOpen, ChartSpline, Globe, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Searcher from "../Search/Searcher";
import { fadeInUp } from "../Sidebar/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type NavigationItemBase = {
  icon: typeof Globe;
  label: string;
};

type NavigationItem =
  | (NavigationItemBase & { href: string; type?: never })
  | (NavigationItemBase & { type: "search"; href?: never })
  | (NavigationItemBase & { type: "library"; href?: never });

const navigationItems: NavigationItem[] = [
  { icon: Globe, label: "Discover", href: routes.home },
  { icon: Search, label: "Search", type: "search" },
  { icon: ChartSpline, label: "Analytics", href: routes.analytics },
  { icon: BookOpen, label: "Library", type: "library" },
];

export function BottomNavClient({
  categories,
}: {
  categories: ICategoryResponse[];
}) {
  const pathname = usePathname();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = "href" in item ? pathname === item.href : false;

            if (item.type === "search") {
              return (
                <Searcher
                  key="search"
                  customTrigger={
                    <button className="flex flex-col items-center justify-center flex-1 h-full text-gray-600">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs mt-1">{item.label}</span>
                    </button>
                  }
                />
              );
            }

            if (item.type === "library") {
              return (
                <Sheet key="library">
                  <SheetTrigger asChild>
                    <button
                      className={`flex flex-col items-center justify-center flex-1 h-full
                        ${isLibraryOpen ? "text-blue-600" : "text-gray-600"}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs mt-1">{item.label}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[70vh]">
                    <SheetHeader>
                      <SheetTitle>Categories</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {categories.map((category, index) => (
                        <FramerDiv key={index} variants={fadeInUp}>
                          <Link
                            href={`${routes.home}?category=${category.name}`}
                            className="block"
                          >
                            <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                              <span className="text-xl">{category.emoji}</span>
                              <span className="text-sm text-gray-700">
                                {category.name}
                              </span>
                            </div>
                          </Link>
                        </FramerDiv>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                className={`flex flex-col items-center justify-center flex-1 h-full
                  ${isActive ? "text-blue-600" : "text-gray-600"}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
