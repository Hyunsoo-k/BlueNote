import Reaect, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface BbsHeaderProps {
  main: "Notice" | "News" | "Board" | "Promote" | "Job";
  sub: string[];
  postCount?: number;
  currentPage?: any;
}

const BbsHeader = ({ main, sub, postCount, currentPage }: BbsHeaderProps) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    sub && setCurrentCategory(sub[sub.length - 1]);
  }, []);

  const handleCurrentCategory = (e: any) => {
    switch (e.target.innerHTML) {
      case main:
        setCurrentCategory("All");
        break;
      case sub[0]:
        setCurrentCategory(sub[0]);
        break;
      case sub[1]:
        setCurrentCategory(sub[1]);
        break;
      case sub[2]:
        setCurrentCategory(sub[2]);
        break;
      case sub[3]:
        setCurrentCategory(sub[3]);
        break;
    }
  };
  return (
    <div className={styles["bbs-header"]}>
      <div className={styles["bbs-header__category"]}>
        <p onClick={handleCurrentCategory} className={styles["bbs-header__category__main"]}>
          {main}
        </p>
        {sub && (
          <div className={styles["bbs-header__category__sub-list"]}>
            {sub.map((item: string, index: number) => (
              <p
                key={index}
                onClick={handleCurrentCategory}
                className={styles["bbs-header__category__sub-list__element"]}
                style={
                  currentCategory === sub[index]
                    ? { color: "#308ccc", fontWeight: "600" }
                    : { color: "rgb(138, 131, 131)", fontWeight: "500" }
                }
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      {postCount && (
        <div className={styles["bbs-header__category__current-data"]}>
          <p>
            총 게시물&nbsp;<span className={styles["bbs-header__category__current-data__detail"]}>{postCount}개</span>
          </p>
          <p>
            현재&nbsp;<span className={styles["bbs-header__category__current-data__detail"]}>(1/2)</span>&nbsp;페이지
          </p>
        </div>
      )}
    </div>
  );
};

export default BbsHeader;
