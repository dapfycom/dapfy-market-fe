import * as z from "zod";

export const productSchema = z.object({
  store: z.string().min(1, "Please select a store"),
  name: z.string().min(1, "Name is required").max(60, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(160, "Description is too long"),
  pricing: z.enum(["single", "subscription"]),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

export type ProductFormData = z.infer<typeof productSchema>;
