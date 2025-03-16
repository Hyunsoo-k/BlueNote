import { useInfiniteQuery } from "@tanstack/react-query";

import { MainCategoryType } from "@/types/category/categorys";
import { BbsType } from "@/types/bbs/bbs";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async (resolvedUrl: string, pageParam: number) => {
  const url = new URL(resolvedUrl, window.location.origin);

  url.searchParams.append("page", `${pageParam}`);

  const pathWithQuery = url.pathname + url.search;

  const response = await instance.get(`${pathWithQuery}`);

  return response.data;
};

const useGetBbsListQuery = (
  mainCategory: MainCategoryType,
  resolvedUrl: string,
  initialData: BbsType
) => {
  return useInfiniteQuery({
    queryKey: queryKey.postListData(mainCategory, resolvedUrl),
    queryFn: ({ pageParam } /* context 객체에 내장된 pageParam, 기본 값은 1 */) => queryFn(resolvedUrl, pageParam),
    getNextPageParam: (lastPagesQuery: BbsType): number | undefined => {
      const nextPageParam = lastPagesQuery.page < lastPagesQuery.totalPage
        ? lastPagesQuery.page + 1
        : undefined;

      return nextPageParam; // queryFn의 기본 매개변수인 context 객체의 pageParam 값으로 할당, hasNextPage에 boolean 값으로 할당
    },
    initialData: {
      pageParams: [1],
      pages: [initialData]
    },
    initialPageParam: 1
  });
};

export { useGetBbsListQuery };
