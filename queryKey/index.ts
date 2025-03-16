import { MainCategoryType } from "@/types/category/categorys";

const queryKey = {
  userMe: ["userMe"],
  notification: (userMe_id: string) => ["notification", userMe_id],
  recentSearch: (userMe_id: string) => ["recentSearch", userMe_id],
  photoNews: ["photoNews"],
  recommendedNews: ["recommendedNews"],
  myPostList: (page: string) => ["myPostList", page],
  mobilePostListData: (mainCategory: MainCategoryType, page: number) => ["mobilePostListData", mainCategory, page],
  postListData: (mainCategory: MainCategoryType, resolveURL: string) => ["postListData", mainCategory, resolveURL],
  post: (post_id: string) => ["post", post_id],
  comments: (post_id: string) => ["comments", post_id],
};

export { queryKey };
