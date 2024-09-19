import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/querykey";

const getPostListFn = async (initialPostList: any) => {
  const { mainCategory, subCategory, page } = initialPostList;

  const response = await instance.get(`/bbs/${mainCategory}?subCategory=${subCategory}&page=${page}`);

  return response.data;
};

const useGetPostList = (initialPostList: any) => {
  const { mainCategory, subCategory, page } = initialPostList;

  return (
    useQuery({
      queryKey: queryKey.postList(mainCategory, subCategory, page),
      queryFn: () => getPostListFn(initialPostList),
      initialData: initialPostList
    })
  )
}

export { useGetPostList };
