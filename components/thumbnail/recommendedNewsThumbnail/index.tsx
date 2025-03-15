import { useRouter } from "next/router";

import styles from "./index.module.scss";

interface Props {
  news: any;
};

const RecommendedNewsThumbnail = ({ news }: Props) => {
  const router = useRouter();

  const handleClickThumbnail = (): void => {
    router.push(news.postUrl);
  };

  return (
    <div 
      onClick={handleClickThumbnail}
      className={styles["component"]}
    >
      <div className={styles["title-wrapper"]}>
        <p className={styles["title"]}>
          {news?.title}
        </p>
      </div>
      <div
        className={styles["thumbnail"]}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.0)), url(${news?.thumbnailSrc || "/images/no-image.png"})`,
        }}
      >
      </div>
    </div>
  );
};

export default RecommendedNewsThumbnail;