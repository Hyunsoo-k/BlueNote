import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import ThumbnailList from "@/components/thumbnailList";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface Props {
  query: any;
  initialNewsData: any;
};

const NewsPage = ({ query, initialNewsData }: Props) => {

  return (
    <div className={styles["news-page"]}>
      <BbsHeader
        mainCategory={initialNewsData.mainCategory}
        subCategory={initialNewsData.subCategory}
        totalPostCount={initialNewsData.totalPostCount}
        page={query.page || 1}
        totalPageCount={initialNewsData.totalPageCount}
      />
      <ThumbnailList postList={initialNewsData.postList} />
      <div className={styles["news-page__control-section"]}>
        <Pagination
          subCategory={initialNewsData.subCategory}
          page={query.page || 1}
          totalPageCount={initialNewsData.totalPageCount}
        />
        <SearchingBar />
      </div>
    </div>
  );
};

export default NewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialNewsData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      initialNewsData
    }
  };
};
