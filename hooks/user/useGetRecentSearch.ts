import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/user/recentSearch");

  return response.data;
};

const useGetRecentSearch = (userMe: any) => {
  return useQuery({
    queryKey: userMe ? queryKey.recentSearch(userMe._id) : [],
    queryFn: queryFn,
    enabled: !!userMe,
  });
}

export { useGetRecentSearch };