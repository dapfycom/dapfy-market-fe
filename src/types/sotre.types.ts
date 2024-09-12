export interface ICreateStoreDto {
  name: string;
  description: string;
  slug: string;
  logo: string;
  socials: {
    id: string;
    storeId: string;
    platform: string;
    url: string;
  }[];
  banner: string;
}
export interface IStoreResponse extends ICreateStoreDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}
