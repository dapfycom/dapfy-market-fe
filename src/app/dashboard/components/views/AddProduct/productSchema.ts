import * as z from "zod";

export const productSchema = z.object({
  store: z.string().min(1, "Please select a store"),
  name: z.string().min(1, "Name is required").max(60, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(160, "Description is too long"),
  pricing: z.enum(["single", "subscription"]),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
});

export type ProductFormData = z.infer<typeof productSchema>;
