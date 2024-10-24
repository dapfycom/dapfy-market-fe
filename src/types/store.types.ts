import { IProductResponse } from "./product.types";

export interface ICreateStoreDto {
  name: string;
  description: string;
  slug: string;
  logo: string;
  socials: {
    id: string;
    storeId: string;
    platform: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "YOUTUBE" | "TIKTOK";
    url: string;
  }[];
  banner: string;
}
export interface IStoreResponse extends ICreateStoreDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  products: IProductResponse[];
}
