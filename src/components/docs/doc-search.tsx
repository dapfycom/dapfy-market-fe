"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function DocSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search documentation..." className="pl-8" />
    </div>
  );
}
