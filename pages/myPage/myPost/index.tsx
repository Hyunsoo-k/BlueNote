import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetMyPostList } from "@/hooks/myPage/useGetMyPostList";
import MyPageMenu from "@/components/myPageMenu";
import PostList from "@/components/bbs/postList/mobilePostList";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface MyPostPageProps {
  initialResponse: any;
}

const MyPostPage = ({ initialResponse }: MyPostPageProps) => {
  const { postList } = initialResponse;

  const response = useGetMyPostList(initialResponse).data;

  return (
    <div className={styles["my-post-page"]}>
      <MyPageMenu currentPage="내가 쓴 글" />
      <div className={styles["my-post-page__content"]}>
        <div className={styles["my-post-page__header"]}>
          <p className={styles["my-post-page__title"]}>내가 쓴 글</p>
          <div className={styles["my-post-page__data"]}>
            <p className={styles["my-post-page__count"]}>
              총 게시물&nbsp;<span>{response.totalPostCount}개</span>
            </p>
            <p className={styles["my-post-page__current-page"]}>
              현재&nbsp;
              <span>
                ({response.page}/{response.totalPageCount})
              </span>
              &nbsp;페이지
            </p>
          </div>
        </div>
        <div className={styles["my-post-page__post-list"]}>
          <PostList postList={postList} />
          <Pagination totalPageCount={response.totalPageCount || 1} page={response.page} />
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
    const { data: initialResponse } = await instance.get(`/MyPostList?page=${query.page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        initialResponse,
      },
    };
  } else {
    const { data: initialResponse } = await instance.get(`/MyPostList`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        initialResponse,
      },
    };
  }
};
