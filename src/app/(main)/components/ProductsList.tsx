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

  const products = data?.data;

  return (
    <FramerDiv
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {products.map((product: any, index: number) => (
        <div
          key={product.id}
          className={index % 4 === 0 ? "col-span-3" : "w-full"}
        >
          <ProductCard product={product} small={index % 4 !== 0} />
        </div>
      ))}
    </FramerDiv>
  );
};

export default ProductsList;
