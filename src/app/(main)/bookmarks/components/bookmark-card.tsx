"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import productsService from "@/services/productsServices";
import {
  IProductResponse,
  PricingType,
  ProductStatus,
} from "@/types/product.types";
import { Eye, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface BookmarkCardProps {
  product: IProductResponse;
  onRemove: () => void;
}

export function BookmarkCard({ product, onRemove }: BookmarkCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const { trigger: removeBookmark } = useSWRMutation(
    `/products/${product.id}/bookmark`,
    () => productsService.removeBookmark(product.id),
    {
      onSuccess: () => {
        onRemove();
        toast.success("Product removed from bookmarks");
        setIsRemoving(false);
      },
      onError: () => {
        toast.error("Failed to remove bookmark");
        setIsRemoving(false);
      },
    }
  );

  const handleRemove = async () => {
    setIsRemoving(true);
    await removeBookmark();
  };

  return (
    <Card className="overflow-hidden group relative hover:shadow-lg transition-all duration-200 border-muted">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-3 right-3 z-10 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 h-8 w-8"
        onClick={handleRemove}
        disabled={isRemoving}
      >
        <Trash2 className="h-4 w-4 transition-colors" />
      </Button>

      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square relative">
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.status === ProductStatus.PUBLISHED && (
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                Featured
              </span>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <h3 className="font-medium text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.paymentType === PricingType.SUBSCRIPTION
              ? "Subscription"
              : "Fixed price"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {product.category && (
            <span className="bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
              {product.category.name}
            </span>
          )}
          <span className="bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground">
            {product.store.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full inline-block"
              style={{
                backgroundColor: product.isActive ? "#22c55e" : "#ef4444",
              }}
            />
            {product.isActive ? "Active" : "Inactive"}
          </div>
          {product.averageRating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {product.averageRating.toFixed(1)}
            </span>
          )}
          {product.viewCount > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {product.viewCount}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
