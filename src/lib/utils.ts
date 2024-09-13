import { config } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const getImageUrlFromS3 = (key: string) => {
  return `https://${config.awsBucketName}/${key}`;
};

export const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const formatPrice = (price: any) => {
  return parseFloat(price.d.join(".")).toFixed(2);
};
