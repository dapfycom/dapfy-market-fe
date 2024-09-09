import storesService from "@/services/storesServices";
import useSWR from "swr";

export const useGetUserStores = () => {
  const { data, ...rest } = useSWR(
    "/stores",
    async () => {
      const res = await storesService.findUserStores({ page: 1, take: 10000 });
      return res.data;
    },
    {
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateIfStale: false,
    }
  );
  return { data, ...rest };
};
