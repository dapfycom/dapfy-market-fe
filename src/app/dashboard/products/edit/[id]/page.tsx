import productsService from "@/services/productsServices";
import EditProduct from "./EditProduct";

const UpdateProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: product } = await productsService.findOne(id);

  return <EditProduct product={product} />;
};

export default UpdateProduct;
