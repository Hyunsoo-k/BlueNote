import { GetServerSideProps } from "next";

import { BbsType } from "@/types/bbs/bbs";
import { instance } from "@/axios";
import BbsPageLayout from "@/components/layout/bbsPageLayout";

import styles from "./index.module.scss";

interface ServerSideProps {
  resolvedUrl: string;
  initialData: BbsType;
};

const PromotePage = ({ resolvedUrl, initialData }: ServerSideProps) => {

  return (
    <div className={styles["container"]}>
      <BbsPageLayout
        resolvedUrl={resolvedUrl}
        initialData={initialData}
      />
    </div>
  );
};

export default PromotePage;

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
