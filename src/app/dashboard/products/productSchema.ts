import { PricingType } from "@/types/product.types";
import * as z from "zod";

export interface FileObject {
  file: File;
  name: string;
  size: number;
  preview: string;
  key?: string;
  isUploading: boolean;
}

export const addProductSchema = z.object({
  store: z.string().min(1, "Please select a store"),
  name: z.string().min(1, "Name is required").max(60, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description is too long"),
  pricing: z.enum([PricingType.SINGLE, PricingType.SUBSCRIPTION]),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  slug: z.string().min(1, "Slug is required").max(60, "Slug is too long"),
  // images is an array of files
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        name: z.string(),
        size: z.number(),
        preview: z.string(),
        key: z.string().optional(),
        isUploading: z.boolean(),
      })
    )
    .min(1),
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
        name: z.string(),
        size: z.number(),
        preview: z.string(),
        key: z.string().optional(),
        isUploading: z.boolean(),
      })
    )
    .min(1),
  longDescription: z.string(),
});

export type ProductFormData = z.infer<typeof addProductSchema>;

export const editProductSchema = addProductSchema.extend({
  product: z.object({
    images: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
      })
    ),
  }),

  removeImages: z.array(z.string()),
});

export type EditProductFormData = z.infer<typeof editProductSchema>;
