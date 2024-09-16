"use client";
import { FramerDiv } from "@/components/framer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { IProductDetailsResponse } from "@/types/product.types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ProductDetails from "./components/ProductDetails";
import ProductImages from "./components/ProductImages";
import ProductLongDetail from "./components/ProductLongDetail";
const Product = ({ product }: { product: IProductDetailsResponse }) => {
  return (
    <FramerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <FramerDiv
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <ProductImages images={product.images.map((image) => image.url)} />
          <ProductDetails
            storeName={product.store.name}
            title={product.title}
            description={product.description}
            price={formatPrice(product.price)}
            averageRating={product.averageRating}
            totalReviews={product.reviews.length}
            paymentType={product.paymentType}
          />
        </div>

        <ProductLongDetail />
        <FramerDiv
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="px-8 py-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <span className="mr-2" role="img" aria-label="thumbs up">
              👍
            </span>
            Customer Reviews
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <FramerDiv
                key={review}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + review * 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?img=${review}`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          John Doe
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      This toolkit has revolutionized my workflow. Highly
                      recommended!
                    </p>
                  </CardContent>
                </Card>
              </FramerDiv>
            ))}
          </div>
        </FramerDiv>

        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="px-8 py-6 bg-gray-100 text-center"
        >
          <p className="text-sm text-gray-600">Powered by DAPFY.COM SRL</p>
          <div className="mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline mr-4">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </motion.footer>
      </FramerDiv>
    </FramerDiv>
  );
};

export default Product;
