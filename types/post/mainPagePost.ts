import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";

interface MainPagePostType {
  commentCount: number;
  content: string;
  createdAt: string;
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  thumbnailSrc: string;
  title: string;
  writer: string;
  _id: string;
}

export type { MainPagePostType };
