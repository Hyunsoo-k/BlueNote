import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { BbsPostType } from "@/types/bbs/bbsPost";

interface BbsType {
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  page: number;
  totalPage: number;
  totalPostCount: number;
  postList: BbsPostType[];
};

export type { BbsType };
