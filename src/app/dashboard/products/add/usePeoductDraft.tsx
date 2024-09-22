import { ProductFormData } from "@/app/dashboard/products/add/productSchema";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

const DRAFT_KEY = "product_draft";

// Fields to exclude from draft storage
const excludeFromDraft = ["images", "files"];

export function useProductDraft(formMethods: UseFormReturn<ProductFormData>) {
  const { reset, watch, setValue } = formMethods;

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      // Populate form with saved draft data
      Object.keys(parsedDraft).forEach((key) => {
        setValue(key as keyof ProductFormData, parsedDraft[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      // Filter out images and files before saving
      const draftValue = Object.fromEntries(
        Object.entries(value).filter(([key]) => !excludeFromDraft.includes(key))
      );
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draftValue));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
}
