import { FramerDiv } from "@/components/framer";
import { formatPrice } from "@/lib/utils";
import { IProductDetailsResponse } from "@/types/product.types";
import ProductDetails from "./components/ProductDetails";
import ProductImages from "./components/ProductImages";
import ProductLongDetail from "./components/ProductLongDetail";
import ProductReviewForm from "./components/ProductReviewForm";
import ProductReviews from "./components/ProductReviews";
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
            storeSlug={product.store.slug}
          />
        </div>
        {product.longDescription && (
          <ProductLongDetail longDescription={product.longDescription} />
        )}

        <ProductReviews productId={product.id} />

        <ProductReviewForm id={product.id} />
      </FramerDiv>
    </FramerDiv>
  );
};

export default Product;
