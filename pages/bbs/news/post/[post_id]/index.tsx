import { GetServerSideProps } from "next";

import { useGetPost } from "@/hooks/bbs/useGetPost";
import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPost from "@/components/bbs/bbsPost";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
};

const NewsPostPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {
  const { data: post } = useGetPost(urlWithoutQuery, initialData);

  return (
    <div className={styles["news-post-page"]}>
      <BbsHeader mainCategory={post.mainCategory} subCategory={post.subCategory} />
      <BbsPost post={post} />
    </div>
  );
};

export default NewsPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;

  const urlWithoutQuery = new URL(resolvedUrl, `http://${context.req.headers.host}`).pathname;

  await instance.post(`${urlWithoutQuery}/views`);

  const { data: initialData } = await instance.get(`${urlWithoutQuery}`);

  return {
    props: {
      urlWithoutQuery,
      initialData,
    },
  };
};