import { AUTH_TOKEN_KEY } from "@/config";
import authService from "@/services/authService";
import { clearUser, selectUser, setUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import useSWR from "swr";

export const useGetApiUser = () => {
  const authToken = getCookie(AUTH_TOKEN_KEY);
  const dispatch = useAppDispatch();

  const { data, error, isLoading, mutate } = useSWR(
    authToken ? "/auth/me" : null,
    () => authService.currentUser(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (error) => {
        if (error.response?.status === 401) {
          dispatch(clearUser());
        }
      },
    }
  );

  return { data, error, isLoading, mutate };
};

const useGetCurrentUser = () => {
  const userOnStore = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { data, error, isLoading, mutate } = useGetApiUser();

  useEffect(() => {
    if (data?.data && !userOnStore) {
      dispatch(setUser(data.data));
    }
  }, [data, userOnStore, dispatch]);

  const user = userOnStore || data?.data || null;

  return { user, isLoading, error, mutate };
};

export default useGetCurrentUser;
