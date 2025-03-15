import { useRouter } from "next/router";

import { MainCategoryType } from "@/types/categorys";
import { subCategoryListMap, subCategoryKoreanToEnglishMap } from "@/variable";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
};

const BbsHeader = ({ initialData }: Props) => {
  const router = useRouter();

  const subCategoryList = subCategoryListMap[initialData.mainCategory as keyof typeof subCategoryListMap];

  const handleClickSubCategory = (value: string) => {
    router.push(`/bbs/${initialData.mainCategory}?subCategory=${subCategoryKoreanToEnglishMap[value]}&page=1`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["category-wrapper"]}>
        <div className={styles["sub-category-wrapper"]}>
          {subCategoryList?.map((value: string, index: number) => (
            <span
              key={index}
              onClick={() => { handleClickSubCategory(value); }}
              className={`${
                value === initialData.subCategory ||
                subCategoryKoreanToEnglishMap[value] === initialData.subCategory
                  ? styles["sub-category--selected"]
                  : styles["sub-category"]
              }`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BbsHeader;
