import { GetServerSideProps } from "next";
import Link from "next/link";

import { instance } from "@/axios";
import { MainPagePostType } from "@/types/post/mainPagePost";
import { useGetViewport } from "@/hooks/viewport";
import Carousel from "@/components/carousel/carousel";
import AlbumCarousel from "@/components/carousel/albumCarousel";
import CombinedThumbnail from "@/components/thumbnail/combinedThumbnail";

import styles from "@/styles/Home.module.scss";

interface Props {
  mainPageNewsList: MainPagePostType[];
  mainPageBandList: MainPagePostType[];
  mainPageAlbumList: MainPagePostType[];
  mainPageJazzbarList: MainPagePostType[];
  mainPageBoardList: MainPagePostType[];
  mainPageJobList: MainPagePostType[];
};

const Home = ({
  mainPageNewsList,
  mainPageBandList,
  mainPageAlbumList,
  mainPageJazzbarList
}: Props) => {
  const viewport = useGetViewport();

  return (
    <div className={styles["container"]}>
      <div className={styles["news-section"]}>
        <Carousel
          thumbnailType={viewport === "mobile" ? "combined" : "detached"}
          mainPagePostList={mainPageNewsList}
          viewport={viewport}
          isElementJazzBar={false}
        />
      </div>
      <div className={styles["band-section"]}>
        <p className={styles["band-section__title"]}>BAND</p>
        <div className={styles["band-section__thumbnail-box"]}>
          {mainPageBandList.map((post: MainPagePostType, index: number) => {
            return index < (viewport === "mobile" ? 4 : 6) && (
              <CombinedThumbnail
                post={post}
                key={post._id}
              />
            );
          })}
        </div>
        <Link
          href="/bbs/promote?subCategory=bandPromotion"
          className={styles["more-button"]}
        >
          더보기
        </Link>
      </div>
      <div className={styles["album-section"]}>
        <p className={styles["album-section__title"]}>ALBUM</p>
        <AlbumCarousel mainPagePostList={mainPageAlbumList} />
        <Link
          href="/bbs/promote?subCategory=albumPromotion"
          className={styles["more-button"]}
        >
          더보기
        </Link>
      </div>
      <div className={styles["jazzbar-section"]}>
        <p className={styles["jazzbar-section__title"]}>JAZZ BAR</p>
          <Carousel
            thumbnailType={viewport === "mobile" ? "combined" : "detached"}
            mainPagePostList={mainPageJazzbarList}
            viewport={viewport}
            isElementJazzBar={true}
          />
        <Link href="/bbs/promote?subCategory=jazzbarPromotion" className={styles["more-button"]}>
          더보기
        </Link>
      </div>
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
    mainPageJazzbarList
  } = response.data;

  return {
    props: {
      mainPageNewsList,
      mainPageBandList,
      mainPageAlbumList,
      mainPageJazzbarList
    },
  };
};
