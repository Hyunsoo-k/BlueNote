import { useRouter } from "next/router";

import { MyPageCategoryKoreanType } from "@/types/myPage/category";
import { myPageCategoryKoreanToEnglishMap, myPageCategoryEnglishToKoreanhMap } from "@/variable";

import styles from "./index.module.scss";

const MyPageHeader = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter(Boolean); // ["user", myPost]
  const secondSegment = pathSegments[1];

  const categorys: ["내 정보", "내가 쓴 글"] = ["내 정보", "내가 쓴 글"];

  const handleClickSubCategory = (subCategory: MyPageCategoryKoreanType): void => {
    router.push(`/myPage/${myPageCategoryKoreanToEnglishMap[subCategory]}`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["category-wrapper"]}>
        <div className={styles["category-box"]}>
          {categorys.map((category: MyPageCategoryKoreanType, index: number) => (
            <span
              key={index}
              onClick={() => {
                handleClickSubCategory(category);
              }}
              className={`${
                category === myPageCategoryEnglishToKoreanhMap[secondSegment]
                  ? styles["category--selected"]
                  : styles["category"]
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;