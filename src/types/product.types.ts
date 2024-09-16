import { ICategoryResponse } from "./category.types";
import { IStoreResponse } from "./sotre.types";

export enum PricingType {
  SINGLE = "SINGLE",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum ProductStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}
export interface IProductImage {
  id: string;
  url: string;
}
export interface IProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  price: {
    s: number;
    e: number;
    d: [180];
  };
  storeId: string;
  isActive: boolean;
  status: ProductStatus;
  paymentType: PricingType;
  categoryId: string;
  averageRating: number;
  viewCount: number;
  slug: string;
  images: IProductImage[];
  category: ICategoryResponse;
  store: IStoreResponse;
}

export interface IProductDetailsResponse extends IProductResponse {
  reviews: IProductReviewResponse[];
}

export interface IProductReviewResponse {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
}
