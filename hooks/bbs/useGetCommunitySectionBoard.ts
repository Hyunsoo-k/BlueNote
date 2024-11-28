import { useQuery } from "@tanstack/react-query";

import { MainCategory, SubCategory } from "@/types/categorys";
import { subCategoryUrlMap } from "@/variable";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getCommunitySectionBoardFn = async (
  mainCategory: MainCategory,
  subCategory: string
) => {
  const response = await instance.get(`/bbs/${mainCategory}?subCategory=${subCategoryUrlMap[subCategory]}`);

  return response.data;
};

const useGetCommunitySectionBoard = (
  mainCategory: MainCategory,
  subCategory: string,
  initialData: any,
  conveyInitialData: boolean
) => {
  return useQuery({
    queryKey: queryKey.communitySectionBoard(mainCategory, subCategory),
    queryFn: () => getCommunitySectionBoardFn(mainCategory, subCategory),
    initialData: conveyInitialData ? initialData : undefined
  })
};

export { useGetCommunitySectionBoard };