import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPost } from "@/hooks/bbs/useGetPost";
import EditPost from "@/components/bbs/editPost";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
};

const BoardEditPostPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {
  const { data: post } = useGetPost(urlWithoutQuery, initialData);

  return (
    <div className={styles["board-edit-post-page"]}>
      <EditPost post={post} />
    </div>
  );
};

export default BoardEditPostPage;

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
