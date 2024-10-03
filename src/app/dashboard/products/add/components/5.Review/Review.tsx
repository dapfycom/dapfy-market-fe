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
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { ProductFormData } from "../../productSchema";

const Review = ({ onNextStep }: { onNextStep: () => void }) => {
  const form = useFormContext<ProductFormData>();
  const { data: stores } = useGetUserStores();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearDraft = () => {
    sessionStorage.removeItem("product_draft");
  };
  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Append text fields
    formData.append("title", form.getValues("name"));
    formData.append("description", form.getValues("description"));
    formData.append("paymentType", form.getValues("pricing"));
    formData.append("price", form.getValues("price"));
    formData.append("status", "PUBLISHED"); // Assuming default status is PUBLISHED
    formData.append("slug", form.getValues("slug"));
    formData.append("longDescription", form.getValues("longDescription") || "");

    // Append images
    form.getValues("images").forEach((image, index) => {
      formData.append(`images`, image);
    });

    // Append digital files
    form.getValues("files").forEach((file, index) => {
      formData.append(`digitalFiles`, file);
    });

    try {
      const storeId = data.store;
      await productsService.create(storeId, formData);
      toast.success("Product created successfully!");
      onNextStep();
      clearDraft();
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
        <div>
          <Label className="font-semibold">Storefront Preview</Label>
          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
            <h1 className="text-2xl font-bold mb-4">{form.watch("name")}</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {form
                .watch("images")
                .slice(0, 2)
                .map((img: File, index: number) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-auto rounded-md shadow-md"
                    width={300}
                    height={200}
                    objectFit="cover"
                  />
                ))}
            </div>
            <p className="text-lg font-semibold mb-2">
              ${form.watch("price")} -{" "}
              {form.watch("pricing") === PricingType.SINGLE
                ? "One-time Payment"
                : "Subscription"}
            </p>
            <div className="prose max-w-none">
              <ReactMarkdown>
                {form.watch("longDescription") || ""}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={form.handleSubmit(onSubmit, (errors) => {
          console.error("Validation errors:", errors);
          toast.error("Please fix the errors before submitting.");
        })}
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isSubmitting ? "Creating Product..." : "Create Product"}
      </Button>

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
};

export default Review;