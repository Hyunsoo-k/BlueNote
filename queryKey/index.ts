import { MainCategory } from "@/types/categorys";

const queryKey = {
  userMe: ["userMe"],
  notification: (userMe_id: string) => ["notification", userMe_id],
  communitySectionBoard: (mainCategory: MainCategory, subCategory: string) => [
    "communitySectionBoard",
    mainCategory,
    subCategory,
  ],
  myPostList: (page: string) => ["myPostList", page],
  postListData: (mainCategory: MainCategory, resolveURL: string) => ["postListData", mainCategory, resolveURL],
  post: (post_id: string) => ["post", post_id],
  comments: (post_id: string) => ["comments", post_id],
};

export { queryKey };
