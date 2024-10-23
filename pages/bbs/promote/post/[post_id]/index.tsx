import { GetServerSideProps } from "next";

import { useGetPost } from "@/hooks/bbs/useGetPost";
import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPost from "@/components/bbs/bbsPost";

import styles from "./index.module.scss";

interface ServerSideProps {
  initialPost: any;
}

const PromotePostPage = ({ initialPost }: ServerSideProps) => {
  const { data: post } = useGetPost(initialPost);

  return (
    <div className={styles["promote-post-page"]}>
      <BbsHeader mainCategory={post.mainCategory} subCategory={post.subCategory} />
      <BbsPost post={post} />
    </div>
  );
};

export default PromotePostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl, params } = context;

  await instance.post(`${resolvedUrl}/views`);
  const { data: initialPost } = await instance.get(`${resolvedUrl}`);

  return {
    props: {
      post_id: params?.post_id,
      initialPost,
    },
  };
};
