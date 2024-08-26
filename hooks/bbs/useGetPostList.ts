import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/querykey";
import { MainCategory, SubCategory } from "@/types/categorys";

const getPostListFn = async (mainCategory: MainCategory, subCategory: SubCategory, page: string) => {
  const response = await instance.get(`/bbs/${mainCategory}?subCategory=${subCategory}&page=${page}`);
  return response.data;
};

const useGetPostList = (mainCategory: MainCategory, subCategory: SubCategory, page: string, initialResponse: any) =>
  useQuery({
    queryKey: queryKey.postList(mainCategory, subCategory, page),
    queryFn: () => getPostListFn(mainCategory, subCategory, page),
    initialData: initialResponse
  });

export { useGetPostList };
