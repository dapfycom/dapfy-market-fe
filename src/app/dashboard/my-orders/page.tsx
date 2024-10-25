import { FramerDiv, FramerTableRow } from "@/components/framer";
import { AUTH_TOKEN_KEY } from "@/config";
import { dashboardRoutes, routes } from "@/config/routes";
import { IOrderResponse } from "@/types/order.types";
import { BASE_URL } from "@/utils/axios";
import axios from "axios";
import { Eye } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardContentLayout from "../commons/dashboard-content-layout";

export default async function DashboardMyOrdersPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;
  const urlToken = searchParams.token;

  const token = authToken || urlToken;

  if (!token) {
    redirect(routes.home);
  }

  let response = await axios.get<IOrderResponse[]>(
    BASE_URL + "/orders/my-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const orders = response.data;

  return (
    <DashboardContentLayout title="My Orders">
      <FramerDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <FramerTableRow
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3">
                      {order.items.map((item) => item.quantity)}
                    </td>
                    <td className="py-3">${order.total}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <Link
                        href={`${dashboardRoutes.orders}/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </td>
                  </FramerTableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </FramerDiv>
    </DashboardContentLayout>
  );
}
