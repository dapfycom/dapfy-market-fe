import productsService from "@/services/productsServices";
import useSWR from "swr";

export const useGetProducts = () => {
  const { data, ...rest } = useSWR("/products", async () => {
    const res = await productsService.findUserProducts({
      page: 1,
      take: 10000,
    });
    return res.data;
  });
  return { data, ...rest };
};
