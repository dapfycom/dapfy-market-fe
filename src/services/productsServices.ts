import { IPaginatedResponse, IPaginationOptions } from "@/types/common.types";

import {
  IProductDetailsResponse,
  IProductResponse,
  IProductReviewResponse,
} from "@/types/product.types";
import api from "./api";

const productsService = {
  create: (storeId: string, createProductDto: FormData) =>
    api.post<IProductResponse>(`/products/${storeId}`, createProductDto, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  findAll: () => api.get<IProductResponse[]>("/products"),

  findPaginated: (
    pageOptions?: IPaginationOptions,
    category: string = "all",
    search?: string
  ) =>
    api.get<IPaginatedResponse<IProductResponse>>("/products/paginated", {
      params: { ...pageOptions, category, search },
    }),

  findUserProducts: (pageOptions?: IPaginationOptions) =>
    api.get<IPaginatedResponse<IProductResponse>>("/products/user/paginated", {
      params: pageOptions,
    }),

  findOne: (slug: string) =>
    api.get<IProductDetailsResponse>(`/products/${slug}`),

  update: (id: string, updateProductDto: any) =>
    api.patch<IProductResponse>(`/products/${id}`, updateProductDto),

  remove: (id: string) => api.delete(`/products/${id}`),

  addReview: (
    productId: string,
    createReviewDto: {
      rating: number;
      comment: string;
    }
  ) =>
    api.post<IProductReviewResponse>(
      `/products/${productId}/reviews`,
      createReviewDto
    ),

  checkSlugAvailability: (slug: string) =>
    api.get<boolean>(`/products/check-slug/${slug}`),

  findReviews: (productId: string) =>
    api.get<IProductReviewResponse[]>(`/products/reviews/${productId}`),
};

export default productsService;
