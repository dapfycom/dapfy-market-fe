import { AUTH_TOKEN_KEY } from "@/config";
import { routes } from "@/config/routes";
import { IDetailedOrderResponse } from "@/types/order.types";
import { BASE_URL } from "@/utils/axios";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderDetails from "./components/OrderDetails";

async function getOrderDetails(orderId: string, authToken: string) {
  try {
    const response = await axios.get<IDetailedOrderResponse>(
      `${BASE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw new Error("Failed to fetch order details");
  }
}

export default async function DashboardOrdersOrderIdPage({
  params,
}: {
  params: { orderId: string };
}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  if (!authToken) {
    redirect(routes.home);
  }

  const orderDetails = await getOrderDetails(params.orderId, authToken);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <OrderDetails order={orderDetails} />
    </div>
  );
}
