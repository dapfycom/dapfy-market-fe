import { ProductFormData } from "@/app/dashboard/products/add/productSchema";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

const DRAFT_KEY = "product_draft";

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
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
}
