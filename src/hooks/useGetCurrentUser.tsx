import authService from "@/services/authService";
import { selectUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import useSWR from "swr";
const useGetCurrentUser = () => {
  const userOnStore = useAppSelector(selectUser);

  const { data, isLoading, mutate } = useSWR(
    !userOnStore ? "/auth/me" : null,
    () => authService.currentUser(),
    {
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const user = userOnStore || data?.data;

  return { user, isLoading, mutate };
};

export default useGetCurrentUser;
