import { useRouter } from "next/router";

import { MainCategory } from "@/types/categorys";
import { subCategoryListMap, subCategoryUrlMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  subCategory?: string;
  totalPostCount?: any;
  page?: any;
  totalPage?: number;
  viewport?: string;
}

const BbsHeader = ({
  mainCategory,
  subCategory,
  totalPostCount,
  page,
  totalPage,
  viewport
}: Props) => {
  const router = useRouter();
  
  const subCategoryList = subCategoryListMap[mainCategory as keyof typeof subCategoryListMap];

  const handleClickSubCategory = (value: string) => {
    router.push(`/bbs/${mainCategory}?subCategory=${subCategoryUrlMap[value]}&page=1`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["category-wrapper"]}>
        <span className={styles["main-category"]}>
          {mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)}
        </span>
        <div className={styles["sub-category-wrapper"]}>
          {subCategoryList?.map((value: string, index: number) => (
            <span
              key={index}
              onClick={() => { handleClickSubCategory(value); }}
              className={`${
                value === subCategory || subCategoryUrlMap[value] === subCategory
                  ? styles["sub-category--selected"]
                  : styles["sub-category"]
              }`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      {totalPostCount && viewport !== "mobile" && (
        <div className={styles["post-information"]}>
          <span className={styles["post-information__count"]}>총 게시물</span>
          <span className={styles["post-information__count-value"]}>
            {totalPostCount}개
          </span>
          <span className={styles["post-information__current-page"]}>현재</span>
          <span className={styles["post-information__current-page-value"]}>
              ({page}/{totalPage}) 
          </span>
          <span className={styles["post-information__current-page"]}>페이지</span>
        </div>
      )}
    </div>
  );
};

export default BbsHeader;
