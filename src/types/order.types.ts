export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
  storeName: string;
}

export interface IOrderResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  total: number;
  items: OrderItemResponse[];
}

export interface IDetailedOrderResponse extends IOrderResponse {
  userId: string;
  items: DetailedOrderItemResponse[];
}

export interface DetailedOrderItemResponse extends OrderItemResponse {
  productDetails: {
    description: string;
    images: string[];
    digitalFiles: Array<{
      fileName: string;
      fileSize: number;
      fileUrl: string;
    }>;
  };
}
