"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { allDocs } from "../../../.contentlayer/generated";

interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export function DocSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredDocs =
    query === ""
      ? []
      : allDocs
          .filter((doc) => {
            const searchContent = `${doc.title} ${doc.body.raw}`.toLowerCase();
            return searchContent.includes(query.toLowerCase());
          })
          .map((doc) => ({
            title: doc.title,
            url: `/${doc.slug}`,
            content: doc.body.raw.slice(0, 100) + "...",
          }))
          .slice(0, 5);

  const onSelect = useCallback(
    (url: string) => {
      setIsOpen(false);
      router.push(url);
    },
    [router]
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search documentation..."
          className="pl-8 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
          onClick={() => setIsOpen(true)}
          readOnly
        />
      </div>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search documentation..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {filteredDocs.map((doc) => (
              <CommandItem
                key={doc.url}
                onSelect={() => onSelect(doc.url)}
                className="flex flex-col items-start"
              >
                <div className="font-medium">{doc.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {doc.content}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
