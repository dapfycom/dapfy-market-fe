import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, Plus, Search, Star } from "lucide-react";
import Image from "next/image";
import { fadeInUp, staggerChildren } from "../constants";
import { products } from "../data";

const Content = ({ addToCart }: { addToCart: (product: any) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 bg-blue-50 text-gray-800 flex-1 overflow-auto"
    >
      <div className="mb-6 flex justify-between items-start">
        <motion.div
          className="space-y-2"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold text-blue-800"
          >
            Monetise your idea.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600">
            Buy and sell anything digital.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-sm text-green-600">
            Get started with Dapfy.com — Risk free, No Credit Card Required
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-4">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Sign up instantly 🚀
            </Button>
          </motion.div>
        </motion.div>
        {/* <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-64 h-48 bg-white rounded-lg shadow p-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div> */}
      </div>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mb-6"
      >
        <div className="relative">
          <Input
            placeholder="Search"
            className="pl-8 bg-white border-blue-200 text-gray-800"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-2xl font-semibold text-blue-800 mb-4 text-center"
      >
        Trending Now
      </motion.h2>

      {/* Grid of Products */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product: any) => (
          <motion.div
            key={product.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
              width={400}
              height={100}
              quality={100}
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {product.emoji} {product.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-500">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-sm">{product.views}</span>
                </div>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Content;
