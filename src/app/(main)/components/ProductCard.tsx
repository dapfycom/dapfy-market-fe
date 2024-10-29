/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import productsService from "@/services/productsServices";
import { IProductResponse } from "@/types/product.types";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";

const ProductCard = ({
  product,
  small,
}: {
  product: IProductResponse;
  small: boolean;
}) => {
  const { data, mutate } = useSWR("/products/bookmarks", (args) =>
    productsService.getBookmarkedProducts({
      take: 1000,
    })
  );

  const isBookmarked = data?.data.data.some((p) => p.id === product.id);

  const onBookMark = async () => {
    toast.promise(productsService.bookmarkProduct(product.id), {
      loading: "Booking product...",
      success: "Product bookmarked",
      error: "Failed to bookmark product",
    });
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="p-0 ">
          <div
            className={cn("relative overflow-hidden ", small ? "h-40" : "h-60")}
          >
            <Link href={`${routes.products}/${product.slug}`}>
              <img
                src={product.images[0]?.url || "/images/default-product.png"}
                alt={product.title}
                className={cn(
                  `w-full object-cover  transition-transform duration-300 ease-in-out `
                )}
                width={256}
                height={256}
              />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle
            className={cn(
              "text-lg font-bold mb-2 text-gray-900",
              small ? "text-md" : "text-lg"
            )}
          >
            {product.title}
          </CardTitle>
          <div
            className={cn(
              "break-word mt-two line-clamp-2 text-balance mb-4 dark:text-white/50 !text-black/60 default font-sans text-base selection:bg-super/50 ",
              small ? "text-sm" : "text-base"
            )}
          >
            {product.description}
          </div>
          <div className="flex justify-between w-full items-center">
            <Link href={`${routes.stores}/${product.store.slug}`}>
              <div className="flex items-center space-x-2">
                <Avatar className="w-5 h-5">
                  <AvatarFallback>
                    {product.store.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                  <AvatarImage src={product.store.logo} />
                </Avatar>

                <div className="text-xs text-gray-500">
                  {product.store.name}.
                </div>
              </div>
            </Link>

            <div className="cursor-pointer" onClick={onBookMark}>
              {isBookmarked ? (
                <Bookmark className="w-4 h-4 text-primary" color="blue" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
