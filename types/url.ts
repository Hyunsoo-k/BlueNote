import { MainCategoryType, SubCategoryKoreanType } from "./category/categorys";

interface Url {
  path: {
    mainCategory: MainCategoryType;
    user_id?: string;
    post_id?: string;
    comment_id?: string;
  };
  query?: {
    subCategory?: SubCategoryKoreanType;
    page?: string;
    post_id?: string;
  };
}

export type { Url };
