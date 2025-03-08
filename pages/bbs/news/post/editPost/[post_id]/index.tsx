import { GetServerSideProps } from "next";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import { useGetPostQuery } from "@/hooks/bbs/useGetPostQuery";
import EditPost from "@/components/bbs/post/editPost";

import styles from "./index.module.scss";

interface Props {
  urlWithoutQuery: string;
  initialData: any;
}

const NewsEditPostPage = ({ urlWithoutQuery, initialData }: Props) => {
  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";

  const { data: post } = useGetPostQuery(urlWithoutQuery, initialData);

  return (
    <div className={styles["container"]}>
      <EditPost post={post} viewport={viewport} />
    </div>
  );
};

export default NewsEditPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;

  const urlWithoutQuery = resolvedUrl.replace("editPost/", "");

  const { data: initialData } = await instance.get(urlWithoutQuery);

  return {
    props: {
      urlWithoutQuery,
      initialData,
    },
  };
};
