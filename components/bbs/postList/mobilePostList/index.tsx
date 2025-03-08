import { useRef, useEffect } from "react";

import { useGetMobileBoardQuery } from "@/hooks/bbs/useGetMobileBoardQuery";
import RowThumbnail from "@/components/thumbnail/rowThumbnail";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
  viewport: string;
};

const MobilePostList = ({ initialData, resolvedUrl, viewport }: Props) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    isFetching,
    fetchNextPage,
    hasNextPage,
    data: queryData,
  } = useGetMobileBoardQuery(initialData.mainCategory, resolvedUrl, initialData);

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
    <div className={styles["container"]}>
      {!isFetching && !queryData.pages[0].totalPostCount && (
        <p className={styles["not-found-message"]}>등록된 게시글이 없습니다.</p>
      )}
      {queryData?.pages?.map((page: any, pageIndex: number) =>
        page?.postList?.map((post: any, index: number) => (
          <RowThumbnail
            key={(pageIndex + 1) * index}
            ref={lastElementRef}
            page={page}
            pageIndex={pageIndex}
            index={index}
            queryData={queryData}
            post={post}
          />
        )
      ))}
    </div>
  );
};

export default MobilePostList;
