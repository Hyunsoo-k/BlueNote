import { Dispatch, MouseEvent, SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { PostType } from "@/types/post/post";
import { CommentType } from "@/types/comment/comment";
import { useEditComment } from "@/hooks/bbs/useEditComment";

import styles from "./index.module.scss";


interface Props {
  setIsEditCommentOpen: Dispatch<SetStateAction<boolean>>;
  post: PostType;
  comment: CommentType;
};

const EditComment = ({ setIsEditCommentOpen, post, comment }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const useEditCommentMutation = useEditComment(
    post._id,
    comment._id,
    setIsEditCommentOpen,
    reset
  );

  const handleCancleEdit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    setIsEditCommentOpen(false);
  };

  const handleEditComment = {
    onSubmit: (watch: Record<string, string>): void => {
      const requestBody = { content: watch.content };

      useEditCommentMutation.mutate(requestBody);
    },
    onError: (e: FieldErrors): void => {
      console.log(e);
    },
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditComment.onSubmit, handleEditComment.onError)}
      className={styles["component"]}
    >
      <textarea
        {...register("content", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        defaultValue={comment.content}
        spellCheck="false"
        className={styles["input"]}
      />
      <div className={styles["bottom"]}>
      <p className={styles["error-message"]}>
        {typeof errors.content?.message === "string" ? errors.content?.message : ""}
      </p>
        <div className={styles["button-wrapper"]}>
          <button
            type="button"
            onClick={(e: any) => handleCancleEdit(e)}
          >
            취소
          </button>
          <button className={styles["submit-button"]}>수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditComment;
