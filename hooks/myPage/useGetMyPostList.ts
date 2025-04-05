import { useInfiniteQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";
import { BbsType } from "@/types/bbs/bbs";

const GetMyPostList = async (cursor: string) => {
  const response = await instance.get(`/myPostList${cursor ? `?cursor=${cursor}` : ""}`);

  return response.data;
};

const useGetMyPostListQuery = (
  initialData: BbsType,
  cursor: string
) => {
  return useInfiniteQuery({
    queryKey: queryKey.myPostList,
    queryFn: () => GetMyPostList(cursor),
    getNextPageParam: (lastPagesQuery: BbsType): any => {
      // queryFn의 기본인자인 context 객체의 pageParam 값으로 할당
      // hasNextPage에 boolean 값으로 할당
      
      console.log(lastPagesQuery)
    },
    initialData: {
      pageParams: [1],
      pages: [initialData]
    },
    initialPageParam: 1
  });
};

export { useGetMyPostListQuery };
