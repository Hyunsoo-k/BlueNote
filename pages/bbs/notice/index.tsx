import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsPageLayout from "@/components/layout/bbsPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  query: any;
  resolvedUrl: string;
  initialData: any;
}

const NoticePage = ({ query, resolvedUrl, initialData }: ServerSideProps) => {
  return (
    <div className={styles["container"]}>
      <BbsPageLayout
        initialData={initialData}
        resolvedUrl={resolvedUrl}
      />
    </div>
  );
};

export default NoticePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      resolvedUrl,
      initialData,
    },
  };
};
