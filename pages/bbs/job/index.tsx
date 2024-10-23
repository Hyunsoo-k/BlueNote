import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPostList from "@/components/bbs/bbsPostList";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface ServerSideProps {
  query: any;
  initialJobData: any;
};

const JobPage = ({ query, initialJobData }: ServerSideProps) => {

  return (
    <div className={styles["job-page"]}>
      <BbsHeader
        mainCategory={initialJobData.mainCategory}
        subCategory={initialJobData.subCategory}
        totalPostCount={initialJobData.totalPostCount}
        page={query.page || 1}
        totalPageCount={initialJobData.totalPageCount}
      />
      <BbsPostList postList={initialJobData.postList} />
      <div className={styles["job-page__control-section"]}>
        <Pagination
          subCategory={initialJobData.subCategory}
          page={query.page || 1}
          totalPageCount={initialJobData.totalPageCount}
        />
        <SearchingBar />
      </div>
    </div>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialJobData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      initialJobData
    }
  };
};
