import { FramerDiv } from "@/components/framer";
import productsService from "@/services/productsServices";
import { staggerChildren } from "../../../components/Sidebar/constants";
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
      className="grid grid-cols-[repeat(auto-fit,minmax(256px,256px))] gap-8"
    >
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </FramerDiv>
  );
};

export default ProductsList;
