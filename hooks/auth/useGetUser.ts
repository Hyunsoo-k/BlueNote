import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";
import { getCookie } from "@/cookie";

const getUserFn = async () => {
  const response = await instance.get("/user");
  return response.data;
}

const useGetUser = () =>
  useQuery({
    queryKey: queryKey.userMe,
    queryFn: getUserFn,
    enabled: !!getCookie("accessToken")
  })

export { useGetUser };