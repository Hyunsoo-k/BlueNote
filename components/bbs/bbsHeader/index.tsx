import { useRouter } from "next/router";

import { BbsType } from "@/types/bbs/bbs";
import { SubCategoryKoreanType } from "@/types/categorys";
import { subCategoryListMap, subCategoryKoreanToEnglishMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  initialData: BbsType;
};

const BbsHeader = ({ initialData }: Props) => {
  const router = useRouter();

  const subCategoryList = subCategoryListMap[initialData.mainCategory];

  const handleClickSubCategory = (subCategory: SubCategoryKoreanType): void => {
    router.push(`/bbs/${initialData.mainCategory}?subCategory=${subCategoryKoreanToEnglishMap[subCategory]}&page=1`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["category-wrapper"]}>
        <div className={styles["sub-category-wrapper"]}>
          {subCategoryList?.map((subCategory: SubCategoryKoreanType, index: number) => (
            <span
              key={index}
              onClick={() => { handleClickSubCategory(subCategory); }}
              className={`${
                subCategory === initialData.subCategory ||
                subCategoryKoreanToEnglishMap[subCategory] === initialData.subCategory
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
