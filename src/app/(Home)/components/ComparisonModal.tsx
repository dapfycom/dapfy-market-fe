"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

// Test data for all products
const testProducts = [
  {
    id: "1",
    title: "Adobe Photoshop",
    price: 20.99,
    averageRating: 4.8,
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1200px-Adobe_Photoshop_CC_icon.svg.png",
      },
    ],
    features: [
      "Advanced photo editing",
      "Layer-based editing",
      "AI-powered tools",
    ],
    specifications: {
      Platform: "Windows, macOS",
      "Latest Version": "2023",
      "Cloud Storage": "100GB",
    },
  },
  {
    id: "2",
    title: "Microsoft Office 365",
    price: 69.99,
    averageRating: 4.7,
    images: [
      {
        url: "data:image/jpeg;base64,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",
      },
    ],
    features: [
      "Word, Excel, PowerPoint",
      "1TB OneDrive storage",
      "Teams access",
    ],
    specifications: {
      Platform: "Windows, macOS, iOS, Android",
      Users: "Up to 6",
      Updates: "Continuous",
    },
  },
  {
    id: "3",
    title: "Spotify Premium",
    price: 9.99,
    averageRating: 4.6,
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png",
      },
    ],
    features: ["Ad-free music", "Offline listening", "High-quality audio"],
    specifications: {
      Platform: "All devices",
      "Audio Quality": "Up to 320kbps",
      "Simultaneous Devices": "Up to 5",
    },
  },
  {
    id: "4",
    title: "Norton 360 Deluxe",
    price: 49.99,
    averageRating: 4.5,
    images: [
      {
        url: "https://1e3db468.rocketcdn.me/wp-content/uploads/2024/03/norton-360-deluxe-1.png",
      },
    ],
    features: [
      "Real-time threat protection",
      "VPN included",
      "Password manager",
    ],
    specifications: {
      Platform: "Windows, macOS, iOS, Android",
      Devices: "Up to 5",
      "Cloud Backup": "50GB",
    },
  },
];

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonModal = ({ isOpen, onClose }: ComparisonModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-4 flex items-center justify-center">
              <p>Loading products...</p>
            </div>
          ) : (
            testProducts.map((product, index) => (
              <ComparisonColumn
                key={product.id}
                product={product}
                isMain={index === 0}
              />
            ))
          )}
        </div>
        <DialogClose asChild>
          <Button className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const ComparisonColumn = ({
  product,
  isMain = false,
}: {
  product: (typeof testProducts)[0];
  isMain?: boolean;
}) => (
  <div className={`flex flex-col ${isMain ? "bg-blue-50" : ""}`}>
    <h3 className="font-bold text-lg mb-2">{product.title}</h3>
    <img
      src={product.images[0]?.url || "/images/default-product.png"}
      alt={product.title}
      className="w-full h-40 object-contain mb-2"
    />
    <p className="font-semibold">Price: ${product.price}/month</p>
    <p>Rating: {product.averageRating.toFixed(1)}</p>
    <h4 className="font-semibold mt-2">Features:</h4>
    <ul className="list-disc list-inside">
      {product.features?.slice(0, 3).map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <h4 className="font-semibold mt-2">Specifications:</h4>
    <ul className="list-disc list-inside">
      {Object.entries(product.specifications || {})
        .slice(0, 3)
        .map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
    </ul>
  </div>
);

export default ComparisonModal;
