"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="md:flex-shrink-0 relative w-full h-96 group hover:scale-[1.02] transition-all duration-200 ease-in-out rounded-lg overflow-hidden">
      <motion.img
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover object-center "
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
