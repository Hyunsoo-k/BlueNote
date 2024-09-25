import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Post } from "@/types/post";
import { Comment as CommentType } from "@/types/comment";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { useCreateComment } from "@/hooks/bbs/useCreateComment";
import { useEditComment } from "@/hooks/bbs/useEditComment";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import useModal from "@/hooks/modal/useModal";
import { formatYMD } from "@/utils/dateFormatter";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  post: Post;
}

const Comment = ({ post }: Props) => {
  const { data: userMe } = useGetUser();
  const [editCommentFeild, setEditCommentFeild] = useState({ show: false, comment_id: "" });
  const { openModal, closeModal } = useModal();

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: createErrors },
    reset: resetCreate,
  } = useForm({ mode: "onChange" });
  
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm({ mode: "onChange" });

  const createCommentMutation = useCreateComment(post, resetCreate);
  const editCommentMutation = useEditComment(post, setEditCommentFeild, resetEdit);
  const deleteCommentMutation = useDeleteComment(post, closeModal);

  const handleCreateComment = {
    onSubmit: (watch: any) => {
      const requestbody = { content: watch.createFieldContent };

      createCommentMutation.mutate(requestbody);
    },
    onError: (e: any) => console.log(e),
  };

  const handleEditComment = {
    onSubmit: (watch: any) => {
      const requestBody = {
        comment_id: editCommentFeild.comment_id,
        requestBody: { content: watch.editFieldContent },
      }

      editCommentMutation.mutate(requestBody);
    },
    onError: (e: any) => console.log(e),
  };

  const handleDeleteComment = (comment_id: string) => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteCommentMutation.mutate(comment_id))
  }

  return (
    <div className={styles["comment"]}>
      <p className={styles["comment__count"]}>
        댓글 <span>{post.commentList.length}</span>
      </p>
      <div className={styles["comment__list"]}>
        {post.commentList.map((comment: CommentType, index: number) => (
          <div key={index} className={styles["comment__element"]}>
            <div className={styles["comment__header"]}>
              <p className={styles["comment__writer"]}>{comment.writer.nickname}</p>
              <div className={styles["comment__etc"]}>
                {userMe?._id === comment.writer._id && editCommentFeild.comment_id !== comment._id && (
                  <div className={styles["comment__action-btn"]}>
                    <span
                      onClick={() => {
                        setEditCommentFeild({ show: true, comment_id: comment._id });
                        resetEdit();
                      }}
                    >
                      수정
                    </span>
                    <span onClick={() => handleDeleteComment(comment._id)}>삭제</span>
                  </div>
                )}
                <p className={styles["comment__created-at"]}>{formatYMD(comment.createdAt)}</p>
              </div>
            </div>
            {editCommentFeild.show &&
              editCommentFeild.comment_id === comment._id &&
              userMe?._id === comment.writer._id && (
                <form
                  onSubmit={handleSubmitEdit(handleEditComment.onSubmit, handleEditComment.onError)}
                  className={styles["comment__edit-field"]}
                >
                  <textarea
                    {...registerEdit("editFieldContent", {
                      required: "내용을 입력해 주세요.",
                      minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
                      maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
                    })}
                    defaultValue={comment.content}
                    spellCheck="false"
                    className={styles["comment__edit-input"]}
                  />
                  <div className={styles["comment__edit-field-footer"]}>
                    <p className={styles["comment__edit-field-error-message"]}>
                      {editErrors.editFieldContent?.message}
                    </p>
                    <div className={styles["comment__btn-wrapper"]}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditCommentFeild({ show: false, comment_id: "" });
                          resetEdit();
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
            {editCommentFeild.comment_id !== comment._id && (
              <p className={styles["comment__content"]}>{comment.content}</p>
            )}
          </div>
        ))}
      </div>
      {userMe && (
        <form
          onSubmit={handleSubmitCreate(handleCreateComment.onSubmit, handleCreateComment.onError)}
          className={styles["comment__create-field"]}
        >
          <p className={styles["comment__user"]}>{userMe.nickname}</p>
          <textarea
            spellCheck="false"
            {...registerCreate("createFieldContent", {
              required: "내용을 입력해 주세요.",
              minLength: { value: 1, message: "1글자 이상 입력해 주세요." },
              maxLength: { value: 1000, message: "1000글자 이하로 작성해 주세요." },
            })}
            className={styles["comment__create-input"]}
          />
          <div className={styles["comment__create-field-footer"]}>
            <p className={styles["comment__create-field-error-message"]}>{createErrors.createFieldContent?.message}</p>
            <button className={styles["comment__btn"]}>등록</button>
          </div>
        </form>
      )}
      <ModalContainer />
    </div>
  );
};

export default Comment;
