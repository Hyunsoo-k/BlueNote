import { useRouter } from "next/router";

import { MainCategory } from "@/types/categorys";
import { subCategoryListMap, subCategoryUrlMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  subCategory?: string;
  page?: string;
  response?: any;
}

const BbsHeader = ({ mainCategory, subCategory, response }: Props) => {
  const router = useRouter();
  const subCategoryList = subCategoryListMap[mainCategory];

  return (
    <div className={styles["bbs-header"]}>
      <div className={styles["bbs-header__categorys"]}>
        <p className={styles["bbs-header__main-category"]}>{mainCategory}</p>
        <div className={styles["bbs-header__sub-category-list"]}>
          {subCategoryList?.map((value: string, index: number) => (
            <p
              key={index}
              onClick={() => {
                router.push(`/bbs/${mainCategory}?subCategory=${subCategoryUrlMap[value]}&page=1`);
              }}
              className={`${
                value === subCategory || subCategoryUrlMap[value] === subCategory
                  ? styles["bbs-header__sub-category--selected"]
                  : styles["bbs-header__sub-category"]
              }`}
            >
              {value}
            </p>
          ))}
        </div>
      </div>
      {response && (
        <div className={styles["bbs-header__data"]}>
          <p className={styles["bbs-header__count"]}>총 게시물&nbsp;<span>{response.totalPostCount}개</span></p>
          <p className={styles["bbs-header__current-page"]}>
            현재&nbsp;
            <span>
              ({response.page}/{response.totalPageCount})
            </span>
            &nbsp;페이지
          </p>
        </div>
      )}
    </div>
  );
};

export default BbsHeader;
