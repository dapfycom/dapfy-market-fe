import { ProductFormData } from "@/app/dashboard/products/productSchema";
import { useEffect } from "react";

const DEFAULT_DRAFT_KEY = "product_draft";

// Fields to exclude from draft storage
const excludeFromDraft = ["images", "files"];

export function useProductDraft(formMethods: any, key?: string) {
  const { watch, setValue } = formMethods;
  const DRAFT_KEY = key || DEFAULT_DRAFT_KEY;

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      // Populate form with saved draft data
      Object.keys(parsedDraft).forEach((key) => {
        setValue(key as keyof ProductFormData, parsedDraft[key]);
      });
    }
  }, [DRAFT_KEY, setValue]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      // Filter out images and files before saving
      const draftValue = Object.fromEntries(
        Object.entries(value).filter(([key]) => !excludeFromDraft.includes(key))
      );
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draftValue));
    });
    return () => subscription.unsubscribe();
  }, [DRAFT_KEY, watch]);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
}
