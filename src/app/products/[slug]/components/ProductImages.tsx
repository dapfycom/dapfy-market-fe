"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
export const runtime = "edge";
const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
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
  );
};

export default ProductImages;
