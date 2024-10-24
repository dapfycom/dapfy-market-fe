import {
  IPaginatedResponse,
  IPaginationOptions,
  SignedUrlResponseDto,
} from "@/types/common.types";
import { IStoreResponse } from "@/types/store.types";
import api from "./api";

const storesService = {
  create: (createStoreDto: any) =>
    api.post<IStoreResponse>("/stores", createStoreDto),

  findAll: () => api.get<IStoreResponse[]>("/stores"),

  findPaginated: (pageOptions?: IPaginationOptions) =>
    api.get<IPaginatedResponse<IStoreResponse>>("/stores/paginated", {
      params: pageOptions,
    }),

  findUserStores: (pageOptions?: IPaginationOptions) =>
    api.get<IPaginatedResponse<IStoreResponse>>("/stores/paginated/user", {
      params: pageOptions,
    }),

  findOne: (idOrSlug: string) => api.get<IStoreResponse>(`/stores/${idOrSlug}`),

  update: (id: string, updateStoreDto: any) =>
    api.patch<IStoreResponse>(`/stores/${id}`, updateStoreDto),

  remove: (id: string) => api.delete(`/stores/${id}`),

  getSignedUrl: (contentType: string, fileSize: number, checksum: string) =>
    api.post<SignedUrlResponseDto>(`/stores/get-signed-url`, {
      contentType,
      fileSize,
      checksum,
    }),
};

export default storesService;
