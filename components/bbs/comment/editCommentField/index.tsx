import { useForm } from "react-hook-form";

import { useEditComment } from "@/hooks/bbs/useEditComment";

import styles from "./index.module.scss";

interface Props {
  isEditing: any;
  setIsEditing:any;
  post: any;
  comment: any;
};

const EditCommentField = ({ isEditing, setIsEditing, post, comment }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const editCommentMutation = useEditComment(post._id, comment._id);

  const handleCancleEdit = (e: any) => {
    e.stopPropagation();
    setIsEditing(false);
    reset();
  };

  const handleEditComment = {
    onSubmit: (watch: any) => {
      const requestBody = {
        content: watch.editFieldContent
      };

      setIsEditing(false);
      editCommentMutation.mutate(requestBody);
    },
    onError: (e: any) => console.log(e),
  };

  if (!isEditing) {
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditComment.onSubmit, handleEditComment.onError)}
      className={styles["edit-comment-field"]}
    >
      <textarea
        {...register("editFieldContent", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        defaultValue={comment.content}
        spellCheck="false"
        className={styles["edit-comment-field__input"]}
      />
      <div className={styles["edit-comment-field__footer"]}>
        <p className={styles["edit-comment-field__error-message"]}>{errors.editFieldContent?.message}</p>
        <div className={styles["edit-comment-field__button-wrapper"]}>
          <button
            type="button"
            onClick={(e: any) => handleCancleEdit(e)}
            className={styles["edit-comment-field__button"]}
          >
            취소
          </button>
          <button className={styles["edit-comment-field__button"]}>수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditCommentField;
