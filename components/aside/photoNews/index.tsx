import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import useGetPhotoNewsQuery from "@/hooks/photoNews/useGetPhotoNewsQuery";

import styles from "./index.module.scss";

const PhotoNews = () => {
  const router = useRouter();

  const { data: queryData } = useGetPhotoNewsQuery();

  const [currentNews, setCurrentNews] = useState(queryData ? queryData[0] : null);

  useEffect(() => {
    if (queryData && queryData.length > 0) {
      setCurrentNews(queryData[0]);
    }
  }, [queryData]);

  const handleClickMainThumbnail = () => {
    router.push(currentNews.postUrl);
  };

  const handleClickbottomThumbnail = (e:any, index: number): void => {
    e.stopPropagation();
    setCurrentNews(queryData[index]);
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <span className={styles["header__title"]}>
          최신 뉴스
        </span>
      </div>
      <div
        onClick={handleClickMainThumbnail}
        className={styles["main"]}
        style={{
          backgroundImage: `url(${currentNews?.thumbnailSrc || "/images/no-image.png"})`,
        }}
      >
        <div className={styles["main__title-wrapper"]}>
          <p className={styles["main__title"]}>
            {currentNews?.title}
          </p>
        </div>
      </div>
      <ul className={styles["news-list"]}>
        {queryData?.map((news: any, index: number) => (
          <li
            key={index}
            onClick={(e) => {
              handleClickbottomThumbnail(e, index);
            }}
            className={styles["news"]}
            style={{
              backgroundImage: `${
                currentNews === news
                  ? "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0))"
                  : "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"
              }, url(${news.thumbnailSrc || "/images/no-image.png"})`
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoNews;
