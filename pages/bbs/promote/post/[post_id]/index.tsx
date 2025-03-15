import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import PostPageLayout from "@/components/layout/postPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  urlWithoutQuery: string;
  initialData: any;
}

const PromotePostPage = ({ urlWithoutQuery, initialData }: ServerSideProps) => {

  return (
    <div className={styles["container"]}>
      <PostPageLayout
        initialData={initialData}
      />
    </div>
  );
};

export default PromotePostPage;

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
