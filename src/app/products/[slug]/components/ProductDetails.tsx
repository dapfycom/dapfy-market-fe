import { FramerDiv, FramerH1, FramerP } from "@/components/framer";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { PricingType } from "@/types/product.types";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
const ProductDetails = ({
  title,
  description,
  price,
  averageRating,
  totalReviews,
  storeName,
  storeSlug,
  paymentType,
}: {
  storeName: string;
  storeSlug: string;
  title: string;
  description: string;
  price: string;
  averageRating: number;
  totalReviews: number;
  paymentType: PricingType;
}) => {
  return (
    <div className="p-8 w-full flex flex-col justify-between">
      <div>
        <FramerDiv
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
            Digital Product
          </div>
          <div className="text-sm text-gray-500">
            Created by{" "}
            <Link href={`${routes.stores}/${storeSlug}`}>
              <span className="font-semibold text-gray-700">{storeName}</span>
            </Link>
          </div>
        </FramerDiv>
        <FramerH1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl leading-8 font-bold tracking-tight text-gray-900"
        >
          {title}
        </FramerH1>
        <FramerDiv
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-2 flex items-center"
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {averageRating} ({totalReviews} reviews)
          </span>
        </FramerDiv>
        <FramerP
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-xl text-gray-500"
        >
          {description}
        </FramerP>
      </div>
      <FramerDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6"
      >
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        <span className="ml-2 text-lg text-gray-500">USD</span>
        <span className="ml-2 text-sm text-green-600 font-semibold">
          {paymentType === "SINGLE" ? "One-time payment" : "Subscription"}
        </span>
        <Button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          size="lg"
        >
          <ShoppingCart className="mr-2" />
          Buy This Digital Product
        </Button>
      </FramerDiv>
    </div>
  );
};

export default ProductDetails;
