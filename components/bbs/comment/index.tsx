import { useState } from "react";
import { useForm } from "react-hook-form";

import useModal from "@/hooks/modal/useModal";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import { useEditComment } from "@/hooks/bbs/useEditComment";
import { formatYMD } from "@/utils/dateFormatter";
import CreateReply from "../createReply";

import styles from "./index.module.scss";
import Reply from "../reply";

interface Props {
  key: number;
  comment: any;
  userMe: any;
  post: any;
}

const Comment = ({ key, comment, userMe, post }: Props) => {
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [showCreateReply, setShowCreateReply] = useState<boolean>(false);

  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const editCommentMutation = useEditComment(post._id, comment._id)
  const deleteCommentMutation = useDeleteComment(post._id, comment._id, closeModal)

  const handleCreateReply = () => {
    !comment.deletedHavingReply && setShowCreateReply(true);
  };

  const handleEditComment = {
    onSubmit: (watch: any) => {
      const requestBody = {
        content: watch.editFieldContent
      };

      setShowEditComment(false);
      editCommentMutation.mutate(requestBody);
    },
    onError: (e: any) => console.log(e),
  };

  const handleDeleteComment = () => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteCommentMutation.mutate());
  };

  return (
    <div key={key} onClick={handleCreateReply} className={styles["comment"]}>
      {!comment.deletedHavingReply && <div className={styles["comment__information"]}>
        <p className={styles["comment__writer"]}>{comment.writer.nickname}</p>
        <div className={styles["comment__etc"]}>
          {userMe?._id === comment.writer._id && !showEditComment && !comment.deletedHavingReply && (
            <div className={styles["comment__action-button"]}>
              <span
                onClick={(e: any) => {
                  e.stopPropagation();
                  setShowEditComment(true);
                }}
              >
                수정
              </span>
              <span onClick={() => handleDeleteComment()}>삭제</span>
            </div>
          )}
          <p className={styles["comment__created-at"]}>{formatYMD(comment.createdAt)}</p>
        </div>
      </div>}
      {showEditComment && (
        <form
          onSubmit={handleSubmit(handleEditComment.onSubmit, handleEditComment.onError)}
          className={styles["comment__edit-field"]}
        >
          <textarea
            {...register("editFieldContent", {
              required: "내용을 입력해 주세요.",
              minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
              maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
            })}
            defaultValue={comment.content}
            spellCheck="false"
            className={styles["comment__edit-input"]}
          />
          <div className={styles["comment__edit-field-footer"]}>
            <p className={styles["comment__edit-field-error-message"]}>{errors.editFieldContent?.message}</p>
            <div className={styles["comment__btn-wrapper"]}>
              <button
                type="button"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setShowEditComment(false);
                  reset();
                }}
                className={styles["comment__btn"]}
              >
                취소
              </button>
              <button className={styles["comment__btn"]}>수정</button>
            </div>
          </div>
        </form>
      )}
      <p className={styles["comment__content"]}>{!showEditComment && !comment.deletedHavingReply ? comment.content : "삭제된 댓글입니다"}</p>
      <CreateReply post_id={post._id} comment_id={comment._id} showCreateReply={showCreateReply} setShowCreateReply={setShowCreateReply} />
      {comment.reply.map((reply: any, index: number) => <Reply key={index} reply={reply} post={post} comment_id={comment._id} />)}
    </div>
  );
};

export default Comment;
