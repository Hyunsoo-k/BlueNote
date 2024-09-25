import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import Carousel from "@/components/carousel";
import CombinedThumbnail from "@/components/combinedThumbnail";
import CommunitySectionBoard from "@/components/communitySectionBoard";

import styles from "@/styles/Home.module.scss";

interface Props {
  initialNoticeData: any;
  initialNewsData: any;
  initialBoardData: any;
  initialPromoteData: any;
  initialJobData: any;
}

const Home = ({
  initialNewsData,
  initialBoardData,
  initialPromoteData,
  initialJobData,
}: Props) => {
  const { data: newsData } = useGetPostList(initialNewsData);
  const { data: boardData } = useGetPostList(initialBoardData);
  const { data: promoteData } = useGetPostList(initialPromoteData);
  const { data: jobData } = useGetPostList(initialJobData);

  return (
    <div className={styles["home-page"]}>
      <div className={styles["home-page__news-section"]}>
        <p className={styles["home-page__section-title"]}>News</p>
        <Carousel elementList={newsData.postList} elementType="detached" />
      </div>
      <div className={styles["home-page__promote-section"]}>
        <p className={styles["home-page__section-title"]}>Promote</p>
        <div className={styles["home-page__thumbnail-wrapper"]}>
          {promoteData.postList.map((post: any, index: number) => {
            return index < 8 && <CombinedThumbnail element={post} index={index} />
          })}
        </div>
        <a href="/bbs/news" className={styles["home-page__more-button"]}>더보기</a>
      </div>
      <div className={styles["home-page__community-section"]}>
        <p className={styles["home-page__section-title"]}>Community</p>
          <CommunitySectionBoard initialData={boardData} />
          <CommunitySectionBoard initialData={jobData} />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: initialNewsData} = await instance.get("/bbs/news");
  const { data: initialBoardData } = await instance.get("/bbs/board");
  const { data: initialPromoteData } = await instance.get("/bbs/promote");
  const { data: initialJobData } = await instance.get("/bbs/job");

  return {
    props: {
      initialNewsData,
      initialBoardData,
      initialPromoteData,
      initialJobData,
    },
  };
};
