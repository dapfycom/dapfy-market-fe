/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { useLogin } from "@/hooks/useLogin";
import { useAppDispatch } from "@/store/store";
import { IProductResponse } from "@/types/product.types";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComparisonModal from "./ComparisonModal";

const ProductCard = ({ product }: { product: IProductResponse }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { handleOpenLoginModal } = useLogin();

  const dispatch = useAppDispatch();
  const { user } = useGetCurrentUser();

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsComparisonOpen(true);
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      handleOpenLoginModal();
      return;
    }
    setIsBuyingNow(true);
    router.push(`${routes.checkout}/${product.id}`);
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
                className={`h-72 w-full object-cover transition-transform duration-300 ease-in-out ${
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
          <div className="line-clamp-2 mb-3">{product.description}</div>
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {product.store.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={product.store.logo} />
              </Avatar>

              <div className="text-sm text-gray-500">{product.store.name}</div>
            </div>

            <div className="cursor-pointer">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </>
  );
};

export default ProductCard;
