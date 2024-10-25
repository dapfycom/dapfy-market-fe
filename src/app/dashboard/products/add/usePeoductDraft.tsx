import { ProductFormData } from "@/app/dashboard/products/productSchema";
import { useEffect } from "react";

const DEFAULT_DRAFT_KEY = "product_draft";

// Fields to exclude from draft storage

export function useProductDraft(formMethods: any, key?: string) {
  const { watch, setValue } = formMethods;
  const DRAFT_KEY = key || DEFAULT_DRAFT_KEY;

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      // Populate form with saved draft data
      Object.keys(parsedDraft).forEach((key) => {
        if (key === "images" || key === "files") {
          setValue(key, parsedDraft[key]);
        }
        setValue(key as keyof ProductFormData, parsedDraft[key]);
      });
    }
  }, [DRAFT_KEY, setValue]);

  useEffect(() => {
    const subscription = watch((value: any) => {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [DRAFT_KEY, watch]);

  const clearDraft = () => {
    sessionStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
}
