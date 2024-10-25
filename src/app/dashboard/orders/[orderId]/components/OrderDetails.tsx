"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import productsService from "@/services/productsServices";
import { IDetailedOrderResponse } from "@/types/order.types";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface OrderDetailsProps {
  order: IDetailedOrderResponse;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [isDownloading, setIsDownloading] = useState<{
    [key: string]: boolean;
  }>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = async (digitalFileKey: string, fileName: string) => {
    setIsDownloading((prev) => ({ ...prev, [digitalFileKey]: true }));
    try {
      const { data } = await productsService.getSignedUrlForDigitalFileDownload(
        digitalFileKey
      );
      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsDownloading((prev) => ({ ...prev, [digitalFileKey]: false }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order #{order.id.slice(0, 8)}</span>
          <Badge
            variant={order.status === "COMPLETED" ? "default" : "secondary"}
          >
            {order.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">
                {item.productTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Seller: {item.storeName}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {item.productDetails.images.slice(0, 2).map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Digital Files:</h4>
                {item.productDetails.digitalFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{file.fileName}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDownload(file.fileName, file.fileName)
                      }
                      disabled={isDownloading[file.fileName]}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isDownloading[file.fileName]
                        ? "Downloading..."
                        : "Download"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
