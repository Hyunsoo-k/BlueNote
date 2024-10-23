import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiArrowElbowDownRightThin } from "react-icons/pi";

import { useGetUser } from "@/hooks/auth/useGetUser";
import useModal from "@/hooks/modal/useModal";
import { useDeleteReply } from "@/hooks/bbs/useDeleteReply";
import { useCreateReply } from "@/hooks/bbs/useCreateReply";
import { formatYMD } from "@/utils/dateFormatter";

import styles from "./index.module.scss";
import { useEditReply } from "@/hooks/bbs/useEditReply";

interface Props {
  key: number;
  reply: any;
  post: any;
  comment_id: string;
}

const Reply = ({ key, reply, post, comment_id }: Props) => {
  const router = useRouter();

  const { openModal, closeModal } = useModal();

  const { data: userMe } = useGetUser();

  const [toggleEditField, setToggleEditField] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const editReplyMutation = useEditReply(router.asPath, post, comment_id, reply._id, reset, setToggleEditField);
  const deleteReplyMutation = useDeleteReply(router.asPath, post, comment_id, closeModal);

  const handleEditReply = {
    onSubmit: (watch: any) => {
      const requestBody = {
        content: watch.content,
      };

      editReplyMutation.mutate(requestBody);
    },
    onError: (e: any) => {
      console.log(e);
    },
  };

  const handleDeleteReply = (reply_id: string) => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteReplyMutation.mutate(reply_id));
  };

  return (
    <div key={key} className={styles["reply"]}>
      <PiArrowElbowDownRightThin
        size={23}
        color="rgb(138, 131, 131)"
        style={{ position: "absolute", top: "20px", left: "10px" }}
      />
      <div className={styles["reply__information"]}>
        <p className={styles["reply__writer"]}>{reply.writer.nickname}</p>
        <div className={styles["reply__etc"]}>
          {!toggleEditField && userMe?._id === reply.writer._id && (
            <div className={styles["reply__action-button"]}>
              <span
                onClick={(e: any) => {
                  e.stopPropagation();
                  setToggleEditField(true);
                  reset();
                }}
              >
                수정
              </span>
              <span onClick={() => handleDeleteReply(reply._id)}>삭제</span>
            </div>
          )}
          <p className={styles["reply__created-at"]}>{formatYMD(reply.createdAt)}</p>
        </div>
      </div>
      {!toggleEditField ? (
        <p className={styles["reply__content"]}>{reply.content}</p>
      ) : (
        <form
          onSubmit={handleSubmit(handleEditReply.onSubmit, handleEditReply.onError)}
          className={styles["reply__edit-field"]}
        >
          <textarea
            {...register("content", {
              required: "내용을 입력해 주세요.",
              minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
              maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
            })}
            defaultValue={reply.content}
            spellCheck="false"
            className={styles["reply__edit-input"]}
          />
          <div className={styles["reply__edit-field-footer"]}>
            <p className={styles["reply__edit-field-error-message"]}>{errors.editFieldContent?.message}</p>
            <div className={styles["reply__button-wrapper"]}>
              <button
                type="button"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setToggleEditField(false);
                  reset();
                }}
                className={styles["reply__button"]}
              >
                취소
              </button>
              <button className={styles["reply__button"]}>수정</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Reply;
