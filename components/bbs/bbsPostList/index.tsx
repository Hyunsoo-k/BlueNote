import { useRouter } from "next/router";

import { PostType } from "@/types/post";
import { useGetUser } from "@/hooks/user/useGetUser";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  postList: PostType[];
}

const BbsPostList = ({ postList }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();

  const isNoticeOrNewsPage = router.pathname.split("/")[2] === "notice" || router.pathname.split("/")[2] === "news";
  const isMyPage = router.pathname === "/myPage/myPost";
  const mainCategory = !isMyPage ? router.pathname.split("/").pop() : null;
  const colums = isMyPage
    ? ["No", "구분", "제목", "작성일", "조회수", "추천"]
    : ["No", "구분", "제목", "작성자", "작성일", "조회수", "추천"];

  const handleClickItem = (e: any, mainCategory: string, _id: string) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/${_id}`);
  };

  return (
    <table className={styles["bbs-post-list"]}>
      <thead className={styles["bbs-post-list__header"]}>
        <tr className={styles["bbs-post-list__header-row"]}>
          {colums.map((item: string, index: number) => (
            <td key={index} className={styles["bbs-post-list__division"]}>
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
            className={styles["bbs-post-list__element"]}
          >
            <td className={styles["bbs-post-list__no"]}>{post.number}</td>
            <td className={styles["bbs-post-list__sub-category"]}>{post.subCategory}</td>
            <td className={styles["bbs-post-list__title"]}>
              {post.title}
              {post.commentList.length > 0 && <span>({post.commentList.length})</span>}
            </td>
            {!isMyPage && <td className={styles["bbs-post-list__writer"]}>{post.writer.nickname}</td>}
            <td className={styles["bbs-post-list__created-at"]}>{formatYM(post.createdAt)}</td>
            <td className={styles["bbs-post-list__views"]}>{post.views}</td>
            <td className={styles["bbs-post-list__recommend"]}>{post.recommend.length}</td>
          </tr>
        ))}
      </tbody>
      {userMe &&
        !isMyPage &&
        (isNoticeOrNewsPage ? (
          userMe.role === 1 && (
            <button
              onClick={() => {
                router.push(`/bbs/${mainCategory}/post/createPost`);
              }}
            >
              글쓰기
            </button>
          )
        ) : (
          <button
            onClick={() => {
              router.push(`/bbs/${mainCategory}/post/createPost`);
            }}
          >
            글쓰기
          </button>
        ))}
    </table>
  );
};

export default BbsPostList;
