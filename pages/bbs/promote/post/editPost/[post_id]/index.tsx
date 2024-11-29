import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPost } from "@/hooks/bbs/useGetPost";
import EditPost from "@/components/bbs/editPost";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
}

const PromotePostEditPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {
  const { data: post } = useGetPost(urlWithoutQuery, initialData);

  return (
    <div className={styles["promote-post-edit-page"]}>
      <EditPost post={post} />
    </div>
  );
};

export default PromotePostEditPage;

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
