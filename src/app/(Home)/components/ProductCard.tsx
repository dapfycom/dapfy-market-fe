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
import { addToCart } from "@/store/slices/commonSlice";
import { useAppDispatch } from "@/store/store";
import { IProductResponse } from "@/types/product.types";
import { Eye, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: IProductResponse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product as any));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Link href={`${routes.products}/${product.slug}`}>
      <Card
        className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl bg-gradient-to-br from-white to-blue-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 overflow-hidden">
          <div className="relative overflow-hidden">
            <Image
              src={product.images[0]?.url || "/images/default-product.png"}
              alt={product.title}
              className={`h-48 w-full object-cover transition-transform duration-300 ease-in-out ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              width={256}
              height={192}
              quality={100}
            />
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
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
          <Button
            className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="w-full border-blue-300 text-blue-800 hover:bg-blue-100 transition-colors duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            {product.viewCount}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
