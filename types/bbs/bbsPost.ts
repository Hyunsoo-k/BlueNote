import { MainCategoryType, SubCategoryKoreanType } from "@/types/categorys";

interface BbsPost {
  _id: string;
  number: number;
  createdAt: string;
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  title: string;
  wrtier: {
    _id: string;
    nickname: string;
  };
  views: number;
  content: string;
  thumbnailSrc: null | string;
  recommend: string[];
  __v: number;
};

export type { BbsPost };