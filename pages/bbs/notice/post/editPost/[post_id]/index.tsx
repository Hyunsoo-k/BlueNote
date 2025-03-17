import { GetServerSideProps } from "next";

import { PostType } from "@/types/post/post";
import { instance } from "@/axios";
import EditPostPageLayout from "@/components/layout/editPostPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: PostType;
};

const NoticePostEditPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {

  return (
    <div className={styles["container"]}>
      <EditPostPageLayout
        urlWithoutQuery={urlWithoutQuery}
        initialData={initialData}
      />
    </div>
  );
};

export default NoticePostEditPage;

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
