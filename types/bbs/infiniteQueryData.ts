import { BbsType } from "@/types/bbs/bbs";

interface InfiniteQueryDataType {
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean | undefined;
  data: {
    pageParams: unknown[];
    pages: BbsType[];
  };
};

export type { InfiniteQueryDataType };