import { GetServerSideProps } from "next";

import { SubCategory } from "@/types/categorys";
import { PostList as PostListType } from "@/types/postList";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import { instance } from "@/axios";
import BbsHeader from "@/components/bbs/bbsHeader";
import Thumbnail from "@/components/thumbnail";

import styles from "./index.module.scss";

interface ServerSideProps {
  subCategory: SubCategory,
  page: string,
  initialResponse: any
}

const NewsPage = ({ subCategory, page, initialResponse }: ServerSideProps) => {
  const mainCategory = "news";
  const response: PostListType = useGetPostList(mainCategory, subCategory, page, initialResponse).data;

  return (
    <div className={styles["news-page"]}>
      <BbsHeader mainCategory={mainCategory} subCategory={subCategory} response={response} /> 
      <Thumbnail mainCategory={mainCategory} response={response} />
    </div>
  );
};

export default NewsPage;

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