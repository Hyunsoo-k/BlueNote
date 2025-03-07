import { GetServerSideProps } from "next";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import { useGetPostQuery } from "@/hooks/bbs/useGetPostQuery";
import BbsHeader from "@/components/bbs/bbsHeader";
import Post from "@/components/bbs/post/post";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
}

const BoardPostPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {
  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";

  const { data: post } = useGetPostQuery(urlWithoutQuery, initialData);

  return (
    <div className={styles["container"]}>
      <BbsHeader mainCategory={post.mainCategory} subCategory={post.subCategory} />
      <Post post={post} viewport={viewport} />
    </div>
  );
};

export default BoardPostPage;

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
