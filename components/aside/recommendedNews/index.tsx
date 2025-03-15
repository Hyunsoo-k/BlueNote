import { useGetRecommendedNewsQuery } from "@/hooks/recommendedNews/useGetRecommendedNewsQuery";

import styles from "./index.module.scss";
import RecommendedNewsThumbnail from "@/components/thumbnail/recommendedNewsThumbnail";

const RecommendedNews = () => {
  const { data: queryData } = useGetRecommendedNewsQuery();

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <span className={styles["header__title"]}>
          추천 뉴스
        </span>
      </div>
      <div className={styles["news-list"]}>
        {queryData?.map((news: any, index: number)=> (
          <RecommendedNewsThumbnail
            key={index}
            news={news}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedNews;