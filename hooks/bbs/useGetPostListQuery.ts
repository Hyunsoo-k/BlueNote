import { useInfiniteQuery } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async (resolvedUrl: string, pageParam: number) => {
  const url = new URL(resolvedUrl, window.location.origin);

  url.searchParams.append("page", `${pageParam}`);

  const pathWithQuery = url.pathname + url.search;

  const response = await instance.get(`${pathWithQuery}`);

  return response.data;
};

const useGetPostListQuery = (
  mainCategory: MainCategory,
  resolvedUrl: string,
  initialData: any = undefined
) => {
    return useInfiniteQuery({
      queryKey: queryKey.postListData(mainCategory, resolvedUrl),
      queryFn: ({ pageParam = 1 }) => queryFn(resolvedUrl, pageParam),
      getNextPageParam: (lastPage: any /* 마지막으로 응답받은 일반 리스폰스 값 */) => {
        return lastPage.page < lastPage.totalPage ? lastPage.page + 1 : undefined;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      initialPageParam: 1
    });
};

export { useGetPostListQuery };
