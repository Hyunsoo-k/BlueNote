import { GetServerSideProps } from "next";
import { useRef } from "react";

import { instance } from "@/axios";
import MyPageMenu from "@/components/myPageMenu";
import PostList from "@/components/bbs/postList";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface MyPostPageProps {
  initialResponse: any;
  page: string;
}

const MyPostPage = ({ initialResponse, page }: MyPostPageProps) => {
  const { postList } = initialResponse;

  return (
    <div className={styles["my-post-page"]}>
      <MyPageMenu currentPage="" />
      <div className={styles["my-post-page__content"]}>
        <h1 className={styles["my-post-page__title"]}>내가 쓴 글</h1>
        <div className={styles["my-post-page__post-list"]}>
          <PostList postList={postList} />
          <Pagination data={initialResponse} />
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { accessToken } = context.req.cookies;

  if (!query.page) {
    const { data: initialResponse } = await instance.get(`/MyPostList`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return {
      props: {
        initialResponse,
        page: "1"
      }
    };
  } else {
    const { data: initialResponse } = await instance.get(`/MyPostList?page=${query.page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return {
      props: {
        initialResponse,
        Page: query.page
      }
    };
  }
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context
//   if (query.page) {
//     console.log("is");
//   } else {
//     console.log("isn't");
//   }

//   return{
//     props: {
//       initialResponse: "hello"
//     }
//   }
// }