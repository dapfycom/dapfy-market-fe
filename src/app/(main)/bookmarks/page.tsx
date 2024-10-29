import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { BookmarkedProducts } from "./components/bookmarked-products";

export const metadata = {
  title: "My Bookmarks | Marketplace",
  description: "View and manage your bookmarked products",
};

export default function BookmarksPage() {
  return (
    <div className="container py-8 space-y-8">
      <Suspense fallback={<BookmarksGridSkeleton />}>
        <BookmarkedProducts />
      </Suspense>
    </div>
  );
}

function BookmarksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      ))}
    </div>
  );
}
