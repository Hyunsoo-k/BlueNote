import { useQuery } from "@tanstack/react-query";

import { MainCategoryType, SubCategory } from "@/types/categorys";
import { subCategoryKoreanToEnglishMap } from "@/variable";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getCommunitySectionBoardFn = async (
  mainCategory: MainCategoryType,
  subCategory: string
) => {
  const response = await instance.get(`/bbs/${mainCategory}?subCategory=${subCategoryUrlMap[subCategory]}`);

  return response.data;
};

const useGetCommunitySectionBoard = (
  mainCategory: MainCategoryType,
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