"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { formatPrice } from "@/lib/utils";
import { addToCart } from "@/store/slices/commonSlice";
import { useAppDispatch } from "@/store/store";
import { IProductResponse } from "@/types/product.types";
import { motion } from "framer-motion";
import { Eye, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { fadeInUp } from "../constants";

const ProductCard = ({ product }: { product: IProductResponse }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: IProductResponse) => {
    console.log({ product });

    dispatch(addToCart(product as any));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Link href={`${routes.products}/${product.slug}`}>
      <motion.div
        key={product.id}
        variants={fadeInUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Image
          src={product.images[0].url}
          alt={product.title}
          className="w-full h-48 object-cover"
          width={400}
          height={200}
          quality={100}
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {product.category.emoji} {product.category.name}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${formatPrice(product.price)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">{product.viewCount}</span>
            </div>
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => handleAddToCart(product)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
