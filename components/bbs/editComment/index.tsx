import { useForm } from "react-hook-form";

import { useEditComment } from "@/hooks/bbs/useEditComment";

import styles from "./index.module.scss";

interface Props {
  setIsEditing: any;
  post: any;
  comment: any;
}

const EditComment = ({ setIsEditing, post, comment }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const editCommentMutation = useEditComment(post._id, comment._id, setIsEditing, reset);

  const handleCancleEdit = (e: any) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleEditComment = {
    onSubmit: (watch: any) => {
      const requestBody = { content: watch.content };

      editCommentMutation.mutate(requestBody);
    },
    onError: (e: any) => console.log(e),
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditComment.onSubmit, handleEditComment.onError)}
      className={styles["edit-comment"]}
    >
      <textarea
        {...register("content", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        defaultValue={comment.content}
        spellCheck="false"
        className={styles["edit-comment__input"]}
      />
      <div className={styles["edit-comment__footer"]}>
      <p className={styles["edit-comment__error-message"]}>
        {typeof errors.content?.message === "string" ? errors.content?.message : ""}
      </p>
        <div className={styles["edit-comment__button-wrapper"]}>
          <button
            type="button"
            onClick={(e: any) => handleCancleEdit(e)}
            className={styles["edit-comment__button"]}
          >
            취소
          </button>
          <button className={styles["edit-comment__button"]}>수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditComment;
