import { ProductFormData } from "@/app/dashboard/products/productSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/config";
import { routes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

const Final = () => {
  const form = useFormContext<ProductFormData>();
  const [copied, setCopied] = useState(false);
  const { user } = useGetCurrentUser();

  const enableSell = user?.isStripeConnected;
  const productLink = `${config.appUrl}${routes.products}/${form.watch(
    "slug"
  )}`;
  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 text-center"
    >
      <h2 className="text-3xl font-bold text-green-600">
        🎉 Your product is created!
      </h2>
      <p className="text-xl">
        Congratulations! Your product has been successfully created.
      </p>
      {!enableSell && (
        <p className="text-red-600">
          You need to connect with Stripe first so your products can be
          published.
        </p>
      )}
      <div>
        <Label htmlFor="product-link" className="text-lg font-semibold">
          Product Link
        </Label>
        <div className="flex space-x-2 mt-2">
          <Input
            id="product-link"
            value={productLink}
            readOnly
            className="text-center"
          />
          <Button
            onClick={() => {
              navigator.clipboard.writeText(productLink);
              setCopied(true);
              toast.success(
                "The product link has been copied to your clipboard."
              );
              setTimeout(() => setCopied(false), 2000);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <Button
        asChild
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
      >
        <a href="/dashboard" rel="noopener noreferrer">
          Go to Dashboard
        </a>
      </Button>
    </motion.div>
  );
};

export default Final;
