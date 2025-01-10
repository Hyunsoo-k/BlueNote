import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async (urlWithoutQuery: string) => {
  const response = await instance.get(`${urlWithoutQuery}`);

  return response.data;
};

const useGetPostQuery = (urlWithoutQuery: string, initialData: any) => {

  return useQuery({
    queryKey: queryKey.post(initialData._id),
    queryFn: () => queryFn(urlWithoutQuery),
    gcTime: Infinity,
    staleTime: 10 * 6 * 1000,
    placeholderData: initialData
  });
};

export { useGetPostQuery };
