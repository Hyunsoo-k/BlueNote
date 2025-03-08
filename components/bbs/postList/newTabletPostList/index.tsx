import { useRef, useEffect } from "react";

import { useGetMobileBoardQuery } from "@/hooks/bbs/useGetMobileBoardQuery";
import RowThumbnail from "@/components/thumbnail/rowThumbnail";

import styles from "./index.module.scss";
import TabletBbsControl from "../../control/tabletBbsControl";
import InheritSearchingBar from "../../control/bbsControl/inheritSearchingBar";

interface Props {
  initialData: any;
  resolvedUrl: string;
  viewport: string;
};

const NewTalbetPostList = ({ initialData, resolvedUrl, viewport }: Props) => {
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
      <div className={styles["main"]}>
        {/* <div className={styles["control"]}>
          <InheritSearchingBar />
        </div> */}
      {!isFetching && !queryData.pages[0].totalPostCount && (
        <p className={styles["not-found-message"]}>등록된 게시글이 없습니다.</p>
      )}
      <div className={styles["post-list-wrapper"]}>
        {queryData?.pages?.map((page: any, pageIndex: number) =>
          page?.postList?.map((post: any, index: number) => (
            <RowThumbnail
              ref={lastElementRef}
              page={page}
              pageIndex={pageIndex}
              index={index}
              queryData={queryData}
              post={post}
            />)
        ))}
      </div>
      </div>
      <div className={styles["control-wrapper"]}>
        <TabletBbsControl
          mainCategory={initialData.mainCategory}
          resolvedUrl={resolvedUrl}
        />
      </div>
    </div>
  );
};

export default NewTalbetPostList;