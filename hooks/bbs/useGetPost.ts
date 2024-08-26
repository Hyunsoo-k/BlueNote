import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/querykey";
import { MainCategory } from "@/types/categorys";

const getPostFn = async (mainCategory: MainCategory, post_id: string) => {
  const response = await instance.get(`/bbs/${mainCategory}/post/${post_id}`);
  return response.data;
};

const useGetPost = (mainCategory: MainCategory, post_id: string, initialResponse: any) =>
  useQuery({
    queryKey: queryKey.post(mainCategory, post_id),
    queryFn: () => getPostFn(mainCategory, post_id),
    initialData: initialResponse
  });


export { useGetPost };
