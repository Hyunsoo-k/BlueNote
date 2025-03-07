import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateComment } from "@/hooks/bbs/useCreateComment";

import styles from "./index.module.scss";

interface Props {
  post_id: any;
  userMe: any;
  viewport: string;
};

const CreateComment = ({ post_id, userMe, viewport }: Props) => {
  const router = useRouter();

  const [inputActive, setInputActive] = useState<boolean>(false);

  const handleClickInput = () => {
    setInputActive(true);
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setInputActive(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const createCommentMutation = useCreateComment(router.asPath, post_id, reset);

  const handleCreateComment = {
    onSubmit: (watch: any) => {
      const requestbody = {
        content: watch.createFieldContent,
        postUrl: router.asPath,
      };

      createCommentMutation.mutate(requestbody);
    },
    onError: (e: any) => console.log(e),
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment.onSubmit, handleCreateComment.onError)}
      onClick={handleClickInput}
      className={`${styles["container"]} ${inputActive ? styles.active : ""}`}
    >
      {inputActive && viewport !== "mobile" && (
        <span className={styles["writer"]}>{userMe?.nickname}</span>
      )}
      <textarea
        spellCheck="false"
        {...register("createFieldContent", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        placeholder="댓글 입력"
        className={styles["textarea"]}
      />
      {inputActive && (
        <div className={styles["footer"]}>
          <span className={styles["footer__error-message"]}>
            {typeof errors.createFieldContent?.message === "string" ? errors.createFieldContent?.message : ""}
          </span>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClickCancel(e); }}
            className={styles["footer__cancel-button"]}
          >
            취소
          </button>
          <button className={styles["footer__submit-button"]}>등록</button>
        </div>
      )}
    </form>
  );
};

export default CreateComment;
