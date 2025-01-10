import { useEffect } from "react";

import { useGetMobileBoardQuery } from "@/hooks/bbs/useGetMobileBoardQuery";
import DetachedThumbnail from "@/components/thumbnail/detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
  viewport: string;
};

const MobileThumbnailList = ({ initialData, resolvedUrl, viewport }: Props) => {
  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data: queryData,
  } = useGetMobileBoardQuery(initialData.mainCategory, resolvedUrl, initialData);

  useEffect(() => {
    const elements = document.getElementsByClassName("detachedThumbnail_detached-thumbnail__kaCsP");

    if (elements.length === 0) {
      return;
    };

    const lastElement = elements[elements.length - 1] || undefined;
    const lastElementWidth = lastElement?.getBoundingClientRect().height;

    const io = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting && hasNextPage && fetchNextPage();
      },
      {
        root: null,
        rootMargin: `0px 0px ${lastElementWidth + 46}px 0px`,
      }
    );

    lastElement && io.observe(lastElement);

    return () => {
      lastElement && io.unobserve(lastElement);
    };
  }, [queryData]);

  return (
    <div className={styles["mobile-thumbnail-list"]}>
      {queryData?.pages?.map((page: any, pageIndex: number) =>
        page?.postList?.map((post: any, index: number) => (
          <>
            <DetachedThumbnail element={post} key={(pageIndex + 1) * index} />
            {viewport === "mobile" && <div className={styles["mobile-thumbnail-list__boundary-line"]}></div>}
          </>
        ))
      )}
      {isFetchingNextPage && <div className={styles["bbs-post-list__spinner"]}></div>}
    </div>
  );
};

export default MobileThumbnailList;
