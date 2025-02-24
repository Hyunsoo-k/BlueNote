import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

import { useGetMobileBoardQuery } from "@/hooks/bbs/useGetMobileBoardQuery";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
  viewport: string;
};

const MobilePostList = ({ initialData, resolvedUrl, viewport }: Props) => {
  const router = useRouter();

  const lastElementRef = useRef<HTMLLIElement | null>(null);

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

    lastElementRef?.current && io.observe(lastElementRef.current);

    return () => {
      lastElementRef?.current && io.unobserve(lastElementRef.current);
    };
  }, [queryData]);

  const handleClickItem = (e: any, mainCategory: string, _id: string) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/${_id}`);
  };

  if (viewport === "mobile") {
    return (
      <>
        <ul className={styles["container"]}>
          {queryData?.pages?.map((page: any, pageIndex: number) =>
            page?.postList?.map((post: any, index: number) => (
              <li
                key={(pageIndex + 1) * index}
                ref={(pageIndex === queryData?.pages?.length - 1 && index === page?.postList?.length - 1) ? lastElementRef : null}
                onClick={(e) => handleClickItem(e, post.mainCategory, post._id)}
                className={styles["element"]}
              >
                <div className={styles["top"]}>
                  <span className={styles["top__title"]}>{post.title}</span>
                  {!!post.commentCount && (
                    <span className={styles["top__comment"]}>({post.commentCount})</span>
                  )}
                </div>
                <div className={styles["bottom"]}>
                  <span className={styles["bottom__writer"]}>{post.writer.nickname}</span>
                  <span className={styles["bottom__views"]}>조회 {post.views}</span>
                  <span className={styles["bottom__recommend"]}>추천 {post.recommend.length}</span>
                  <span className={styles["bottom__sub-category"]}>{post.subCategory}</span>
                  <span className={styles["bottom__created-at"]}>{formatYM(post.createdAt)}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </>
    );
  }
};

export default MobilePostList;
