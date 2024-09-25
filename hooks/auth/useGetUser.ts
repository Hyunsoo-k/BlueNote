import { useQuery, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { getCookie } from "@/cookie";
import { queryKey } from "@/queryKey";

const getUserFn = async () => {
  const response = await instance.get("/user");

  return response.data;
};

const useGetUser = () => {
  const queryClient = useQueryClient();
  const initialData = queryClient.getQueryData(queryKey.userMe) || undefined;

  return useQuery({
    queryKey: queryKey.userMe,
    queryFn: getUserFn,
    enabled: !!getCookie("accessToken"),
    staleTime: 12 * 60 * 60 * 1000,
    gcTime: 12 * 60 * 60 * 1000,
    initialData
  });
};

export { useGetUser };
