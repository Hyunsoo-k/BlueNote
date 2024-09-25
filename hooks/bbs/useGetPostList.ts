import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getPostListFn = async (initialData: any) => {
  const { mainCategory, subCategory, page } = initialData;

  const response = await instance.get(`/bbs/${mainCategory}?subCategory=${subCategory}&page=${page}`);

  return response.data;
};

const useGetPostList = (initialData: any) => {
  const { mainCategory, subCategory, page } = initialData;

  return (
    useQuery({
      queryKey: queryKey.postList(mainCategory, subCategory, page),
      queryFn: () => getPostListFn(initialData),
      initialData
    })
  )
}

export { useGetPostList };
