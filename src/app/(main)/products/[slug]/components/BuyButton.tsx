"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const BuyButton = ({
  title,
  price,
  id,
}: {
  title: string;
  price: string;
  id: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const checkoutUrl = `${routes.checkout}/${id}`;

  const handleClick = useCallback(() => {
    setIsLoading(true);
    router.push(checkoutUrl);
  }, [router, checkoutUrl]);

  const prefetchCheckoutPage = useCallback(() => {
    router.prefetch(checkoutUrl);
  }, [router, checkoutUrl]);

  useEffect(() => {
    // Prefetch the page when the component mounts
    prefetchCheckoutPage();
  }, [prefetchCheckoutPage]);

  return (
    <div className="fixed bottom-10 left-0 right-0 w-full">
      <div className=" w-fit mx-auto ">
        <Button
          className="w-full px-10 rounded-full h-14 text-lg bg-blue-500 text-gray-100 border border-gray-200 shadow-md hover:bg-blue-800 hover:border-gray-300 transition-all duration-300 ease-in-out"
          onClick={handleClick}
          onMouseEnter={prefetchCheckoutPage}
          onFocus={prefetchCheckoutPage}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Processing order..." : `Buy ${title} for $${price}`}
        </Button>
      </div>
    </div>
  );
};

export default BuyButton;
