import { MainCategoryType } from "./categorys";
import { SubCategoryKoreanType } from "./categorys";

interface PostListItemType {
  _id: string;
  number: number;
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  writer: { _id: string, nickname: string };
  title: string;
  content: string;
  views: number;
  recommend: string[];
  commentCount: number;
  tumbnailSrc: any;
  createdAt: string;
  updatedAt: string;
  previousPost: any;
  nextPost: any;
  __v: number;
}

type PostListType = PostListItemType[];

export type { PostListItemType, PostListType };
