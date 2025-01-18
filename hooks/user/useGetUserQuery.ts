import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { getCookie } from "@/cookie";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/user");

  console.log("userQueryFn operated.")

  return response.data;
};

const useGetUserQuery = () => {

  return useQuery({
    queryKey: queryKey.userMe,
    queryFn: queryFn,
    enabled: !!getCookie("accessToken"),
    gcTime: 12 * 60 * 60 * 1000,
    staleTime: 12 * 60 * 60 * 1000,
    refetchOnWindowFocus: false, // 브라우저 포커스 변경 시 요청 방지
    refetchOnReconnect: false,  // 네트워크 재연결 시 요청 방지
    refetchOnMount: false,
  });
};

export { useGetUserQuery };
