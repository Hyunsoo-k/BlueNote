import { GetServerSideProps } from "next";
import Link from "next/link";

import { instance } from "@/axios";
import { useGetViewport } from "@/hooks/viewport";
import Carousel from "@/components/carousel";
import CombinedThumbnail from "@/components/thumbnail/combinedThumbnail";
import CommunitySectionBoard from "@/components/communitySectionBoard";

import styles from "@/styles/Home.module.scss";
import DetachedThumbnail from "@/components/thumbnail/detachedThumbnail";

interface Props {
  initialNewsData: any;
  initialBandData: any;
  initialAlbumData: any;
  initialJazzbarData: any;
  initialBoardData: any;
  initialJobData: any;
};

const Home = ({
  initialNewsData,
  initialBandData,
  initialAlbumData,
  initialJazzbarData,
  initialBoardData,
  initialJobData
}: Props) => {
  const viewport = useGetViewport();

  return (
    <div className={styles["container"]}>
      <div className={styles["news-section"]}>
        <Carousel
          elementList={initialNewsData.postList}
          elementType={viewport === "mobile" ? "combined" : "detached"}
        />
      </div>
      <div className={styles["band-section"]}>
        <p className={styles["band-section__title"]}>Band</p>
        <div className={styles["band-section__thumbnail-box"]}>
          {initialBandData.postList.map((post: any, index: number) => {
            return index < (viewport === "mobile" || viewport === "tablet" ? 6 : 8) && <CombinedThumbnail element={post} key={index} />;
          })}
        </div>
        <Link href="/bbs/promote?subCategory=bandPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      <div className={styles["album-section"]}>
        <p className={styles["album-section__title"]}>Album</p>
        <div className={styles["album-section__thumbnail-box"]}>
          {initialAlbumData.postList.map((post: any, index: number) => {
            return index < (viewport === "mobile" || viewport === "tablet" ? 6 : 8) && <CombinedThumbnail element={post} key={index} />;
          })}
        </div>
        <Link href="/bbs/promote?subCategory=albumPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      <div className={styles["jazzbar-section"]}>
        <p className={styles["jazzbar-section__title"]}>Jazz bar</p>
        <div className={styles["jazzbar-section__thumbnail-box"]}>
          {initialJazzbarData.postList.map((post: any, index: number) => {
            return index < (viewport === "mobile" ? 2 : viewport === "tablet" ? 3 : 4) && <DetachedThumbnail element={post} key={index} />
          })}
        </div>
        <Link href="/bbs/promote?subCategory=jazzbarPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      <div className={styles["community-section"]}>
        <p className={styles["community-section__title"]}>Community</p>
        <CommunitySectionBoard initialData={initialBoardData} />
        <CommunitySectionBoard initialData={initialJobData} />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: initialNewsData } = await instance.get("/bbs/news");
  const { data: initialBandData } = await instance.get("/bbs/promote?subCategory=bandPromotion");
  const { data: initialAlbumData } = await instance.get("/bbs/promote?subCategory=albumPromotion");
  const { data: initialJazzbarData } = await instance.get("/bbs/promote?subCategory=jazzbarPromotion");
  const { data: initialBoardData } = await instance.get("/bbs/board");
  const { data: initialJobData } = await instance.get("/bbs/job");

  return {
    props: {
      initialNewsData,
      initialBandData,
      initialAlbumData,
      initialJazzbarData,
      initialBoardData,
      initialJobData,
    },
  };
};
