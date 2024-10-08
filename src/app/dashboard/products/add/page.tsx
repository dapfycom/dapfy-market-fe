"use client";

import productsService from "@/services/productsServices";
import { PricingType } from "@/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EnhancedProductFlow from "../components/EnhancedProductFlow";
import { ProductFormData, addProductSchema } from "../productSchema";
import { useProductDraft } from "./usePeoductDraft";

const DRAFT_KEY = "add_product_draft";

export default function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  const form = useForm<ProductFormData>({
    defaultValues: {
      store: "",
      name: "",
      description: "",
      images: [],
      files: [],
      pricing: PricingType.SINGLE,
      price: "",
      slug: "",
    },
    resolver: zodResolver(addProductSchema),
  });

  useProductDraft(form, DRAFT_KEY);

  const onSubmit = async (data: ProductFormData, onNextStep: () => void) => {
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
    <FormProvider {...form}>
      <EnhancedProductFlow
        title="Create New Product"
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
}
