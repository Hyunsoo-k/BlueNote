import { useRouter } from "next/router";

import { PostType } from "@/types/post";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  postList: PostType[];
};

const TabletPostList = ({ postList }: Props) => {
  const router = useRouter();

  const isMyPage = router.pathname === "/myPage/myPost";

  const colums = isMyPage
    ? ["No", "구분", "제목", "작성일", "조회수", "추천"]
    : ["No", "구분", "제목", "작성자", "작성일", "조회수", "추천"];

  const handleClickItem = (e: any, mainCategory: string, _id: string) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/${_id}`);
  };

  return (
    <table className={styles["container"]}>
      <thead className={styles["header"]}>
        <tr className={styles["header__row"]}>
          {colums.map((item: string, index: number) => (
            <td key={index} className={styles["header__division"]}>
              {item}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {postList.map((post: PostType, index: number) => (
          <tr
            key={index}
            onClick={(e: any) => { handleClickItem(e, post.mainCategory, post._id); }}
            className={styles["element"]}
          >
            <td className={styles["element__no"]}>{post.number}</td>
            <td className={styles["element__sub-category"]}>{post.subCategory}</td>
            <td className={styles["element__title"]}>
              {post.title}
              {post.commentCount && <span>({post.commentCount})</span>}
            </td>
            {!isMyPage && <td className={styles["element__writer"]}>{post.writer.nickname}</td>}
            <td className={styles["element__created-at"]}>{formatYM(post.createdAt)}</td>
            <td className={styles["element__views"]}>{post.views}</td>
            <td className={styles["element__recommend"]}>{post.recommend.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabletPostList;