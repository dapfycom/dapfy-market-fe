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

export type ColorTheme =
  | "oceanBreeze"
  | "sunsetGlow"
  | "forestMist"
  | "lavenderDreams"
  | "goldenHour";

export type SignedUrlResponseDto = {
  signedUrl: string;
  key: string;
};

export type SignedUrlRequestDto = {
  contentType: string;
  fileSize: number;
  checksum: string;
  fileName: string;
};
