import { motion } from "framer-motion";

const MyOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-3 font-semibold">Order ID</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Product</th>
              <th className="pb-3 font-semibold">Seller</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "1001",
                date: "2023-05-10",
                product: "Advanced SEO Techniques",
                seller: "Digital Marketing Pro",
                amount: "$129.99",
                status: "Completed",
              },
              {
                id: "1002",
                date: "2023-05-08",
                product: "Graphic Design Masterclass",
                seller: "Creative Studio",
                amount: "$89.99",
                status: "Processing",
              },
              {
                id: "1003",
                date: "2023-05-05",
                product: "Python for Data Science",
                seller: "Tech Education Inc.",
                amount: "$199.99",
                status: "Completed",
              },
              {
                id: "1004",
                date: "2023-05-01",
                product: "Social Media Strategy Guide",
                seller: "Online Presence Guru",
                amount: "$49.99",
                status: "Completed",
              },
            ].map((order, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">{order.product}</td>
                <td className="py-3">{order.seller}</td>
                <td className="py-3">{order.amount}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyOrders;
