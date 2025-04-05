import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { BbsType } from "@/types/bbs/bbs"
import BbsPageLayout from "@/components/layout/bbsPageLayout";

import styles from "./index.module.scss";;

interface ServerSideProps {
  resolvedUrl: string;
  initialData: BbsType;
};

const JobPage = ({ resolvedUrl, initialData }: ServerSideProps) => {

  return (
    <div className={styles["container"]}>
      <BbsPageLayout
        initialData={initialData}
        mainCategory="job"
        resolvedUrl={resolvedUrl}
      />
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialData } = await instance.get(resolvedUrl);

  return {
    props: {
      initialData,
      resolvedUrl,
    },
  };
};
