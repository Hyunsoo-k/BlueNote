import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useGetUser } from "@/hooks/auth/useGetUser";
import { useCreateComment } from "@/hooks/bbs/useCreateComment";

import styles from "./index.module.scss";

interface Props {
  post_id: any;
}

const CreateComment = ({ post_id }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();
  
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
        targetUrl: router.asPath
      };

      createCommentMutation.mutate(requestbody);
    },
    onError: (e: any) => console.log(e),
  };

  if (!userMe) {
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment.onSubmit, handleCreateComment.onError)}
      className={styles["create-comment"]}
    >
      <p className={styles["create-comment__writer"]}>{userMe.nickname}</p>
      <textarea
        spellCheck="false"
        {...register("createFieldContent", {
          required: "내용을 입력해 주세요.",
          minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
          maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
        })}
        className={styles["create-comment__create-input"]}
      />
      <div className={styles["create-comment__footer"]}>
        <p className={styles["create-comment__error-message"]}>
          {errors.createFieldContent?.message}
        </p>
        <button className={styles["create-comment__button"]}>등록</button>
      </div>
    </form>
  );
};

export default CreateComment;
