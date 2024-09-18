import { FramerDiv } from "@/components/framer";
import productsService from "@/services/productsServices";
import { staggerChildren } from "../constants";
import ProductCard from "./ProductCard";

const ProductsList = async ({
  category,
  search,
}: {
  category: string;
  search?: string;
}) => {
  const { data } = await productsService.findPaginated(
    undefined,
    category,
    search
  );

  const products = data.data;
  return (
    <FramerDiv
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </FramerDiv>
  );
};

export default ProductsList;
