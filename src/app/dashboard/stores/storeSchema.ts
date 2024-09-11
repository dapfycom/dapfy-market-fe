import * as z from "zod";

export const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Invalid URL"),
});

export type StoreFormData = z.infer<typeof storeSchema>;
