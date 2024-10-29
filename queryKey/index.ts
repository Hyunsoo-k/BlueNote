import { MainCategory } from "@/types/categorys";

const queryKey = {
  userMe: ["userMe"],
  notification: (user_id: string) => ["notification", user_id],
  myPostList: (page: string) => ["myPostList", page],
  postListData: (mainCategory: MainCategory, resolveURL: string) => [
    "postListData",
    mainCategory,
    resolveURL
  ],
  post: (post_id: string) => ["post", post_id],
  comments: (post_id: string) => ["comments", post_id],
};

export { queryKey };
