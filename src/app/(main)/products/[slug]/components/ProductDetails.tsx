import { FramerDiv, FramerH1, FramerP } from "@/components/framer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/config/routes";
import { PricingType } from "@/types/product.types";
import { Eye, User } from "lucide-react";
import Link from "next/link";
const ProductDetails = ({
  title,
  description,
  price,
  averageRating,
  totalReviews,
  storeName,
  storeSlug,
  storeImage,
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
  storeImage: string;
}) => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div>
        <FramerDiv
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          {/* <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
            Digital Product
          </div> */}
          {/* <div className="text-sm text-gray-500">
            Created by{" "}
            <Link href={`${routes.stores}/${storeSlug}`}>
              <span className="font-semibold text-gray-700">{storeName}</span>
            </Link>
          </div> */}
        </FramerDiv>
        <FramerH1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full mb-6 whitespace-pre-wrap break-words default font-display text-4xl md:text-[2.8rem] !leading-[1.2] "
        >
          {title}
        </FramerH1>
        <div className="mb-6 flex items-center gap-2 justify-between">
          <Link href={`${routes.stores}/${storeSlug}`}>
            <div className="flex  items-center gap-2 max-w-[200px] ">
              <Avatar>
                <AvatarFallback>
                  <User />
                </AvatarFallback>
                <AvatarImage src={storeImage} alt={storeName} />
              </Avatar>
              <span className="text-sm text-gray-500 text-wrap">
                Created by <span className="">{storeName}</span>
              </span>
            </div>
          </Link>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="text-sm text-gray-500">100</span>
            </div>
          </div>
        </div>
        {/* <FramerDiv
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
        </FramerDiv> */}
        <FramerP
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-base  first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:mt-1"
        >
          <span className="leading-6 break-words min-w-0 [word-break:break-word] ">
            {description}
          </span>
        </FramerP>
      </div>
      {/* <FramerDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6"
      >
        <span className="text-3xl font-bold text-gray-900">${price}</span>
        <span className="ml-2 text-lg text-gray-500">USD</span>
        <span className="ml-2 text-sm text-green-600 font-semibold">
          {paymentType === "SINGLE" ? "One-time payment" : "Subscription"}
        </span>z
        <Button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          size="lg"
        >
          <ShoppingCart className="mr-2" />z
          Buy This Digital Product
        </Button>
      </FramerDiv> */}
    </div>
  );
};

export default ProductDetails;
