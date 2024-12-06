import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { ViewportContext } from "@/contexts/viewport";
import { subCategoryListMap } from "@/variable";
import { useGetCommunitySectionBoard } from "@/hooks/bbs/useGetCommunitySectionBoard";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
}

const CommunitySectionBoard = ({ initialData }: Props) => {
  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

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
    <div className={styles["community-section"]}>
      <p onClick={handleClickHeader} className={styles["community-section__title"]}>
        <span>{initialData.mainCategory === "board" ? "Board" : "Job"}</span>
        <IoIosArrowForward size={viewport === "mobile" ? 20 : 25} style={{ position: "relative", top: "1px" }} />
      </p>
      <table className={styles["community-section__content"]}>
        <thead>
          <tr className={styles["community-section__header"]}>
            {subCategoryList?.map((value: string, index: number) => (
              <td
                onClick={(e: any) => {
                  handleClickSubCategory(e);
                }}
                key={index}
                style={subCategory === value ? { color: "rgb(48, 140, 204)" } : {}}
              >
                {value}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className={styles["community-section__post-list"]}>
          {data?.postList.map((post: any, index: number) => {
            return (
              index < 8 && (
                <tr key={index} className={styles["community-section__post"]}>
                  <td className={styles["community-section__sub-category"]}>{post.subCategory}</td>
                  <td className={styles["community-section__post-title"]}>{post.title}</td>
                  {post.commentList.length > 0 && (
                    <td className={styles["community-section__comment-count"]}>({post.commentList.length})</td>
                  )}
                  <td className={styles["community-section__created-at"]}>{formatYM(post.createdAt)}</td>
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
