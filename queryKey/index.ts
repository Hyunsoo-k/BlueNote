import { MainCategory, SubCategory } from "@/types/categorys";

const queryKey = {
  userMe: ["userMe"],
  myPostList: (page: string) => ["myPostList", page],
  postList: (mainCategory: MainCategory, subCategory: SubCategory, page: string) => [mainCategory, subCategory, page],
  post: (mainCategory: MainCategory, post_id: string) => [mainCategory, post_id],
  comments: (mainCategory: MainCategory, post_id: string) => [mainCategory, post_id, "comments"],
};

export { queryKey };
