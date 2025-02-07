import { useRef, useEffect } from "react";

import { useGetMobileBoardQuery } from "@/hooks/bbs/useGetMobileBoardQuery";
import DetachedThumbnail from "@/components/thumbnail/detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
};

const MobileThumbnailList = ({ initialData, resolvedUrl }: Props) => {
  const lastBoundaryRef = useRef<HTMLDivElement | null>(null);

  const {
    isFetchingNextPage,
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

    lastBoundaryRef?.current && io.observe(lastBoundaryRef.current);

    return () => {
      lastBoundaryRef?.current && io.unobserve(lastBoundaryRef.current);
    };
  }, [queryData]);  

  return (
    <div className={styles["container"]}>
      {queryData?.pages?.map((page: any, pageIndex: number) =>
        page?.postList?.map((post: any, index: number) => (
          <>
            <DetachedThumbnail element={post} key={(pageIndex + 1) * index} />
            <div
              ref={(pageIndex === queryData?.pages?.length - 1 && index === page?.postList?.length - 1) ? lastBoundaryRef : null}
              className={styles["boundary-line"]}
            ></div>
          </>
        ))
      )}
      {/* {isFetchingNextPage && <div className={styles["spinner"]}></div>} */}
    </div>
  );
};

export default MobileThumbnailList;
