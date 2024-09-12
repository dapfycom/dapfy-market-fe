import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
  socialLinks: z
    .object({
      FACEBOOK: z.string().url().or(z.literal("")).optional(),
      INSTAGRAM: z.string().url().or(z.literal("")).optional(),
      TWITTER: z.string().url().or(z.literal("")).optional(),
      YOUTUBE: z.string().url().or(z.literal("")).optional(),
      TIKTOK: z.string().url().or(z.literal("")).optional(),
    })
    .optional(),
  logo: z
    .custom<File>((v) => v instanceof File, {
      message: "Logo must be a file",
    })
    .nullable(),
  colorTheme: z.string(),
});

export type StoreFormData = z.infer<typeof storeSchema>;
