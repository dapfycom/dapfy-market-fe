"use client";

import { formatPrice } from "@/lib/utils";
import productsService from "@/services/productsServices";
import {
  ICreateProductDto,
  IProductDetailsResponse,
  PricingType,
  ProductStatus,
} from "@/types/product.types";
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
  console.log(product);

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

    const updateProductDto: ICreateProductDto = {
      title: form.getValues("name"),
      description: form.getValues("description"),
      paymentType: form.getValues("pricing"),
      price: parseFloat(form.getValues("price")),
      digitalFiles: form
        .getValues("files")
        .filter((file) => Boolean(file.key))
        .map((file) => file.key as string),
      images: form
        .getValues("images")
        .filter((image) => Boolean(image.key))
        .map((image) => image.key as string),
      longDescription: form.getValues("longDescription"),
      slug: form.getValues("slug"),
      status: ProductStatus.PUBLISHED,
    };

    try {
      await productsService.update(product.id, updateProductDto);
      toast.success("Product updated successfully!");
      onNextStep();
      clearDraft();
    } catch (error) {
      console.error("Error updating product:", error);
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
