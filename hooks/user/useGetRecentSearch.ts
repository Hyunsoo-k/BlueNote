import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/user/recentSearch");

  return response.data;
};

const useGetRecentSearch = (userMe: any) => {
  if (userMe) {
    return useQuery({
      queryKey: queryKey.recentSearch(userMe._id),
      queryFn: queryFn
    })
  } else {
    return { data: null };
  };
}

export { useGetRecentSearch };