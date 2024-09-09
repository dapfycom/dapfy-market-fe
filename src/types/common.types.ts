export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    take: number;
    itemCount: number;
    totalPages: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface IPaginationOptions {
  page?: number;
  take?: number;
  q?: string;
  order?: "ASC" | "DESC";
}
