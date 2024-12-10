"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allDocs } from "../../../.contentlayer/generated";

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
  console.log(allDocs);

  const groups = groupDocs(allDocs);

  return (
    <div className="w-full py-8 px-4">
      {groups.map((group) => (
        <div key={group.title} className="mb-8">
          <h4 className="mb-4 font-semibold text-sm text-foreground/60">
            {group.title}
          </h4>
          <div className="flex flex-col space-y-1">
            {group.items.map((doc) => (
              <Link
                key={doc._id}
                href={`/docs/${doc.slug}`}
                className={cn(
                  "block py-1.5 px-3 text-sm transition-colors rounded-md",
                  pathname === doc.slug
                    ? "text-foreground font-medium bg-accent"
                    : "text-foreground/60 hover:text-foreground hover:bg-accent/50"
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
