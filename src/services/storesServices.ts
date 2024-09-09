import { IPaginatedResponse, IPaginationOptions } from "@/types/common.types";
import { IStoreResponse } from "@/types/sotre.types";
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

  findOne: (id: string) => api.get<IStoreResponse>(`/stores/${id}`),

  update: (id: string, updateStoreDto: any) =>
    api.patch<IStoreResponse>(`/stores/${id}`, updateStoreDto),

  remove: (id: string) => api.delete(`/stores/${id}`),
};

export default storesService;
