import { useForm } from "react-hook-form";
import { PiArrowElbowDownRightThin } from "react-icons/pi";

import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useCreateReply } from "@/hooks/bbs/useCreateReply";

import styles from "./index.module.scss";

interface Props {
  post_id: string;
  comment_id: string;
  setIsCreatingReply: any;
  viewport: string;
};

const CreateReply = ({ post_id, comment_id, setIsCreatingReply, viewport }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const { data: userMe } = useGetUserQuery();

  const createReplyMutation = useCreateReply(post_id, comment_id, setIsCreatingReply);

  const handleCancelCreateReply = (e: any) => {
    e.stopPropagation();
    reset();
    setIsCreatingReply(false);
  };

  const handleCreateReply = {
    onSubmit: (watch: any) => {
      const requestbody = {
        postUrl: window.location.pathname,
        content: watch.createFieldContent,
      };

      createReplyMutation.mutate(requestbody);
    },
    onError: (e: any) => console.log(e),
  };

  return (
    <div className={styles["create-reply"]}>
      <PiArrowElbowDownRightThin
        size={viewport === "mobile" ? 18 : 23}
        color="rgb(138, 131, 131)"
        style={{ position: "absolute", top: "20px", left: "10px" }}
      />
      <form
        onSubmit={handleSubmit(handleCreateReply.onSubmit, handleCreateReply.onError)}
        className={styles["create-reply__form"]}
      >
        <p className={styles["create-reply__writer"]}>{userMe?.nickname}</p>
        <textarea
          spellCheck="false"
          {...register("createFieldContent", {
            required: "내용을 입력해 주세요.",
            minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
            maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
          })}
          className={styles["create-reply__create-input"]}
        />
        <div className={styles["create-reply__footer"]}>
          <p className={styles["create-reply__error-message"]}>
            {typeof errors.createFieldContent?.message === "string" ? errors.createFieldContent.message : ""}
          </p>
          <div className={styles["create-reply__button-wrapper"]}>
            <button
              type="button"
              onClick={(e: any) => handleCancelCreateReply(e)}
              className={styles["create-reply__button"]}
            >
              취소
            </button>
            <button className={styles["create-reply__button"]}>등록</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateReply;
