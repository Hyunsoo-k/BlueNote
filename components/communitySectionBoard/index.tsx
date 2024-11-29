import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { subCategoryListMap } from "@/variable";
import { useGetCommunitySectionBoard } from "@/hooks/bbs/useGetCommunitySectionBoard";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
};

const CommunitySectionBoard = ({ initialData }: Props) => {
  const router = useRouter();

  const [subCategory, setSubCategory] = useState<string>("All");
  const [conveyInitialData, setConveyInitialData] = useState<boolean>(true);

  const { data } = useGetCommunitySectionBoard(
    initialData.mainCategory,
    subCategory,
    initialData,
    conveyInitialData
  );

  console.log(data);

  const subCategoryList = subCategoryListMap[initialData.mainCategory as keyof typeof subCategoryListMap];

  const handleClickHeader = () => {
    router.push(`/bbs/${initialData.mainCategory}`);
  };

  const handleClickSubCategory = (e: any) => {
    setSubCategory(e.target.innerHTML);
    setConveyInitialData(false);
  };

  return (
    <div className={styles["community-section-board"]}>
      <p
        onClick={handleClickHeader}
        className={styles["community-section-board__title"]}
      >
        <span>{initialData.mainCategory === "board" ? "Board" : "Job"}</span>
        <IoIosArrowForward
          size={25}
          style={{ position: "relative", top: "1px" }}
        />
      </p>
      <table className={styles["community-section-board__content"]}>
        <thead>
          <tr className={styles["community-section-board__sub-category"]}>
            {subCategoryList?.map((value: string, index: number) => (
              <td
                onClick={(e: any) => { handleClickSubCategory(e); }}
                key={index}
                style={subCategory === value ? { color: "rgb(48, 140, 204)" } : {}}
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
