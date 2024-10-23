import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPostList from "@/components/bbs/bbsPostList";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface ServerSideProps {
  query: any;
  initialNoticeData: any;
}

const NoticePage = ({ query, initialNoticeData }: ServerSideProps) => {

  return (
    <div className={styles["notice-page"]}>
      <BbsHeader
        mainCategory={initialNoticeData.mainCategory}
        subCategory={initialNoticeData.subCategory}
        totalPostCount={initialNoticeData.totalPostCount}
        page={query.page || 1}
        totalPageCount={initialNoticeData.totalPageCount}
      />
      <BbsPostList postList={initialNoticeData.postList} />
      <div className={styles["notice-page__control-section"]}>
        <Pagination
          subCategory={initialNoticeData.subCategory}
          page={query.page || 1}
          totalPageCount={initialNoticeData.totalPageCount}
        />
        <SearchingBar />
      </div>
    </div>
  );
};

export default NoticePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialNoticeData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      initialNoticeData,
    },
  };
};
