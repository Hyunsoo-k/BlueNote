import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPostQuery } from "@/hooks/bbs/useGetPostQuery";
import EditPostPageLayout from "@/components/layout/editPostPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
};

const NewsPostEditPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {

  const { data: post } = useGetPostQuery(urlWithoutQuery, initialData);

  return (
    <div className={styles["container"]}>
      <EditPostPageLayout post={post} />
    </div>
  );
};

export default NewsPostEditPage;

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
