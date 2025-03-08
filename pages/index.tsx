import { GetServerSideProps } from "next";
import Link from "next/link";

import { instance } from "@/axios";
import { useGetViewport } from "@/hooks/viewport";
import Carousel from "@/components/carousel/carousel";
import AlbumCarousel from "@/components/carousel/albumCarousel";
import CombinedThumbnail from "@/components/thumbnail/combinedThumbnail";
import CommunitySectionBoard from "@/components/bbs/postList/communitySectionBoard";

import styles from "@/styles/Home.module.scss";

interface Props {
  mainPageNewsList: any;
  mainPageBandList: any;
  mainPageAlbumList: any;
  mainPageJazzbarList: any;
  mainPageBoardList: any;
  mainPageJobList: any;
};

const Home = ({
  mainPageNewsList,
  mainPageBandList,
  mainPageAlbumList,
  mainPageJazzbarList,
  mainPageBoardList,
  mainPageJobList,
}: Props) => {
  const viewport = useGetViewport();

  return (
    <div className={styles["container"]}>
      <div className={styles["news-section"]}>
        <Carousel
          elementList={mainPageNewsList}
          elementType={viewport === "mobile" ? "combined" : "detached"}
          viewport={viewport}
          isElementJazzBar={false}
        />
      </div>
      <div className={styles["band-section"]}>
        <p className={styles["band-section__title"]}>BAND</p>
        <div className={styles["band-section__thumbnail-box"]}>
          {mainPageBandList.map((post: any, index: number) => {
            return index < (viewport === "mobile" ? 4 : 6)
              && <CombinedThumbnail element={post} key={post._id} />;
          })}
        </div>
        <Link href="/bbs/promote?subCategory=bandPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      <div className={styles["album-section"]}>
        <p className={styles["album-section__title"]}>ALBUM</p>
        <AlbumCarousel elementList={mainPageAlbumList} viewport={viewport} />
        <Link href="/bbs/promote?subCategory=albumPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      <div className={styles["jazzbar-section"]}>
        <p className={styles["jazzbar-section__title"]}>JAZZ BAR</p>
          <Carousel
            elementList={mainPageJazzbarList}
            elementType="detached"
            viewport={viewport}
            isElementJazzBar={true}
          />
        <Link href="/bbs/promote?subCategory=jazzbarPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
      {viewport !== "mobile" && (
        <div className={styles["community-section"]}>
          <p className={styles["community-section__title"]}>COMMUNITY</p>
          <CommunitySectionBoard mainCategory="board" initialData={mainPageBoardList} />
          <CommunitySectionBoard mainCategory="job" initialData={mainPageJobList} />
        </div>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await instance.get("/mainPage");

  const { 
    mainPageNewsList, 
    mainPageBandList, 
    mainPageAlbumList, 
    mainPageJazzbarList, 
    mainPageBoardList, 
    mainPageJobList 
  } = response.data;

  return {
    props: {
      mainPageNewsList,
      mainPageBandList,
      mainPageAlbumList,
      mainPageJazzbarList,
      mainPageBoardList,
      mainPageJobList,
    },
  };
};
