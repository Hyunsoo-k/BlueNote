import Image from "next/image";
import { useState } from "react";

import useModal from "@/hooks/modal/useModal";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import { formatYMD } from "@/utils/dateFormatter";
import EditCommentField from "@/components/bbs/comment/editCommentField";
import CreateReply from "@/components/bbs/comment/reply/createReply";
import Reply from "@/components/bbs/comment/reply";

import styles from "./index.module.scss";

interface Props {
  key: number;
  comment: any;
  userMe: any;
  post: any;
}

const Comment = ({ key, comment, userMe, post }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreatingReply, setIsCreatingReply] = useState<boolean>(false);

  const { openModal, closeModal } = useModal();

  const deleteCommentMutation = useDeleteComment(post._id, comment._id, closeModal);

  const handleEditComment = (e: any) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDeleteComment = (e: any) => {
    e.stopPropagation();
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteCommentMutation.mutate());
  };

  if (comment.deletedHavingReply) {
    return (
      <div className={styles["comment-deleted-having-reply"]}>
        <p className={styles["comment__deleted-comment"]}>삭제된 댓글입니다</p>
        {comment.reply.map((reply: any, index: number) => (
          <Reply key={index} reply={reply} post={post} comment_id={comment._id} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div key={key} className={styles["comment"]}>
        <Image
          src={comment.writer.profileImage.url || "/images/user/defaultProfileGray.png"}
          alt=""
          width={36}
          height={36}
          style={{
            position: "absolute",
            top: "15px",
            left: "3px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["comment__information"]}>
          <p className={styles["comment__writer"]}>
            {comment.writer.nickname}
            {post.writer._id === comment.writer._id && <span>작성자</span>}
          </p>
          <div className={styles["comment__etc"]}>
            {userMe?._id === comment.writer._id && !isEditing && (
              <div className={styles["comment__action-button"]}>
                <span onClick={(e: any) => handleEditComment(e)}>수정</span>
                <span onClick={(e: any) => handleDeleteComment(e)}>삭제</span>
              </div>
            )}
            <p className={styles["comment__created-at"]}>{formatYMD(comment.createdAt)}</p>
          </div>
        </div>
        <EditCommentField
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          post={post}
          comment={comment}
        />
        <p className={styles["comment__content"]}>{!isEditing && comment.content}</p>
        <button
          type="button"
          onClick={() => setIsCreatingReply((prev: boolean) => !prev)}
          className={styles["comment__create-reply-button"]}
        >
          답글 쓰기
        </button>
      </div>
      <CreateReply
        post_id={post._id}
        comment_id={comment._id}
        isCreatingReply={isCreatingReply}
        setIsCreatingReply={setIsCreatingReply}
      />
      {comment.reply.map((reply: any, index: number) => (
        <Reply key={index} reply={reply} post={post} comment_id={comment._id} />
      ))}
    </>
  );
};

export default Comment;
