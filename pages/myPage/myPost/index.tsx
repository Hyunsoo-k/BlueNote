import { GetServerSideProps } from "next";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import { useGetMyPostList } from "@/hooks/myPage/useGetMyPostList";
import MyPageMenu from "@/components/myPageMenu";
import PostList from "@/components/bbs/postList/mobilePostList";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface ServerSideProps {
  initialData: any;
};

const MyPostPage = ({ initialData }: ServerSideProps) => {
  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";

  console.log(initialData);

  return (
    <div className={styles["my-post-page"]}>
      <MyPageMenu currentPage="내가 쓴 글" />
      <div className={styles["my-post-page__content"]}>
        <div className={styles["my-post-page__header"]}>
          <p className={styles["my-post-page__title"]}>내가 쓴 글</p>
          <div className={styles["my-post-page__data"]}>
            <p className={styles["my-post-page__count"]}>
              총 게시물&nbsp;<span>{initialData.totalPostCount}개</span>
            </p>
            <p className={styles["my-post-page__current-page"]}>
              현재&nbsp;
              <span>
                ({initialData.page}/{initialData.totalPageCount})
              </span>
              &nbsp;페이지
            </p>
          </div>
        </div>
        <div className={styles["my-post-page__post-list"]}>
          <PostList
            initialData={initialData}
            resolvedUrl={""}
            viewport={viewport}
          />
          <Pagination
            page={initialData.page}
            totalPage={initialData.totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { accessToken } = context.req.cookies;

  if (query.page) {
    const { data: initialData } = await instance.get(`/MyPostList?page=${query.page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        initialData,
      },
    };
  } else {
    const { data: initialData } = await instance.get(`/MyPostList`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        initialData,
      },
    };
  }
};
