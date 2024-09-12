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

export interface IProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  price: {
    s: number;
    e: number;
    d: number[];
  };
  storeId: string;
  isActive: true;
  status: ProductStatus;
  paymentType: PricingType;
  categoryId: string;
  averageRating: number;
  viewCount: number;
  category: ICategoryResponse;
  store: IStoreResponse;
}

export interface IProductReviewResponse {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
}
