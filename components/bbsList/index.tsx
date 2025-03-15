import { useRef, useEffect } from "react";

import { ViewportType } from "@/types/viewport";
import { useGetPostListQuery } from "@/hooks/bbs/useGetPostListQuery";
import RowThumbnail from "@/components/thumbnail/rowThumbnail";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  initialData: any;
  resolvedUrl: string;
};

const BbsList = ({
  viewport,
  initialData,
  resolvedUrl
}: Props) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    data: queryData,
  } = useGetPostListQuery(initialData.mainCategory, resolvedUrl, initialData);

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
      {queryData?.pages?.map((page: any, pageIndex: number) =>
        page?.postList?.map((post: any, index: number) => (
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