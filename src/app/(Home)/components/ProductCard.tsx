/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";
import { formatPrice } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { IProductResponse } from "@/types/product.types";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ComparisonModal from "./ComparisonModal";

const ProductCard = ({ product }: { product: IProductResponse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const dispatch = useAppDispatch();

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   dispatch(addToCart(product as any));
  //   toast.success(`${product.title} added to cart`);
  // };
  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsComparisonOpen(true);
  };
  return (
    <>
      <Card
        className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl bg-gradient-to-br from-white to-blue-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 overflow-hidden">
          <div className="relative overflow-hidden">
            <Link href={`${routes.products}/${product.slug}`}>
              <img
                src={product.images[0]?.url || "/images/default-product.png"}
                alt={product.title}
                className={`h-48 w-full object-cover transition-transform duration-300 ease-in-out ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
                width={256}
                height={256}
              />
            </Link>
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {product.category.emoji} {product.category.name}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold mb-2 text-blue-900">
            {product.title}
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-800">
              ${formatPrice(product.price)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="text-sm  mt-2">{product.viewCount} views 👀</div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
            🎧 Buy Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-blue-300 text-blue-800 hover:bg-blue-100 transition-colors duration-300"
            onClick={handleCompare}
          >
            📊 Compare
          </Button>
        </CardFooter>
      </Card>

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </>
  );
};

export default ProductCard;
