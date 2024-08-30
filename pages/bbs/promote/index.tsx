import { GetServerSideProps } from "next";

import { SubCategory } from "@/types/categorys";
import { PostList as PostListType } from "@/types/postList";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import Thumbnail from "@/components/thumbnail";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface ServerSideProps {
  subCategory: SubCategory,
  page: string,
  initialResponse: any
}

const PromotePage = ({ subCategory, page, initialResponse }: ServerSideProps) => {
  const mainCategory = "promote";
  const response: PostListType = useGetPostList(mainCategory, subCategory, page, initialResponse).data;

  return (
    <div className={styles["promote-page"]}>
      <BbsHeader mainCategory={mainCategory} subCategory={subCategory} response={response} /> 
      <Thumbnail postList={response.postList} />
      <Pagination subCategory={subCategory} data={response} />
    </div>
  );
};

export default PromotePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data } = await instance.get(`${resolvedUrl}`);

  return {
    props: {
      subCategory: query.subCategory || "All",
      page: query.page || "1",
      initialResponse: data
    },
  };
};