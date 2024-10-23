import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getPostFn = async (resolvedUrl: string) => {
  const response = await instance.get(`${resolvedUrl}`);

  return response.data;
};

const useGetPost = (resolvedUrl: string, initialData: any) => {

  return useQuery({
    queryKey: queryKey.post(initialData._id),
    queryFn: () => getPostFn(resolvedUrl),
    gcTime: Infinity,
    staleTime: 10 * 6 * 1000,
    placeholderData: initialData
  });
};

export { useGetPost };
