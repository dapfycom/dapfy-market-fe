import { FramerDiv, FramerTableRow } from "@/components/framer";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import DashboardContentLayout from "./commons/dashboard-content-layout";
export default function DashboardPage() {
  return (
    <DashboardContentLayout title="Dashboard">
      <FramerDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">$124,567.89</p>
            <div className="flex items-center text-green-500 mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">12.5% from last year</span>
            </div>
          </FramerDiv>
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
            <p className="text-3xl font-bold">$9,876.54</p>
            <div className="flex items-center text-green-500 mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">8.3% from last month</span>
            </div>
          </FramerDiv>
          <FramerDiv
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Customers</h3>
            <p className="text-3xl font-bold">1,234</p>
            <div className="flex items-center text-red-500 mt-2">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span className="text-sm">3.2% from last month</span>
            </div>
          </FramerDiv>
        </div>

        <FramerDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: "2023-05-04",
                    customer: "Alice Brown",
                    product: "Software License: Photo Editor Pro",
                    amount: "$79.99",
                  },
                  {
                    date: "2023-05-03",
                    customer: "Bob Johnson",
                    product: "Digital Art Collection",
                    amount: "$29.99",
                  },
                  {
                    date: "2023-05-02",
                    customer: "Jane Smith",
                    product: "Online Course: Advanced JavaScript",
                    amount: "$49.99",
                  },
                  {
                    date: "2023-05-01",
                    customer: "John Doe",
                    product: "E-book: Web Development Basics",
                    amount: "$19.99",
                  },
                ].map((transaction, index) => (
                  <FramerTableRow
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.customer}</td>
                    <td className="py-3">{transaction.product}</td>
                    <td className="py-3">{transaction.amount}</td>
                  </FramerTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </FramerDiv>

        <FramerDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total Spent</th>
                  <th className="pb-3 font-semibold">Orders</th>
                  <th className="pb-3 font-semibold">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "John Doe",
                    totalSpent: "$1,234.56",
                    orders: 15,
                    lastPurchase: "2023-05-01",
                  },
                  {
                    name: "Jane Smith",
                    totalSpent: "$987.65",
                    orders: 12,
                    lastPurchase: "2023-04-28",
                  },
                  {
                    name: "Bob Johnson",
                    totalSpent: "$876.54",
                    orders: 10,
                    lastPurchase: "2023-04-25",
                  },
                  {
                    name: "Alice Brown",
                    totalSpent: "$765.43",
                    orders: 8,
                    lastPurchase: "2023-04-22",
                  },
                ].map((customer, index) => (
                  <FramerTableRow
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-3">{customer.name}</td>
                    <td className="py-3">{customer.totalSpent}</td>
                    <td className="py-3">{customer.orders}</td>
                    <td className="py-3">{customer.lastPurchase}</td>
                  </FramerTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </FramerDiv>
      </FramerDiv>
    </DashboardContentLayout>
  );
}
