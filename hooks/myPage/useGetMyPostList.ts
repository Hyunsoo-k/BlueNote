import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const GetMyPostList = async (initialResponse: any) => {
  const { page } = initialResponse;

  const response = await instance.get(`/MyPostList?page=${page}`);

  return response.data;
};

const useGetMyPostList = (initialResponse: any) =>
  useQuery({
    queryKey: queryKey.myPostList(initialResponse.page),
    queryFn: () => GetMyPostList(initialResponse),
    initialData: initialResponse
  });

export { useGetMyPostList };
