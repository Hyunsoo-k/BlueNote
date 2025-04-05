import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { BbsType } from "@/types/bbs/bbs";
import BbsPageLayout from "@/components/layout/bbsPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  resolvedUrl: string;
  initialData: BbsType;
};

const NoticePage = ({ resolvedUrl, initialData }: ServerSideProps) => {
  return (
    <div className={styles["container"]}>
      <BbsPageLayout
        initialData={initialData}
        mainCategory="notice"
        resolvedUrl={resolvedUrl}
      />
    </div>
  );
};

export default NoticePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const { data: initialData } = await instance.get(resolvedUrl);

  return {
    props: {
      resolvedUrl,
      initialData,
    },
  };
};
