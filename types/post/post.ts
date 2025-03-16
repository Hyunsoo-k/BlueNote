import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { CommentType } from "@/types/comment/comment";

interface PostType {
  _id: string;
  number: number;
  mainCategory: MainCategoryType;
  subCategory: SubCategoryKoreanType;
  writer: { _id: string; nickname: string };
  title: string;
  content: string;
  views: number;
  recommend: string[];
  commentList: CommentType[];
  createdAt: string;
  updatedAt: string;
  previousPost: any;
  nextPost: any;
  __v: number;
}

export type { PostType };
