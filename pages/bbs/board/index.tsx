import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPostList from "@/components/bbs/bbsPostList";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface ServerSideProps {
  query: any;
  initialBoardData: any;
}

const BoardPage = ({ query, initialBoardData }: ServerSideProps) => {

  return (
    <div className={styles["board-page"]}>
      <BbsHeader
        mainCategory={initialBoardData.mainCategory}
        subCategory={initialBoardData.subCategory} 
        totalPostCount={initialBoardData.totalPostCount}
        page={query.page || 1}
        totalPageCount={initialBoardData.totalPageCount}
      />
      <BbsPostList postList={initialBoardData.postList} />
      <div className={styles["board-page__control-section"]}>
        <Pagination 
          subCategory={query.subCategory} 
          page={query.page || 1}
          totalPageCount={initialBoardData.totalPageCount}
        />
        <SearchingBar />
      </div>
    </div>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialBoardData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      initialBoardData
    }
  };
};
