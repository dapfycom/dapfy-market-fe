"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { config } from "@/config";
import { routes } from "@/config/routes";
import { useGetUserStores } from "@/hooks/useStores";
import productsService from "@/services/productsServices";
import { PricingType } from "@/types/product.types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ProductFormData } from "../../productSchema";

const Review = ({ onNextStep }: { onNextStep: () => void }) => {
  const form = useFormContext<ProductFormData>();
  const { data: stores } = useGetUserStores();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Append text fields
    formData.append("title", form.getValues("name"));
    formData.append("description", form.getValues("description"));
    formData.append("paymentType", form.getValues("pricing"));
    formData.append("price", form.getValues("price"));
    formData.append("status", "PUBLISHED"); // Assuming default status is PUBLISHED
    formData.append("slug", form.getValues("slug"));

    // Append images
    form.getValues("images").forEach((image, index) => {
      formData.append(`images`, image);
    });

    // Append digital files
    form.getValues("files").forEach((file, index) => {
      formData.append(`digitalFiles`, file);
    });

    try {
      const storeId = form.getValues("store");
      await productsService.create(storeId, formData);
      toast.success("Product created successfully!");
      onNextStep();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          <div
            dangerouslySetInnerHTML={{ __html: form.watch("description") }}
          />
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
            {form.watch("images").map((img: File, index: number) => (
              <Image
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Product image ${index + 1}`}
                className="w-full h-auto rounded-md shadow-md"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
        <div>
          <Label className="font-semibold">Product URL</Label>
          <p className="break-all">
            {`${config.appUrl}${routes.products}/${form.watch("slug")}`}
          </p>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isSubmitting ? "Creating Product..." : "Create Product"}
      </Button>
    </motion.div>
  );
};

export default Review;
