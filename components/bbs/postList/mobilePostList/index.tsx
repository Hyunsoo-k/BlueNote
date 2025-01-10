import { useRouter } from "next/router";
import { useEffect } from "react";

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

  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data: queryData,
  } = useGetMobileBoardQuery(initialData.mainCategory, resolvedUrl, initialData);

  useEffect(() => {
    const elements = document.getElementsByClassName(styles["mobile-post-list__element"]);

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

  const handleClickItem = (e: any, mainCategory: string, _id: string) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/${_id}`);
  };

  if (viewport === "mobile") {
    return (
      <>
        <ul className={styles["mobile-post-list"]}>
          {queryData?.pages?.map((page: any, pageIndex: number) =>
            page?.postList?.map((post: any, index: number) => (
              <li
                key={(pageIndex + 1) * index}
                onClick={(e) => handleClickItem(e, post.mainCategory, post._id)}
                className={styles["mobile-post-list__element"]}
              >
                <div className={styles["mobile-post-list__element-top"]}>
                  <p className={styles["mobile-post-list__title"]}>{post.title}</p>
                  {post.commentList.length > 0 && (
                    <p className={styles["mobile-post-list__comment"]}>({post.commentList.length})</p>
                  )}
                </div>
                <div className={styles["mobile-post-list__element-bottom"]}>
                  <p className={styles["mobile-post-list__writer"]}>{post.writer.nickname}</p>
                  <p className={styles["mobile-post-list__views"]}>조회 {post.views}</p>
                  <p className={styles["mobile-post-list__recommend"]}>추천 {post.recommend.length}</p>
                  <p className={styles["mobile-post-list__sub-category"]}>{post.subCategory}</p>
                  <p className={styles["mobile-post-list__created-at"]}>{formatYM(post.createdAt)}</p>
                </div>
              </li>
            ))
          )}
        </ul>
        {isFetchingNextPage && <div className={styles["mobile-post-list__spinner"]}></div>}
      </>
    );
  }
};

export default MobilePostList;
