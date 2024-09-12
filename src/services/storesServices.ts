import { IPaginatedResponse, IPaginationOptions } from "@/types/common.types";
import { IStoreResponse } from "@/types/sotre.types";
import api from "./api";

const storesService = {
  create: (formData: FormData) =>
    api.post<IStoreResponse>("/stores", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

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
};

export default storesService;
