import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";

interface BbsPostType {
  _id: string;
  number: number;
  createdAt: string;
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  title: string;
  writer: {
    _id: string;
    nickname: string;
  };
  content: string;
  thumbnailSrc: null | string;
  views: number;
  recommend: string[];
  __v: number;
};

export type { BbsPostType };
