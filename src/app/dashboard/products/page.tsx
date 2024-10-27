"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { config } from "@/config";
import { dashboardRoutes, routes } from "@/config/routes";
import { useGetApiUser } from "@/hooks/useGetCurrentUser";
import { useGetProducts } from "@/hooks/useProducts";
import productsService from "@/services/productsServices";
import { IProductResponse, ProductStatus } from "@/types/product.types";
import { AnimatePresence, motion } from "framer-motion";
import { BookCheck, BookX, Edit2, Eye, Link2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import DashboardContentLayout from "../commons/dashboard-content-layout";

const Products = () => {
  const { data, isLoading, error, mutate } = useGetProducts();
  const [selectedProduct, setSelectedProduct] =
    useState<IProductResponse | null>(null);
  const { data: res } = useGetApiUser();
  const user = res?.data;
  const products = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const ProductDetails = ({ product }: { product: IProductResponse }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedProduct(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <Badge
            variant={
              product.status === ProductStatus.PUBLISHED
                ? "default"
                : "secondary"
            }
          >
            {product.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.title}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
                No image available
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center space-x-2">
              <strong>Price:</strong>
              <span className="text-2xl font-bold text-green-600">
                ${parseFloat(product.price.d.join(".")).toFixed(2)}
              </span>
            </div>
            <div>
              <strong>Payment Type:</strong> {product.paymentType}
            </div>
            <div>
              <strong>Category:</strong> {product.category.name}
            </div>
            <div className="flex items-center space-x-2">
              <strong>Rating:</strong>
              <span className="text-yellow-500">★</span>
              <span>
                {product.averageRating.toFixed(1)} ({product.viewCount} views)
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Detailed Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            <div className="product-long-detail">
              <ReactMarkdown>{product.longDescription}</ReactMarkdown>
            </div>
          </p>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <strong>Store:</strong> {product.store.name}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Updated:</strong>{" "}
            {new Date(product.updatedAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Active:</strong> {product.isActive ? "Yes" : "No"}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => setSelectedProduct(null)}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
  );

  const canReceivePayments = user?.isStripeConnected;

  return (
    <DashboardContentLayout title="Products">
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="text-2xl font-bold">Digital Products</h2>
        {!canReceivePayments && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <p className="font-bold">Action Required: Connect Stripe Account</p>
            <p>
              To start selling products and receiving payments, you need to
              connect your Stripe account.
            </p>
            <Link
              href={dashboardRoutes.payments}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Go to Payments to Connect Stripe
            </Link>
          </div>
        )}
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
                <ProductRow
                  key={product.id}
                  product={product}
                  index={index}
                  mutate={mutate}
                  setSelectedProduct={setSelectedProduct}
                />
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

const ProductRow = ({
  product,
  index,
  mutate,
  setSelectedProduct,
}: {
  product: IProductResponse;
  index: number;
  mutate: () => void;
  setSelectedProduct: (product: IProductResponse) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handlePublish = async (
    currentStatus: ProductStatus,
    productId: string
  ) => {
    await productsService.updateStatus(productId, { status: currentStatus });
    mutate();
  };

  const handleCopyLink = (productSlug: string) => {
    navigator.clipboard.writeText(
      `${config.appUrl}/${routes.products}/${productSlug}`
    );
    toast.success("Link copied to clipboard");
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(productId);
      try {
        toast.promise(productsService.remove(productId), {
          loading: "Deleting product...",
          success: "Product deleted successfully",
          error: "Failed to delete product. Please try again.",
        });
        mutate();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete the product. Please try again.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <motion.tr
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b last:border-b-0"
    >
      <td className="py-3">
        <Link href={`${routes.products}/${product.slug}`} target="_blank">
          <span className="border-b border-b-primary hover:text-blue-500 hover:border-b-blue-500">
            {product.title}
          </span>
        </Link>
      </td>
      <td className="py-3">
        ${parseFloat(product.price.d.join(".")).toFixed(2)}
      </td>
      <td className="py-3">{product.viewCount}</td>
      <td className="py-3">{product.averageRating.toFixed(1)}</td>
      <td className="py-3">
        <div className="flex space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`${dashboardRoutes.products}/edit/${product.id}`}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Link>
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
            onClick={() => handleCopyLink(product.slug)}
          >
            <Link2 className="w-4 h-4 mr-2" />
            Link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePublish(
                product.status === ProductStatus.PUBLISHED
                  ? ProductStatus.DRAFT
                  : ProductStatus.PUBLISHED,
                product.id
              )
            }
          >
            {product.status === ProductStatus.PUBLISHED ? (
              <span className="text-red-500 flex items-center">
                {" "}
                <BookX className="w-4 h-4 mr-2" /> Unpublish
              </span>
            ) : (
              <span className="text-green-500 flex items-center">
                {" "}
                <BookCheck className="w-4 h-4 mr-2" /> Publish
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(product.id)}
            disabled={isDeleting === product.id}
          >
            {isDeleting === product.id ? (
              <span className="loading loading-spinner loading-xs mr-2"></span>
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </td>
    </motion.tr>
  );
};
