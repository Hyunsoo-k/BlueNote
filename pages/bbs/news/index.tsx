import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { BbsType } from "@/types/bbs/bbs";
import BbsPageLayout from "@/components/layout/bbsPageLayout";

import styles from "./index.module.scss";

interface Props {
  resolvedUrl: string;
  initialData: BbsType;
}

const NewsPage = ({ resolvedUrl, initialData }: Props) => {
  return (
    <div className={styles["container"]}>
      <BbsPageLayout
        initialData={initialData}
        mainCategory="news"
        resolvedUrl={resolvedUrl}
      />
    </div>
  );
};

export default NewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialData } = await instance.get(resolvedUrl);

  return {
    props: {
      resolvedUrl,
      initialData,
    },
  };
};
