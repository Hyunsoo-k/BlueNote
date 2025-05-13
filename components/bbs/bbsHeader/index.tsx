import { useRouter } from "next/router";

import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { subCategoryListMap, subCategoryKoreanToEnglishMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategoryType,
  currentSubCategory: SubCategoryKoreanType;
};

const BbsHeader = ({ mainCategory, currentSubCategory }: Props) => {
  const router = useRouter();

  const subCategoryList = subCategoryListMap[mainCategory];

  console.log(currentSubCategory)

  const handleClickSubCategory = (subCategory: SubCategoryKoreanType): void => {
    router.push(`/bbs/${mainCategory}?subCategory=${subCategoryKoreanToEnglishMap[subCategory]}&page=1`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["category-wrapper"]}>
        <div className={styles["sub-category-wrapper"]}>
          {subCategoryList?.map((subCategory: SubCategoryKoreanType, index: number) => (
            <span
              key={index}
              onClick={() => {
                handleClickSubCategory(subCategory);
              }}
              className={`${
                subCategory === currentSubCategory
                  ? styles["sub-category--selected"]
                  : styles["sub-category"]
              }`}
            >
              {subCategory}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BbsHeader;
