import { GetServerSideProps } from "next";

import { useGetPost } from "@/hooks/bbs/useGetPost";
import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BoardPost from "@/components/bbs/post";

import styles from "./index.module.scss";

interface ServerSideProps {
  post_id: string;
  initialResponse: any;
}

const BoardPostPage = ({ post_id, initialResponse }: ServerSideProps) => {
  const mainCategory = "board";
  const response = useGetPost(mainCategory, post_id, initialResponse).data;

  return (
    <div className={styles["board-post-page"]}>
      <BbsHeader mainCategory={mainCategory} subCategory={response.post.subCategory} />
      <BoardPost mainCategory={mainCategory} post_id={post_id} post={response.post} />
    </div>
  );
};

export default BoardPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl, params } = context;
  
  const { data: initialResponse } = await instance.get(`${resolvedUrl}`);

  return {
    props: {
      post_id: params?.post_id,
      initialResponse
    },
  };
};
