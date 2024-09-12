import { ICategoryResponse } from "@/types/category.types";
import api from "./api";

const categoriesService = {
  create: (createCategoryDto: any) =>
    api.post<ICategoryResponse>("/categories", createCategoryDto),

  findAll: () => api.get<ICategoryResponse[]>("/categories"),

  findOne: (id: string) => api.get<ICategoryResponse>(`/categories/${id}`),

  update: (id: string, updateCategoryDto: any) =>
    api.patch<ICategoryResponse>(`/categories/${id}`, updateCategoryDto),

  remove: (id: string) => api.delete<ICategoryResponse>(`/categories/${id}`),
};

export default categoriesService;
