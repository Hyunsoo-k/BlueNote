import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import BbsHeader from "@/components/bbs/bbsHeader";
import ThumbnailList from "@/components/thumbnailList";

import styles from "./index.module.scss";
import Pagination from "@/components/pagination";

interface Props {
  initialPostList: any;
}

const PromotePage = ({ initialPostList }: Props) => {
  const {
    data: { mainCategory, subCategory, postList, totalPostCount, page, totalPageCount },
  } = useGetPostList(initialPostList);

  return (
    <div className={styles["promote-page"]}>
      <BbsHeader
        mainCategory={mainCategory}
        subCategory={subCategory}
        totalPostCount={totalPostCount}
        page={page}
        totalPageCount={totalPageCount}
      />
      <ThumbnailList postList={postList} />
      <Pagination subCategory={subCategory} page={page} totalPageCount={totalPageCount}/>
    </div>
  );
};

export default PromotePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialPostList } = await instance.get(resolvedUrl);

  return {
    props: {
      subCategory: query.subCategory || "All",
      page: query.page || "1",
      initialPostList,
    },
  };
};
