import { IDetailedOrderResponse, IOrderResponse } from "@/types/order.types";
import api from "./api";

const ordersService = {
  getMyOrders: () => api.get<IOrderResponse[]>("/orders/my-orders"),
  // Add the new method for getting order details
  getOrderDetails: (orderId: string) =>
    api.get<IDetailedOrderResponse>(`/orders/${orderId}`),
};

export default ordersService;
