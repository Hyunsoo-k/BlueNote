import { MainCategory } from "./categorys";
import { Comment } from "./comment";

type SubCategory =
  | "공지"
  | "국내"
  | "국외"
  | "일반"
  | "녹음"
  | "팁"
  | "밴드홍보"
  | "앨범홍보"
  | "재즈바홍보"
  | "구인"
  | "구직"

interface PostType {
    _id: string;
    number: number;
    mainCategory: MainCategory;
    subCategory: SubCategory;
    writer: { _id: string, nickname: string };
    title: string;
    content: string;
    views: number;
    recommend: string[];
    commentList: Comment[];
    createdAt: string;
    updatedAt: string;
    previousPost: any;
    nextPost: any;
    __v: number;
}

export type { PostType };
