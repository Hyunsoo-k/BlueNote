import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsPostList from "@/components/bbs/bbsPostList";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface ServerSideProps {
  initialPostList: any;
}

const NoticePage = ({ initialPostList }: ServerSideProps) => {
  const {
    data: {
      mainCategory, 
      subCategory,
      postList,
      totalPostCount,
      page,
      totalPageCount
    }
  } = useGetPostList(initialPostList);

  return (
    <div className={styles["notice-page"]}>
      <BbsHeader
        mainCategory={mainCategory}
        subCategory={subCategory}
        totalPostCount={totalPostCount}
        page={page}
        totalPageCount={totalPageCount}
        />
      <BbsPostList postList={postList} />
      <Pagination subCategory={subCategory} page={page} totalPageCount={totalPageCount} />
    </div>
  );
};

export default NoticePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialPostList } = await instance.get(resolvedUrl);

  return {
    props: {
      subCategory: query.subCategory || "All",
      page: query.page || "1",
      initialPostList
    }
  };
};
