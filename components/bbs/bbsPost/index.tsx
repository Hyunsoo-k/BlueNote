import React, { useState, useEffect } from "react";

import { Post as PostType } from "@/types/post";
import { formatYMD } from "@/utils/dateFormatter";
import PostActionBtns from "@/components/bbs/PostActionBtns";
import { useGetUser } from "@/hooks/auth/useGetUser";
import Comment from "../comment";

import styles from "./index.module.scss";

interface Props {
  post: PostType;
}

const BbsPost = ({ post }: Props) => {
  const { data: userMe } = useGetUser();
  const [content, setContent] = useState<any>(null);

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
            <li className={styles["bbs-post__writer"]}>작성자<span>{post.writer.nickname}</span></li>
            <li className={styles["bbs-post__created-at"]}>작성일 {formatYMD(post.createdAt)}</li>
            <li className={styles["bbs-post__division"]}>분류<span>{post.subCategory}</span></li>
          </ul>
          <ul className={styles["bbs-post__state-info"]}>
            <li className={styles["bbs-post__views"]}>조회수 <span>{post.views}</span></li>
            <li className={styles["bbs-post__recommend"]}>추천<span>{post.recommend}</span></li>
            {post.mainCategory !== "notice" && (
              <li className={styles["bbs-post__comment"]}>댓글<span>{post.commentList.length}</span></li>
            )}
          </ul>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className={styles["bbs-post__content"]}></div>
      <div className={styles["bbs-post__manage-btn"]}>
        {userMe?._id === post.writer._id && <PostActionBtns post={post} />}
      </div>
      <Comment post={post} />
    </div>
  );
};

export default BbsPost;
