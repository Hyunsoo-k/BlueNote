import { useRef, useEffect } from "react";

import { ViewportType } from "@/types/viewport/viewport";
import { BbsType } from "@/types/bbs/bbs";
import { BbsPostType } from "@/types/bbs/bbsPost";
import { InfiniteQueryDataType } from "@/types/bbs/infiniteQueryData";
import { useGetPostListQuery } from "@/hooks/bbs/useGetPostListQuery";
import RowThumbnail from "@/components/thumbnail/rowThumbnail";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  resolvedUrl: string;
  initialData: BbsType;
};

const BbsList = ({ viewport, resolvedUrl, initialData }: Props) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    data: queryData,
  }: InfiniteQueryDataType = useGetPostListQuery(initialData.mainCategory, resolvedUrl, initialData);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting && hasNextPage && fetchNextPage();
      },
      {
        root: null,
        threshold: 1,
      }
    );

    lastElementRef?.current && io.observe(lastElementRef.current);

    return () => {
      lastElementRef?.current && io.unobserve(lastElementRef.current);
    };
  }, [queryData]);

  return (
    <div className={styles["component"]}>
      {queryData.pages.map((page: BbsType, pageIndex: number) =>
        page.postList.map((post: BbsPostType, index: number) => (
          <RowThumbnail
            key={(pageIndex + 1) * index}
            ref={lastElementRef}
            viewport={viewport}
            page={page}
            pageIndex={pageIndex}
            index={index}
            queryData={queryData}
            post={post}
          />
        ))
      )}
    </div>
  );
};

export default BbsList;
