import React, { useState, useEffect } from "react";

import { PostType } from "@/types/post";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { formatYMD } from "@/utils/dateFormatter";
import PostActionButton from "@/components/bbs/postActionButton";
import CommentSection from "../commentSection";

import styles from "./index.module.scss";

interface Props {
  post: PostType;
}

const BbsPost = ({ post }: Props) => {
  const [content, setContent] = useState<any>(null);

  const { data: userMe } = useGetUser();

  useEffect(() => {
    const parser = new DOMParser();
    const contentHTML = parser.parseFromString(post.content, "text/html").body.innerHTML;
    setContent(contentHTML);
  }, []);

  return (
    <div className={styles["bbs-post"]}>
      <div className={styles["bbs-post__header"]}>
        <p className={styles["bbs-post__title"]}>{post.title}</p>
        <div className={styles["bbs-post__details"]}>
          <ul className={styles["bbs-post__writing-info"]}>
            <li className={styles["bbs-post__writer"]}>
              작성자<span>{post.writer.nickname}</span>
            </li>
            <li className={styles["bbs-post__created-at"]}>작성일 {formatYMD(post.createdAt)}</li>
            <li className={styles["bbs-post__division"]}>
              분류<span>{post.subCategory}</span>
            </li>
          </ul>
          <ul className={styles["bbs-post__state-info"]}>
            <li className={styles["bbs-post__views"]}>
              조회수 <span>{post.views}</span>
            </li>
            <li className={styles["bbs-post__recommend"]}>
              추천<span>{post.recommend.length}</span>
            </li>
            {post.mainCategory !== "notice" && (
              <li className={styles["bbs-post__comment"]}>
                댓글<span>{post.commentList.length}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className={styles["bbs-post__content"]}></div>
      <PostActionButton post={post} />
      <CommentSection post={post} />
    </div>
  );
};

export default BbsPost;
