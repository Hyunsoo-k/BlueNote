import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import ThumbnailList from "@/components/thumbnailList";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface Props {
  query: any;
  initialPromoteData: any;
};

const PromotePage = ({ query, initialPromoteData }: Props) => {

  return (
    <div className={styles["promote-page"]}>
      <BbsHeader
        mainCategory={initialPromoteData.mainCategory}
        subCategory={initialPromoteData.subCategory}
        totalPostCount={initialPromoteData.totalPostCount}
        page={query.page || 1}
        totalPageCount={initialPromoteData.totalPageCount}
      />
      <ThumbnailList postList={initialPromoteData.postList} />
      <div className={styles["promote-page__control-section"]}>
        <Pagination
          subCategory={initialPromoteData.subCategory}
          page={query.page || 1}
          totalPageCount={initialPromoteData.totalPageCount}
        />
        <SearchingBar />
      </div>
    </div>
  );
};

export default PromotePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialPromoteData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      initialPromoteData,
    }
  };
};
