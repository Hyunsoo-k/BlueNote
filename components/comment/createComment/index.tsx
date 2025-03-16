import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";

import { ViewportType } from "@/types/viewport/viewport";
import { UserMeType } from "@/types/userMe/userMe";
import { useCreateComment } from "@/hooks/bbs/useCreateComment";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  post_id: string;
  userMe: UserMeType;
};

const CreateComment = ({ viewport, post_id, userMe }: Props) => {
  const router = useRouter();

  const [inputActive, setInputActive] = useState<boolean>(false);

  const handleClickInput = (): void => {
    setInputActive(true);
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    setInputActive(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const useCreateCommentMutation = useCreateComment(router.asPath, post_id, reset);

  const handleCreateComment = {
    onSubmit: (watch: Record<string, string>): void => {
      const requestbody = {
        content: watch.createFieldContent,
        postUrl: router.asPath,
      };

      useCreateCommentMutation.mutate(requestbody);
    },
    onError: (e: FieldErrors): void => {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment.onSubmit, handleCreateComment.onError)}
      onClick={handleClickInput}
      className={`${styles["componenet"]} ${inputActive ? styles.active : ""}`}
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
        className={styles["input"]}
      />
      {inputActive && (
        <div className={styles["bottom"]}>
          <span className={styles["error-message"]}>
            {typeof errors.createFieldContent?.message === "string" ? errors.createFieldContent?.message : ""}
          </span>
          <button onClick={handleClickCancel}>취소</button>
          <button className={styles["submit-button"]}>등록</button>
        </div>
      )}
    </form>
  );
};

export default CreateComment;
