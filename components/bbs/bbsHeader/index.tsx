import { useRouter } from "next/router";

import { MainCategory } from "@/types/categorys";
import { subCategoryListMap, subCategoryUrlMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  subCategory?: string;
  totalPostCount?: any;
  page?: any;
  totalPageCount?: any;
}

const BbsHeader = ({ mainCategory, subCategory, totalPostCount, page, totalPageCount }: Props) => {
  const router = useRouter();
  const subCategoryList = subCategoryListMap[mainCategory as keyof typeof subCategoryListMap];

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
      {totalPostCount && (
        <ul className={styles["bbs-header__data"]}>
          <li className={styles["bbs-header__count"]}>
            총 게시물&nbsp;<span>{totalPostCount}개</span>
          </li>
          <li className={styles["bbs-header__current-page"]}>
            현재&nbsp;
            <span>
              ({page}/{totalPageCount})
            </span>
            &nbsp;페이지
          </li>
        </ul>
      )}
    </div>
  );
};

export default BbsHeader;
