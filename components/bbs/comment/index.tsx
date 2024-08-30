import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { MainCategory } from "@/types/categorys";
import { UserMeContext } from "@/contexts/userMe";
import { useCreateComment } from "@/hooks/bbs/useCreateComment";
import { formatYMD } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  post_id: string;
  post: any;
}

const Comment = ({ mainCategory, post_id, post }: Props) => {
  const { userMe } = useContext(UserMeContext);
  
  const mutationHandler = useCreateComment(mainCategory, post_id);
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const createdAt = post ? formatYMD(post.createdAt) : "";

  const submitHandler = {
    onSubmit: (e: any) => {
      const req = {
        wirter: "운영자",
        content: e.content,
      };
      mutationHandler.mutate(req);
    },
    onError: (e: any) => {
      console.log(e);
    },
  };

  return (
    <div className={styles["comment"]}>
      <p className={styles["comment__count"]}>
        댓글 <span>{post.comment.length}</span>
      </p>
      <div className={styles["comment__list"]}>
        {post.comment.map((item: any, index: number) => (
          <div key={index} className={styles["comment__element"]}>
            <div className={styles["comment__header"]}>
              <p className={styles["comment__writer"]}>{item.writer.nickname}</p>
              <p className={styles["comment__created-at"]}>{createdAt}</p>
            </div>
            <p className={styles["comment__content"]}>{item.content}</p>
          </div>
        ))}
      </div>
      {userMe && (
        <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)} className={styles["comment__writing-field"]}>
          <p className={styles["comment__user"]}>{userMe.nickname}</p>
          <textarea spellCheck="false" {...register("content", { required: "필수 값 입니다" })} className={styles["comment__input"]}/>
          <button className={styles["comment__btn"]}>등록</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
