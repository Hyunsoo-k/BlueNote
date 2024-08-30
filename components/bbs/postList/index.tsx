import { useRouter } from "next/router";
import { useContext } from "react";

import { PostList as PostListType } from "@/types/postList";
import { UserMeContext } from "@/contexts/userMe";
import { Post } from "@/types/post";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  postList: Post[];
}

const PostList = ({ postList }: Props) => {
  const router = useRouter();
  const { userMe } = useContext(UserMeContext);

  const isMyPage = router.pathname === "/myPage/myPost" ? true : false;
  const mainCategory = !isMyPage ? router.pathname.split("/").pop() : null;
  const colums = isMyPage ?
    ["ID", "구분", "제목", "작성일", "조회수", "추천"] :
    ["ID", "구분", "제목", "작성자", "작성일", "조회수", "추천"]

  return (
    <div className={styles["post-list"]}>
      <div className={styles["post-list__header"]}>
        {colums.map((item: string, index: number) => (
          <p key={index} className={styles["post-list__division"]}>{item}</p>)
        )}
      </div>
      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
          }}
          className={styles["post-list__element"]}
        >
          <p className={styles["post-list__id"]}>{index + 1}</p>
          <p className={styles["post-list__sub-category"]}>{post.subCategory}</p>
          <p className={styles["post-list__title"]}>{post.title}{post.comment.length > 0 && <span>({post.comment.length})</span>}</p>
          {!isMyPage && <p className={styles["post-list__writer"]}>{post.writer.nickname}</p>}
          <p className={styles["post-list__created-at"]}>{formatYM(post.createdAt)}</p>
          <p className={styles["post-list__views"]}>{post.views}</p>
          <p className={styles["post-list__recommend"]}>{post.recommend}</p>
        </div>
      ))}
      { userMe && !isMyPage &&
        <button
          onClick={() => {
            router.push(`/bbs/${mainCategory}/post/createPost`);
          }}
        >
          글쓰기
        </button>
      }
    </div>
  );
};

export default PostList;
