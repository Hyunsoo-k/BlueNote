import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/recommendedNews");

  return response.data;
};

const useGetRecommendedNewsQuery = () => {
  return useQuery({
    queryKey: queryKey.recommendedNews,
    queryFn
  });
};

export { useGetRecommendedNewsQuery };