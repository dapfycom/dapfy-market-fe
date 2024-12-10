import { DocSearch } from "@/components/docs/doc-search";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="container relative max-w-5xl py-10">
      <div className="flex flex-col items-center text-center space-y-4 pb-8">
        <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-2 mb-4 ring-1 ring-blue-500/40">
          <BookOpen className="h-6 w-6 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-[85%]">
          Learn how to build amazing applications with our comprehensive guides
          and tutorials.
        </p>
        <div className="w-full max-w-md mt-6">
          <DocSearch />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-8">
        <Link
          href="/docs/getting-started"
          className="group relative rounded-lg border p-6 hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2.5">
              <ArrowRight className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center group-hover:text-blue-500 transition-colors">
                Getting Started
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quick start guide to setup your project and understand the
                basics.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/components"
          className="group relative rounded-lg border p-6 hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2.5">
              <ArrowRight className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center group-hover:text-blue-500 transition-colors">
                Components
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore our collection of pre-built components and learn how to
                use them.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/api-reference"
          className="group relative rounded-lg border p-6 hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2.5">
              <ArrowRight className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center group-hover:text-blue-500 transition-colors">
                API Reference
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed API documentation for all features and functionalities.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/examples"
          className="group relative rounded-lg border p-6 hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2.5">
              <ArrowRight className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center group-hover:text-blue-500 transition-colors">
                Examples
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-world examples and code snippets to help you build faster.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-12 rounded-lg border bg-gradient-to-br from-blue-500/[0.04] to-blue-600/[0.04] p-8 text-gray-900 dark:text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold">Open Source</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our documentation is open source. Feel free to contribute and help
              us improve!
            </p>
          </div>
          <Button
            variant="outline"
            className="border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-500"
            asChild
          >
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
