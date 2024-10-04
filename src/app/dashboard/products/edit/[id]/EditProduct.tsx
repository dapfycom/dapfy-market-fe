"use client";

import { formatPrice } from "@/lib/utils";
import productsService from "@/services/productsServices";
import { IProductDetailsResponse, PricingType } from "@/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useProductDraft } from "../../add/usePeoductDraft";
import EnhancedProductFlow from "../../components/EnhancedProductFlow";
import { EditProductFormData, editProductSchema } from "../../productSchema";

const DRAFT_KEY = "edit_product_draft";

export default function EditProduct({
  product,
}: {
  product: IProductDetailsResponse;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  const form = useForm<EditProductFormData>({
    defaultValues: {
      product: product,
      store: product.storeId,
      name: product.title,
      description: product.description,
      longDescription: product.longDescription,
      images: [],
      files: [],
      pricing: product.paymentType as PricingType,
      price: formatPrice(product.price),
      slug: product.slug,
      removeImages: [],
    },
    resolver: zodResolver(editProductSchema),
  });

  useProductDraft(form, DRAFT_KEY);

  if (!product) return <div>Product not found</div>;

  const onSubmit = async (
    data: EditProductFormData,
    onNextStep: () => void
  ) => {
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

    // Append remove images
    form.getValues("removeImages").forEach((image, index) => {
      if (index === 0) {
        formData.append(`removeImages`, image);
      }
      formData.append(`removeImages`, image);
    });

    try {
      await productsService.update(product.id, formData);
      toast.success("Product updated successfully!");
      onNextStep();
      clearDraft();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <EnhancedProductFlow
        title="Edit Product"
        onSubmit={onSubmit}
        isEditing={true}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
}
