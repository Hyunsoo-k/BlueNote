import { useForm } from "react-hook-form";

import { useEditReply } from "@/hooks/bbs/useEditReply";

import styles from "./index.module.scss";

interface Props {
  setIsEditing: any;
  post_id: string;
  comment_id: string;
  reply: any;
}

const EditReply = ({ setIsEditing, post_id, comment_id, reply }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const editReplyMutation = useEditReply(post_id, comment_id, reply._id, setIsEditing, reset);

  const handleCancleEdit = (e: any) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleEditComment = {
    onSubmit: (watch: any) => {
      const requestBody = { content: watch.content };

      editReplyMutation.mutate(requestBody);
    },
    onError: (e: any) => console.log(e),
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditComment.onSubmit, handleEditComment.onError)}
      className={styles["edit-reply"]}
    >
      <textarea
        {...register("content", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        defaultValue={reply.content}
        spellCheck="false"
        className={styles["edit-reply__input"]}
      />
      <div className={styles["edit-reply__footer"]}>
        <p className={styles["edit-reply__error-message"]}>
          {typeof errors.editFieldContent?.message === "string" ? errors.editFieldContent?.message : ""}
        </p>
        <div className={styles["edit-reply__button-wrapper"]}>
          <button
            type="button"
            onClick={(e: any) => handleCancleEdit(e)}
            className={styles["edit-reply__button"]}
          >
            취소
          </button>
          <button className={styles["edit-reply__button"]}>수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditReply;
