import { useInfiniteQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";
import { BbsType } from "@/types/bbs/bbs";

const GetMyPostList = async (cursor: string | null) => {
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
      if (lastPagesQuery.postList.length > 0) {
        return lastPagesQuery.postList[lastPagesQuery.postList.length - 1]._id
      } else {
        return null;
      };
    },
    initialData: {
      pageParams: [null],
      pages: [initialData]
    },
    initialPageParam: null
  });
};

export { useGetMyPostListQuery };
