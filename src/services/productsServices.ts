import {
  IPaginatedResponse,
  IPaginationOptions,
  SignedUrlRequestDto,
} from "@/types/common.types";

import {
  ICreateProductDto,
  IProductDetailsResponse,
  IProductResponse,
  IProductReviewResponse,
  ProductStatus,
} from "@/types/product.types";
import { algoliaService } from "./algoliaService";
import api from "./api";

const productsService = {
  create: (storeId: string, createProductDto: ICreateProductDto) =>
    api.post<IProductResponse>(`/products/${storeId}`, createProductDto),

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

  findOne: (idOrSlug: string) =>
    api.get<IProductDetailsResponse>(`/products/${idOrSlug}`),

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
    api.get<{ available: boolean; id: string | null }>(
      `/products/check-slug/${slug}`
    ),

  findReviews: (productId: string) =>
    api.get<IProductReviewResponse[]>(`/products/reviews/${productId}`),

  searchWithAlgolia: async (query: string) => {
    try {
      const results = await algoliaService.searchProducts(query);
      return results;
    } catch (error) {
      console.error("Error searching products with Algolia:", error);
      throw error;
    }
  },

  updateStatus: (
    productId: string,
    updateProductStatusDto: { status: ProductStatus }
  ) =>
    api.patch<IProductResponse>(
      `/products/${productId}/status`,
      updateProductStatusDto
    ),

  getSignedUrlsForImages: (signedUrlBatchRequestDto: {
    files: SignedUrlRequestDto[];
  }) =>
    api.post<{
      signedUrls: {
        fileName: string;
        key: string;
        signedUrl: string;
      }[];
    }>("/products/get-signed-urls/images", signedUrlBatchRequestDto),

  getSignedUrlsForDigitalFiles: (signedUrlBatchRequestDto: {
    files: SignedUrlRequestDto[];
  }) =>
    api.post<{
      signedUrls: {
        fileName: string;
        key: string;
        signedUrl: string;
      }[];
    }>("/products/get-signed-urls/digital-files", signedUrlBatchRequestDto),
};

export default productsService;
