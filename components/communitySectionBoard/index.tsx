import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowForward } from "react-icons/io";

import { instance } from "@/axios";
import { subCategoryListMap, subCategoryUrlMap } from "@/variable";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
}

const CommunitySectionBoard = ({ initialData }: Props) => {
  const [currentSubCategory, setCurrentSubCategory] = useState<string>("All");
  const [conveyInitialData, setConveyInitialData] = useState<boolean>(true);

  const { data } = useQuery({
    queryKey: ["communitySectionBoard", initialData.mainCategory, currentSubCategory],
    queryFn: async () => {
      const response = await instance.get(`/bbs/${initialData.mainCategory}?subCategory=${subCategoryUrlMap[currentSubCategory]}`);

      return response.data;
    },
    initialData: conveyInitialData ? initialData : undefined
  });

  const subCategoryList = subCategoryListMap[initialData.mainCategory];

  return (
    <div className={styles["community-section-board"]}>
      <p className={styles["community-section-board__title"]}>
        <span>{initialData.mainCategory === "board" ? "Board" : "Job"}</span>
        <IoIosArrowForward size={25} style={{ position: "relative", top: "1px" }} />
      </p>
      <table className={styles["community-section-board__content"]}>
        <thead>
          <tr className={styles["community-section-board__sub-category"]}>
            {subCategoryList?.map((value: string, index: number) => (
              <td
                onClick={(e: any) => { setCurrentSubCategory(e.target.innerHTML); setConveyInitialData(false); }}
                key={index}
                style={currentSubCategory === value ? { color: "rgb(48, 140, 204)" } : {}}
              >
                {value}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className={styles["community-section-board__post-list"]}>
          {data?.postList.map((post: any, index: number) => {
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
