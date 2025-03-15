import { MainCategoryType, SubCategoryKoreanType } from "@/types/categorys";
import { BbsPost } from "@/types/bbs/bbsPost";

interface BbsType {
  mainCategory: MainCategoryType;
  subCategpry: SubCategoryKoreanType;
  page: number;
  totalPage: number;
  totalPostCount: number;
  postList: BbsPost[];
};

export type { BbsType};