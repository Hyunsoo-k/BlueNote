import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { subCategoryListMap } from "@/variable";
import { useGetCommunitySectionBoard } from "@/hooks/bbs/useGetCommunitySectionBoard";
import { formatYM } from "@/utils/dateFormatter";
import RowThumbnail from "@/components/thumbnail/rowThumbnail";

import styles from "./index.module.scss";

interface Props {
  viewport: string;
  mainCategory: "board" | "job";
  initialData: any;
};

const CommunitySectionBoard = ({ viewport, mainCategory, initialData }: Props) => {
  const router = useRouter();

  const [subCategory, setSubCategory] = useState<string>("All");
  const [conveyInitialData, setConveyInitialData] = useState<boolean>(true);

  const { data }
    = useGetCommunitySectionBoard(
      mainCategory,
      subCategory,
      initialData,
      conveyInitialData
    );

  const subCategoryList = subCategoryListMap[mainCategory as keyof typeof subCategoryListMap];

  const handleClickHeader = () => {
    router.push(`/bbs/${initialData.mainCategory}`);
  };

  const handleClickSubCategory = (e: any) => {
    setSubCategory(e.target.innerHTML);
    setConveyInitialData(false);
  };

  return (
    <div className={styles["container"]}>
      <div onClick={handleClickHeader} className={styles["header"]}>
        <span className={styles["title"]}>{mainCategory === "board" ? "BOARD" : "JOB"}</span>
        <IoIosArrowForward
          size={viewport === "mobile" ? 20 : 25}
          color="#2C2C2C"
          style={{ position: "relative", top: "1px" }}
        />
      </div>
      <table className={styles["content"]}>
        <thead>
          <tr className={styles["content__header"]}>
            {subCategoryList?.map((value: string, index: number) => (
              <td
                onClick={(e: any) => {
                  handleClickSubCategory(e);
                }}
                key={index}
                className={`${
                  value === subCategory
                    ? styles["content__division--selected"]
                    : styles["content__division"]
                }`}
              >
                {value}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className={styles["element-wrapper"]}>
          {data.postList?.map((post: any, index: number) => {
            return (
              index < 8 && (
                <tr key={index} className={styles["element"]}>
                  <td className={styles["element__sub-category"]}>{post.subCategory}</td>
                  <td className={styles["element__title"]}>{post.title}</td>
                  {!!post.commentCount&& (
                    <td className={styles["element__comment-count"]}>({post.commentCount})</td>
                  )}
                  <td className={styles["element__created-at"]}>{formatYM(post.createdAt)}</td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommunitySectionBoard;
