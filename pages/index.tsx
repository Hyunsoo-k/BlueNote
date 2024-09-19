import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import Carousel from "@/components/carousel";
import MainPageSection from "@/components/mainPageSection";

import styles from "@/styles/Home.module.scss";

interface Props {
  initialNoticePostList: any;
  initialNewsPostList: any;
  initialBoardPostList: any;
  initialPromotePostList: any;
  initialJobPostList: any;
}

const Home = ({
  initialNoticePostList,
  initialNewsPostList,
  initialBoardPostList,
  initialPromotePostList,
  initialJobPostList,
}: Props) => {
  const { data: noticePostsData } = useGetPostList(initialNoticePostList);
  const { data: newsPostsData } = useGetPostList(initialNewsPostList);
  const { data: boardPostsData } = useGetPostList(initialBoardPostList);
  const { data: promotePostsData } = useGetPostList(initialPromotePostList);
  const { data: jobPostsData } = useGetPostList(initialJobPostList);

  return (
    <div className={styles["wrapper"]}>
      <Carousel carouselList={initialNewsPostList.postList} />
      <div className={styles["section-wrapper"]}>
        <MainPageSection postsData={noticePostsData} />
        <MainPageSection postsData={newsPostsData}  />
        <MainPageSection postsData={boardPostsData}  />
        <MainPageSection postsData={promotePostsData}  />
        <MainPageSection postsData={jobPostsData}  />
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: initialNoticePostList } = await instance.get("/bbs/notice");
  const { data: initialNewsPostList } = await instance.get("/bbs/news");
  const { data: initialBoardPostList } = await instance.get("/bbs/board");
  const { data: initialPromotePostList } = await instance.get("/bbs/promote");
  const { data: initialJobPostList } = await instance.get("/bbs/job");

  return {
    props: {
      initialNoticePostList,
      initialNewsPostList,
      initialBoardPostList,
      initialPromotePostList,
      initialJobPostList,
    },
  };
};
