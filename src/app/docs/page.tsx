import { DocSearch } from "@/components/docs/doc-search";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to build amazing applications with our comprehensive guides and tutorials.",
};

export default function DocsPage() {
  return (
    <div className="container relative max-w-5xl py-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-4 pb-8">
        <div className="rounded-full bg-muted p-2 mb-4">
          <BookOpen className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-[85%]">
          Learn how to build amazing applications with our comprehensive guides
          and tutorials.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-md mt-6">
          <DocSearch />
        </div>
      </div>

      {/* Featured Sections */}
      <div className="grid md:grid-cols-2 gap-6 pt-8">
        <Link
          href="/docs/getting-started"
          className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
        >
          <h2 className="font-semibold mb-2 flex items-center">
            Getting Started
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Quick start guide to setup your project and understand the basics.
          </p>
        </Link>

        <Link
          href="/docs/components"
          className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
        >
          <h2 className="font-semibold mb-2 flex items-center">
            Components
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore our collection of pre-built components and learn how to use
            them.
          </p>
        </Link>

        <Link
          href="/docs/api-reference"
          className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
        >
          <h2 className="font-semibold mb-2 flex items-center">
            API Reference
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Detailed API documentation for all features and functionalities.
          </p>
        </Link>

        <Link
          href="/docs/examples"
          className="group relative rounded-lg border p-6 hover:border-foreground/50 transition-colors"
        >
          <h2 className="font-semibold mb-2 flex items-center">
            Examples
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world examples and code snippets to help you build faster.
          </p>
        </Link>
      </div>

      {/* GitHub Section */}
      <div className="mt-12 rounded-lg border bg-card p-8 text-card-foreground">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold">Open Source</h3>
            <p className="text-sm text-muted-foreground">
              Our documentation is open source. Feel free to contribute and help
              us improve!
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="mr-2 h-4 w-4" />
              Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
