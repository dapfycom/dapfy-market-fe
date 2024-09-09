export interface ICreateStoreDto {
  name: string;
  description: string;
}
export interface IStoreResponse extends ICreateStoreDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}
