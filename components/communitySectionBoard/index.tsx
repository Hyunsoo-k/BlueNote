import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { useGetPostList } from "@/hooks/bbs/useGetPostList";
import { subCategoryListMap, subCategoryUrlMap } from "@/variable";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
}

const CommunitySectionBoard = ({ initialData }: Props) => {
  const [crruentSubCategory, setCruuentSubCategory] = useState<string>("All");

  const { data } = useGetPostList(initialData);

  const subCategoryList = subCategoryListMap[data.mainCategory]

  const switchSubCategory = (e: any) => {
    const requestBody = {
      ...initialData,
      subCategory: e.target.innerHTML
    };

    setCruuentSubCategory(e.target.innerHTML);
  }

  return (
    <div className={styles["community-section-board"]}>
      <p className={styles["community-section-board__title"]}>
        <span>{data.mainCategory === "board" ? "Board" : "Job"}</span>
        <IoIosArrowForward size={25} style={{ position: "relative", top: "1px" }} />
      </p>
        <table className={styles["community-section-board__content"]}>
          <thead>
            <tr className={styles["community-section-board__sub-category"]}>
              {subCategoryList.map((value: string, index: number) =>
                <td
                  onClick={switchSubCategory}
                  key={index}
                  style={crruentSubCategory === value ? { color: "rgb(48, 140, 204)" } : {}}
                >
                  {value}
                </td>
              )}
            </tr>
          </thead>
          <tbody className={styles["community-section-board__post-list"]}>
            {data.postList.map((post: any, index: number) => {
              return (
                index < 8 && (
                  <tr key={index} className={styles["community-section-board__element"]}>
                    <td>{post.subCategory}</td>
                    <td>
                      {post.title}
                      {post.commentList.length > 0 && <span>({post.commentList.length})</span>}
                    </td>
                    <td>{formatYM(post.createdAt)}</td>
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
