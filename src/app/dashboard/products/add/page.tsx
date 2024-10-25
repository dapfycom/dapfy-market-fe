"use client";

import productsService from "@/services/productsServices";
import {
  ICreateProductDto,
  PricingType,
  ProductStatus,
} from "@/types/product.types";
import { errorToast } from "@/utils/hot-toast";
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

    const createProductDto: ICreateProductDto = {
      title: form.getValues("name"),
      description: form.getValues("description"),
      paymentType: form.getValues("pricing"),
      price: parseFloat(form.getValues("price")),
      status: ProductStatus.PUBLISHED,
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
    };

    try {
      const storeId = data.store;
      await productsService.create(storeId, createProductDto);
      toast.success("Product created successfully!");
      onNextStep();
      clearDraft();
    } catch (error) {
      console.error("Error creating product:", error);
      errorToast(error, "Failed to create product. Please try again.");
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
