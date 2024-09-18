"use client";
import { FramerDiv } from "@/components/framer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import productsService from "@/services/productsServices";
import { Star } from "lucide-react";
import useSWR from "swr";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useSWR(`/products/reviews/${productId}`, () =>
    productsService.findReviews(productId)
  );

  const reviews = data?.data || [];

  if (isLoading) return <div>Loading...</div>;
  if (reviews?.length === 0) return null;

  return (
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
        {reviews.map((review, index) => (
          <FramerDiv
            key={review.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {review.user.username}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          </FramerDiv>
        ))}
      </div>
    </FramerDiv>
  );
};

export default ProductReviews;
