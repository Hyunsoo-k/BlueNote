import { useQuery } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getPostFn = async (mainCategory: MainCategory, post_id: string) => {
  const response = await instance.get(`/bbs/${mainCategory}/post/${post_id}`);
  return response.data;
};

const useGetPost = (initialResponse: any) => {
  const { mainCategory, _id: post_id } = initialResponse;

  return useQuery({
    queryKey: queryKey.post(mainCategory, post_id),
    queryFn: () => getPostFn(mainCategory, post_id),
    initialData: initialResponse
  });
};

export { useGetPost };
