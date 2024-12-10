"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allDocs } from "../../../.contentlayer/generated";
import { DocSearch } from "./doc-search";

interface DocsGroup {
  title: string;
  items: typeof allDocs;
}

function groupDocs(docs: typeof allDocs): DocsGroup[] {
  const groups: Record<string, typeof allDocs> = {};

  docs.forEach((doc) => {
    const group = doc.group || "Other";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(doc);
  });

  return Object.entries(groups).map(([title, items]) => ({
    title,
    items: items.sort((a, b) => a.order - b.order),
  }));
}

export function DocsSidebar() {
  const pathname = usePathname();
  const groups = groupDocs(allDocs);

  return (
    <div className="w-full py-4">
      {/* Search in Sidebar */}
      <div className="px-4 mb-6">
        <DocSearch />
      </div>

      {/* Documentation Groups */}
      {groups.map((group) => (
        <div key={group.title} className="mb-6 px-4">
          <h4 className="mb-1 px-2 text-[13px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            {group.title}
          </h4>
          <div className="mt-2">
            {group.items.map((doc) => (
              <Link
                key={doc._id}
                href={`/${doc.slug}`}
                className={cn(
                  "block py-2 px-3 text-sm transition-colors rounded-md relative",
                  pathname === `/${doc.slug}`
                    ? "text-blue-600 font-medium bg-blue-200/50 dark:bg-blue-900/50"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-200/30 dark:hover:bg-blue-900/30"
                )}
              >
                {doc.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
