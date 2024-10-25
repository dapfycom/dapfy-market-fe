"use client";

import {
  EditProductFormData,
  FileObject,
  ProductFormData,
} from "@/app/dashboard/products/productSchema";
import { Label } from "@/components/ui/label";
import { config } from "@/config";
import { routes } from "@/config/routes";
import { useGetUserStores } from "@/hooks/useStores";
import { PricingType } from "@/types/product.types";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";
import ReactMarkdown from "react-markdown";

function Review() {
  const form = useFormContext<ProductFormData | EditProductFormData>();
  const { data: stores } = useGetUserStores();
  const path = usePathname();
  const isEditing = path.includes("edit");

  const renderImages = (images: FileObject[]) => {
    return images.map((img, index) => (
      <Image
        key={img.key}
        src={img.preview}
        alt={`Product image ${index + 1}`}
        className="w-full h-auto rounded-md shadow-md"
        width={100}
        height={100}
      />
    ));
  };

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">🚀 Review and Create</h2>
      <div className="space-y-4">
        <div>
          <Label className="font-semibold">Store</Label>
          <p>
            {
              stores?.data.find((store) => store.id === form.watch("store"))
                ?.name
            }
          </p>
        </div>
        <div>
          <Label className="font-semibold">Product Name</Label>
          <p>{form.watch("name")}</p>
        </div>
        <div>
          <Label className="font-semibold">Description</Label>
          <div>{form.watch("description")}</div>
        </div>
        <div>
          <Label className="font-semibold">Pricing</Label>
          <p>
            {form.watch("pricing") === PricingType.SINGLE
              ? "One-time Payment"
              : "Subscription"}
            : ${form.watch("price")}
          </p>
        </div>
        <div>
          <Label className="font-semibold">Images</Label>
          <div className="grid grid-cols-5 gap-4 mt-2">
            {/* {renderImages(getFilteredOldImages())} */}
            {renderImages(form.watch("images"))}
          </div>
        </div>
        <div>
          <Label className="font-semibold">Product URL</Label>
          <p className="break-all">{`${config.appUrl}${
            routes.products
          }/${form.watch("slug")}`}</p>
        </div>
        <div>
          <Label className="font-semibold">Short Description</Label>
          <p>{form.watch("description")}</p>
        </div>
        <div>
          <Label className="font-semibold">Product Details</Label>
          <div className="mt-2 p-4 bg-gray-100 rounded-md product-long-detail">
            <ReactMarkdown>{form.watch("longDescription") || ""}</ReactMarkdown>
          </div>
        </div>
      </div>

      {Object.keys(form.formState.errors).length > 0 && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-md">
          <h3 className="text-red-700 font-semibold mb-2">Form Errors:</h3>
          <ul className="list-disc pl-5">
            {Object.entries(form.formState.errors).map(([field, error]) => (
              <li key={field} className="text-red-600">
                {error?.message as string}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default Review;
