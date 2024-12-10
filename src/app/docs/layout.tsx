"use client";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-[280px] overflow-y-auto border-r border-blue-200 bg-blue-100 dark:bg-gray-800 dark:border-gray-700 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200">
            <Link href="/">
              <Logo />
            </Link>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <DocsSidebar />

          {/* Bottom Links */}
          <div className="mt-auto border-t border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Blog
                </Link>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600"
                asChild
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-[280px]">
        {/* Top Navigation Bar */}
        <div className="h-[64px] fixed top-0 left-0 right-0 md:left-[280px] border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 z-10 flex items-center justify-between px-6">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
            >
              GitHub
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-[64px]">
          <div className="container max-w-4xl py-12 px-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
