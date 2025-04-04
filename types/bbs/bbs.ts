import { BbsPostType } from "@/types/bbs/bbsPost";

interface BbsType {
  hasNextPage: boolean
  postList: BbsPostType[];
};

export type { BbsType };
