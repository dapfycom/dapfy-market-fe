"use client";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/useProducts";
import { IProductResponse } from "@/types/product.types";
import { AnimatePresence, motion } from "framer-motion";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import DashboardContentLayout from "../commons/dashboard-content-layout";

const Products = () => {
  const { data, isLoading, error } = useGetProducts();
  const [selectedProduct, setSelectedProduct] =
    useState<IProductResponse | null>(null);

  const products = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const ProductDetails = ({ product }: { product: IProductResponse }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={() => setSelectedProduct(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Price:</strong> $
            {parseFloat(product.price.d.join(".")).toFixed(2)}
          </div>
          <div>
            <strong>Payment Type:</strong> {product.paymentType}
          </div>
          <div>
            <strong>Status:</strong> {product.status}
          </div>
          <div>
            <strong>Average Rating:</strong> {product.averageRating.toFixed(1)}
          </div>
          <div>
            <strong>View Count:</strong> {product.viewCount}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Button onClick={() => setSelectedProduct(null)}>Close</Button>
      </motion.div>
    </motion.div>
  );

  return (
    <DashboardContentLayout title="Products">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">Digital Products</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Price</th>
                <th className="pb-3 font-semibold">Sales</th>
                <th className="pb-3 font-semibold">Rating</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b last:border-b-0"
                >
                  <td className="py-3">{product.title}</td>
                  <td className="py-3">
                    ${parseFloat(product.price.d.join(".")).toFixed(2)}
                  </td>
                  <td className="py-3">{product.viewCount}</td>
                  <td className="py-3">{product.averageRating.toFixed(1)}</td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <AnimatePresence>
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </AnimatePresence>
      </motion.div>
    </DashboardContentLayout>
  );
};

export default Products;
