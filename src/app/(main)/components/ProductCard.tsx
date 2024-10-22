/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { useLogin } from "@/hooks/useLogin";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { IProductResponse } from "@/types/product.types";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComparisonModal from "./ComparisonModal";

const ProductCard = ({
  product,
  small,
}: {
  product: IProductResponse;
  small: boolean;
}) => {
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
        className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-white to-blue-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 overflow-hidden">
          <div className="relative overflow-hidden">
            <Link href={`${routes.products}/${product.slug}`}>
              <img
                src={product.images[0]?.url || "/images/default-product.png"}
                alt={product.title}
                className={cn(
                  `h-60 w-full object-cover transition-transform duration-300 ease-in-out `,
                  small ? "h-40" : "h-60"
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

            <div className="cursor-pointer">
              <Bookmark className="w-4 h-4" />
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
