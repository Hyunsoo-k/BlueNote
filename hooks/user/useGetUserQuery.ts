import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { getCookie } from "@/cookie";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/user");

  return response.data;
};

const useGetUserQuery = () => {

  return useQuery({
    queryKey: queryKey.userMe,
    queryFn: queryFn,
    enabled: !!getCookie("accessToken"),
    gcTime: 12 * 60 * 60 * 1000,
    staleTime: 12 * 60 * 60 * 1000,
  });
};

export { useGetUserQuery };
