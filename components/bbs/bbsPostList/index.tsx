import { useRouter } from "next/router";

import { Post } from "@/types/post";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  postList: Post[];
}

const BbsPostList = ({ postList }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();

  const isNoticeOrNewsPage = router.pathname.split("/")[2] === "notice" || router.pathname.split("/")[2] === "news";
  const isMyPage = router.pathname === "/myPage/myPost" ? true : false;
  const mainCategory = !isMyPage ? router.pathname.split("/").pop() : null;
  const colums = isMyPage
    ? ["ID", "구분", "제목", "작성일", "조회수", "추천"]
    : ["ID", "구분", "제목", "작성자", "작성일", "조회수", "추천"];

  return (
    <div className={styles["bbs-post-list"]}>
      <ul className={styles["bbs-post-list__header"]}>
        {colums.map((value: string, index: number) => (
          <li key={index} className={styles["bbs-post-list__division"]}>
            {value}
          </li>
        ))}
      </ul>
      {postList.map((post: Post, index: number) => (
        <ul
          key={index}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
          }}
          className={styles["bbs-post-list__element"]}
        >
          <li className={styles["bbs-post-list__id"]}>{index + 1}</li>
          <li className={styles["bbs-post-list__sub-category"]}>{post.subCategory}</li>
          <li className={styles["bbs-post-list__title"]}>
            {post.title}
            {post.commentList.length > 0 && <span>({post.commentList.length})</span>}
          </li>
          {!isMyPage && <li className={styles["bbs-post-list__writer"]}>{post.writer.nickname}</li>}
          <li className={styles["bbs-post-list__created-at"]}>{formatYM(post.createdAt)}</li>
          <li className={styles["bbs-post-list__views"]}>{post.views}</li>
          <li className={styles["bbs-post-list__recommend"]}>{post.recommend}</li>
        </ul>
      ))}
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
    </div>
  );
};

export default BbsPostList;
