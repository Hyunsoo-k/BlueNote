import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getPostFn = async (urlWithoutQuery: string) => {
  const response = await instance.get(`${urlWithoutQuery}`);

  return response.data;
};

const useGetPost = (urlWithoutQuery: string, initialData: any) => {

  return useQuery({
    queryKey: queryKey.post(initialData._id),
    queryFn: () => getPostFn(urlWithoutQuery),
    gcTime: Infinity,
    staleTime: 10 * 6 * 1000,
    placeholderData: initialData
  });
};

export { useGetPost };
