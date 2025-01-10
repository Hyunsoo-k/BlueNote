import { useQuery } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";


const queryFn = async (resolvedUrl: string) => {
  const response = await instance.get(`${resolvedUrl}`);

  return response.data;
};

const useGetBoardQuery = (
  mainCategory: MainCategory,
  resolvedUrl: string,
  initialData: any = undefined
) => {
    return useQuery({
      queryKey: queryKey.postListData(mainCategory, resolvedUrl),
      queryFn: () => queryFn(resolvedUrl),
      gcTime: 0,
      placeholderData: initialData,
    });

};

export { useGetBoardQuery };
