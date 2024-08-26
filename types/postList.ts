import { MainCategory, SubCategory } from "./categorys";
import { Post } from "./post";

interface PostList {
  mainCategory: MainCategory;
  subCategory: SubCategory;
  postList: Post[];
  totalPostCount: number;
  page: number;
  totalPageCount: number;
}

export type { PostList };
