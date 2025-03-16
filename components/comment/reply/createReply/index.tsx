import { Dispatch, MouseEvent, SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { PiArrowElbowDownRightThin } from "react-icons/pi";

import { ViewportType } from "@/types/viewport/viewport";

import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useCreateReply } from "@/hooks/bbs/useCreateReply";

import styles from "./index.module.scss";

interface Props {
  post_id: string;
  comment_id: string;
  setIsCreateReplyOpen: Dispatch<SetStateAction<boolean>>;
  viewport: ViewportType;
};

const CreateReply = ({
  post_id,
  comment_id,
  setIsCreateReplyOpen,
  viewport
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const { data: userMe } = useGetUserQuery();

  const useCreateReplyMutation = useCreateReply(
    post_id,
    comment_id,
    setIsCreateReplyOpen
  );

  const handleClickCancel = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    reset();

    setIsCreateReplyOpen(false);
  };

  const handleCreateReply = {
    onSubmit: (watch: Record<string, string>): void => {
      const requestbody = {
        postUrl: window.location.pathname,
        content: watch.createFieldContent,
      };

      useCreateReplyMutation.mutate(requestbody);
    },
    onError: (error: FieldErrors): void => {
      console.log(error);
    }
  };

  return (
    <div className={styles["component"]}>
      <PiArrowElbowDownRightThin
        size={viewport === "mobile" ? 18 : 23}
        color="rgb(138, 131, 131)"
        style={{
          position: "absolute",
          top: "20px",
          left: `${viewport === "mobile" ? "10px" : "55px"}`
        }}
      />
      <form
        onSubmit={handleSubmit(handleCreateReply.onSubmit, handleCreateReply.onError)}
        className={styles["form"]}
      >
        <p className={styles["writer"]}>{userMe?.nickname}</p>
        <textarea
          spellCheck="false"
          {...register("createFieldContent", {
            required: "내용을 입력해 주세요.",
            minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
            maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
          })}
          className={styles["input"]}
        />
        <div className={styles["bottom"]}>
          <p className={styles["error-message"]}>
            {typeof errors.createFieldContent?.message === "string" ? errors.createFieldContent.message : ""}
          </p>
          <div className={styles["button-wrapper"]}>
            <button
              type="button"
              onClick={handleClickCancel}
            >
              취소
            </button>
            <button className={styles["submit-button"]}>등록</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateReply;
