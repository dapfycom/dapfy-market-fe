"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
export const runtime = "edge";
export default function Component() {
  const totalReviews = 127;
  const averageRating = 4.7;
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600&text=Product+View+2",
    "/placeholder.svg?height=400&width=600&text=Product+View+3",
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-96 w-full object-cover md:w-96"
              src={images[currentImage]}
              alt={`Product Image ${currentImage + 1}`}
            />
            <Button
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              onClick={prevImage}
            >
              ←
            </Button>
            <Button
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              onClick={nextImage}
            >
              →
            </Button>
          </div>
          <div className="p-8 w-full flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-between items-center mb-4"
              >
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  Digital Product
                </div>
                <div className="text-sm text-gray-500">
                  Created by{" "}
                  <span className="font-semibold text-gray-700">
                    DigitalCraft
                  </span>
                </div>
              </motion.div>
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl leading-8 font-bold tracking-tight text-gray-900"
              >
                Ultimate Productivity Toolkit
              </motion.h1>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-2 flex items-center"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {averageRating} ({totalReviews} reviews)
                </span>
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4 text-xl text-gray-500"
              >
                Boost your productivity with our comprehensive digital toolkit.
                Includes templates, guides, and software to streamline your
                workflow.
              </motion.p>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6"
            >
              <span className="text-3xl font-bold text-gray-900">$49.99</span>
              <span className="ml-2 text-lg text-gray-500">USD</span>
              <span className="ml-2 text-sm text-green-600 font-semibold">
                One-time payment
              </span>
              <Button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                size="lg"
              >
                <ShoppingCart className="mr-2" />
                Buy This Digital Product
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="px-8 py-6 bg-blue-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <span className="mr-2" role="img" aria-label="target">
              🎯
            </span>
            Product Details
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>50+ customizable productivity templates</li>
            <li>10-step guide to effective time management</li>
            <li>Task prioritization software (1-year license)</li>
            <li>Access to exclusive productivity webinars</li>
            <li>Monthly newsletter with productivity tips</li>
          </ul>
        </motion.div>

        <motion.div
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
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </motion.div>

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
      </motion.div>
    </motion.div>
  );
}
