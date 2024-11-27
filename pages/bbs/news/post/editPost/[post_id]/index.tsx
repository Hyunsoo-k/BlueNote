import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPost } from "@/hooks/bbs/useGetPost";
import EditPost from "@/components/bbs/editPost";

import styles from "./index.module.scss";

interface Props {
  urlWithoutQuery: string;
  initialData: any;
}

const NewsEditPostPage = ({ urlWithoutQuery, initialData }: Props) => {
  const { data: post } = useGetPost(urlWithoutQuery, initialData);

  return (
    <div className={styles["news-edit-post-page"]}>
      <EditPost post={post} />
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
