import { useRouter } from "next/router";
import { useContext } from "react";

import { MainCategory } from "@/types/categorys";
import { PostList as PostListType } from "@/types/postList";
import { UserMeContext } from "@/contexts/userMe";
import { Post } from "@/types/post";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface PostListProps {
  mainCategory: MainCategory;
  response: PostListType;
}

const PostList = ({ mainCategory, response }: PostListProps) => {
  const router = useRouter();
  const { userMe } = useContext(UserMeContext);

  const colums = ["ID", "구분", "제목", "작성자", "작성일", "조회수", "추천"]

  return (
    <div className={styles["post-list"]}>
      <div className={styles["post-list__header"]}>
        {colums.map((item: string, index: number) => (
          <p key={index} className={styles["post-list__division"]}>{item}</p>)
        )}
      </div>
      {response.postList.map((post: Post, index: number) => (
        <div
          key={index}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/bbs/${mainCategory}/post/${post._id}`);
          }}
          className={styles["post-list__element"]}
        >
          <p>{index + 1}</p>
          <p>{post.subCategory}</p>
          <p>{post.title}{post.comment.length > 0 && <span>({post.comment.length})</span>}</p>
          <p>{post.writer.nickname}</p>
          <p>{formatYM(post.createdAt)}</p>
          <p>{post.views}</p>
          <p>{post.recommend}</p>
        </div>
      ))}
      { userMe && 
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
