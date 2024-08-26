import { GetServerSideProps } from "next";

import { SubCategory } from "@/types/categorys";
import { PostList as PostListType } from "@/types/postList";
import { instance } from "@/axios";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import BbsHeader from "@/components/bbs/bbsHeader";
import PostList from "@/components/bbs/postList";
import Pagination from "@/components/pagination";

import styles from "./index.module.scss";

interface ServerSideProps {
  subCategory: SubCategory,
  page: string,
  initialResponse: any
}

const JobPage = ({ subCategory, page, initialResponse }: ServerSideProps) => {
  const mainCategory = "job";
  const response: PostListType = useGetPostList(mainCategory, subCategory, page, initialResponse).data;

  return (
    <div className={styles["job-page"]}>
      <BbsHeader mainCategory={mainCategory} subCategory={subCategory} response={response} /> 
      <PostList mainCategory={mainCategory} response={response} />
      <Pagination subCategory={subCategory} page={page} response={response} />
    </div>
  );
};

export default JobPage;

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