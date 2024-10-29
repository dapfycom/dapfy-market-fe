"use client";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import productsService from "@/services/productsServices";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { BookmarkCard } from "./bookmark-card";

export const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.meta.hasNextPage) return null;
  return { page: pageIndex + 1, limit: 12, endpoint: "/products/bookmarks" };
};

export function BookmarkedProducts() {
  const { ref, inView } = useInView();

  const {
    data,
    size,
    setSize,
    isLoading,
    error,
    mutate: revalidateBookmarks,
  } = useSWRInfinite(getKey, (args) =>
    productsService.getBookmarkedProducts(args)
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasNextPage = data?.at(-1)?.data.meta.hasNextPage;

  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, setSize, size]);

  if (isLoading) return null;
  if (error) {
    if (error.request.status === 401) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
          <div className="rounded-lg bg-red-50 p-8 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Authentication Required
            </h3>
            <p className="text-red-600">
              Please log in to view your bookmarked products
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="rounded-lg bg-red-50 p-8 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Bookmarks
          </h3>
          <p className="text-red-600 mb-4">
            There was a problem loading your bookmarked products. Please try
            again later.
          </p>
          <Button
            variant="outline"
            className="hover:bg-red-100"
            onClick={() => revalidateBookmarks()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const products = data?.flatMap((page) => page.data.data) ?? [];

  if (products.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        description="Products you bookmark will appear here"
        className="min-h-[400px]"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <BookmarkCard
            key={product.id}
            product={product}
            onRemove={() => revalidateBookmarks()}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoadingMore && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </>
  );
}
