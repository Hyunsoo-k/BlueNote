import { useInfiniteQuery } from "@tanstack/react-query";

import { BbsType } from "@/types/bbs/bbs";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async (resolvedUrl: string, cursor: string) => {
  // resolvedUrl : path + query string ( ex: /bbs/board?subCategory="tip" )
  const url = new URL(resolvedUrl, window.location.origin);

  url.searchParams.set("cursor", `${cursor}`);

  const pathWithQuery = url.pathname + url.search;

  const response = await instance.get(`${pathWithQuery}`);

  return response.data;
};

const useGetBbsListQuery = (
  resolvedUrl: string,
  initialData: BbsType
) => {
  return useInfiniteQuery({
    queryKey: queryKey.postListData(resolvedUrl),
    queryFn: ({ pageParam: cursor } /* context 객체에 내장된 pageParam, 기본 값은 1 */) => queryFn(resolvedUrl, cursor),
    getNextPageParam: (lastPagesQuery: BbsType): any => {
      if (lastPagesQuery.postList.length > 0) {
        return lastPagesQuery.postList[lastPagesQuery.postList.length - 1]._id
      } else {
        return null;
      };

      // queryFn의 기본 매개변수인 context 객체의 pageParam 값으로 할당, hasNextPage에 boolean 값으로 할당
    },
    initialData: {
      pageParams: [1],
      pages: [initialData]
    },
    initialPageParam: 1
  });
};

export { useGetBbsListQuery };
