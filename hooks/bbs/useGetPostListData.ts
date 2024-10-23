import { useQuery } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getPostListDataFn = async (resolveURL: string) => {
  const response = await instance.get(`${resolveURL}`);

  return response.data;
};

const useGetPostListData = (mainCategory: MainCategory, resolveURL: string, initialData: any = undefined) => {

  return useQuery({
    queryKey: queryKey.postListData(mainCategory, resolveURL),
    queryFn: () => getPostListDataFn(resolveURL),
    gcTime: 0,
    placeholderData: initialData
  });
};

export { useGetPostListData };
