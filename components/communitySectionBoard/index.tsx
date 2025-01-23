import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { subCategoryListMap } from "@/variable";
import { useGetCommunitySectionBoard } from "@/hooks/bbs/useGetCommunitySectionBoard";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";
import { useGetViewport } from "@/hooks/viewport";

interface Props {
  initialData: any;
};

const CommunitySectionBoard = ({ initialData }: Props) => {
  const viewport = useGetViewport();

  const router = useRouter();

  const [subCategory, setSubCategory] = useState<string>("All");
  const [conveyInitialData, setConveyInitialData] = useState<boolean>(true);

  const { data } = useGetCommunitySectionBoard(initialData.mainCategory, subCategory, initialData, conveyInitialData);

  const subCategoryList = subCategoryListMap[initialData.mainCategory as keyof typeof subCategoryListMap];

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
        <span className={styles["title"]}>{initialData.mainCategory === "board" ? "Board" : "Job"}</span>
        <IoIosArrowForward
          size={viewport === "mobile" ? 20 : 25}
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
          {data?.postList.map((post: any, index: number) => {
            return (
              index < 8 && (
                <tr key={index} className={styles["element"]}>
                  <td className={styles["element__sub-category"]}>{post.subCategory}</td>
                  <td className={styles["element__title"]}>{post.title}</td>
                  {post.commentList.length > 0 && (
                    <td className={styles["element__comment-count"]}>({post.commentList.length})</td>
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
