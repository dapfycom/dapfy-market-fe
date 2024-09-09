import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProducts } from "@/hooks/useProducts";
import { IProductResponse } from "@/types/product.types";
import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, Eye, Star, Store, Tag } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const { data, isLoading, error } = useGetProducts();
  const [selectedProduct, setSelectedProduct] =
    useState<IProductResponse | null>(null);

  const products = data?.data;
  console.log(products);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const ProductCard = ({ product }: { product: IProductResponse }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card
        className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => setSelectedProduct(product)}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold truncate">
            {product.title}
          </CardTitle>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Store className="w-4 h-4 mr-1" />
            <span className="truncate">{product.store.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <Badge
              variant={product.status === "PUBLISHED" ? "default" : "secondary"}
              className="w-fit"
            >
              {product.status}
            </Badge>
            <div className="flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              {product.category.name}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>
                {product.price.d[0]}.{product.price.d[1] || "00"}
              </span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span>{product.averageRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{product.viewCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ProductDetails = ({ product }: { product: IProductResponse }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedProduct(null)}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Price:</strong> ${product.price.d[0]}.
            {product.price.d[1] || "00"}
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedProduct && <ProductDetails product={selectedProduct} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;
