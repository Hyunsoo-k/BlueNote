import { GetServerSideProps } from "next";
import Link from "next/link";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import Carousel from "@/components/carousel";
import CombinedThumbnail from "@/components/combinedThumbnail";
import CommunitySectionBoard from "@/components/communitySectionBoard";

import styles from "@/styles/Home.module.scss";

interface Props {
  resolvedUrl: string;
  initialNoticeData: any;
  initialNewsData: any;
  initialPromoteData: any;
  initialBoardData: any;
  initialJobData: any;
}

const Home = ({
  initialNewsData,
  initialPromoteData,
  initialBoardData,
  initialJobData
}: Props) => {
  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

  return (
    <div className={styles["home-page"]}>
      <div className={styles["home-page__news-section"]}>
        <Carousel elementList={initialNewsData.postList} elementType={viewport === "mobile" ? "combined" : "detached"} />
      </div>
      <div className={styles["home-page__promote-section"]}>
        <p className={styles["home-page__section-title"]}>Promote</p>
        <div className={styles["home-page__thumbnail-wrapper"]}>
          {initialPromoteData.postList.map((post: any, index: number) => {
            return index < (viewport === "tablet" ? 6 : 8) && <CombinedThumbnail element={post} key={index} />;
          })}
        </div>
        <Link href="/bbs/promote" className={styles["home-page__more-button"]}>
          더 보기
        </Link>
      </div>
      <div className={styles["home-page__community-section"]}>
        <p className={styles["home-page__section-title"]}>Community</p>
        <CommunitySectionBoard initialData={initialBoardData} />
        <CommunitySectionBoard initialData={initialJobData} />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const { data: initialNewsData } = await instance.get("/bbs/news");
  const { data: initialBoardData } = await instance.get("/bbs/board");
  const { data: initialPromoteData } = await instance.get("/bbs/promote");
  const { data: initialJobData } = await instance.get("/bbs/job");

  return {
    props: {
      resolvedUrl,
      initialNewsData,
      initialBoardData,
      initialPromoteData,
      initialJobData,
    },
  };
};
