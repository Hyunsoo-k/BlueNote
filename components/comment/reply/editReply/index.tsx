import { Dispatch, MouseEvent, SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { ReplyType } from "@/types/comment/reply";
import { useEditReply } from "@/hooks/bbs/useEditReply";

import styles from "./index.module.scss";

interface Props {
  isEditingReply: Dispatch<SetStateAction<boolean>>;
  post_id: string;
  comment_id: string;
  reply: ReplyType;
};

const EditReply = ({ isEditingReply, post_id, comment_id, reply }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const useEditReplyMutation = useEditReply(
    post_id,
    comment_id,
    reply._id,
    isEditingReply,
    reset
  );

  const handleClickCancel = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    isEditingReply(false);
  };

  const handleEditComment = {
    onSubmit: (watch: Record<string, string>): void => {
      const requestBody = { content: watch.content };

      useEditReplyMutation.mutate(requestBody);
    },
    onError: (error: FieldErrors): void => {
      console.log(error);
    }
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
        defaultValue={reply.content}
        spellCheck="false"
        className={styles["input"]}
      />
      <div className={styles["bottom"]}>
        <p className={styles["error-message"]}>
          {typeof errors.editFieldContent?.message === "string" ? errors.editFieldContent?.message : ""}
        </p>
        <div className={styles["button-wrapper"]}>
          <button
            type="button"
            onClick={handleClickCancel}
          >
            취소
          </button>
          <button className={styles["submit-button"]}>수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditReply;
