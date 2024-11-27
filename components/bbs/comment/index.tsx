import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import useModal from "@/hooks/modal/useModal";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import { formatYMD } from "@/utils/dateFormatter";
import EditComment from "@/components/bbs/comment/editComment";
import CreateReply from "@/components/bbs/reply/createReply";
import Reply from "@/components/bbs/reply";

import styles from "./index.module.scss";

interface Props {
  key: number;
  comment: any;
  userMe: any;
  post: any;
}

const Comment = ({ key, comment, userMe, post }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.element_id === comment._id.toString()) {
      const scrollToElement = () => {
        const targetElement = document.getElementById(comment._id);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        };
      };

      requestAnimationFrame(scrollToElement);
    }
  }, [router.query]);

  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
  const [isCreatingReply, setIsCreatingReply] = useState<boolean>(false);

  const { openModal, closeModal } = useModal();

  const deleteCommentMutation = useDeleteComment(post._id, comment._id, closeModal);

  const handleEditComment = (e: any) => {
    e.stopPropagation();
    setIsEditingComment((prev: boolean) => !prev);
  };

  const handleDeleteComment = (e: any) => {
    e.stopPropagation();
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteCommentMutation.mutate());
  };

  const handleCreateReply = (e: any) => {
    e.stopPropagation();
    setIsCreatingReply((prev: boolean) => !prev);
  };

  if (comment.deletedHavingReply) {
    return (
      <div key={key} className={styles["comment-deleted-having-reply"]}>
        <p className={styles["comment__deleted-comment"]}>삭제된 댓글입니다</p>
        {comment.reply.map((reply: any, index: number) => (
          <Reply key={index} reply={reply} post={post} comment_id={comment._id} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        key={key}
        id={comment._id}
        className={styles["comment"]}
        style={ router.query.element_id === comment._id.toString() ? { backgroundColor: "red" } : {} }
      >
        <Image
          src={comment.writer.profileImage.url || "/images/user/defaultProfileGray.png"}
          alt=""
          width={36}
          height={36}
          style={{
            position: "absolute",
            top: "15px",
            left: "10px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["comment__header"]}>
          <p className={styles["comment__writer"]}>
            {comment.writer.nickname}
            {post.writer._id === comment.writer._id && <span className={styles["comment__post_writer"]}>작성자</span>}
            {comment.writer._id === userMe?._id && <span className={styles["comment__userMe_writer"]}>내가 쓴 글</span>}
          </p>
            {userMe?._id === comment.writer._id && !isEditingComment && (
              <div className={styles["comment__action-button"]}>
                <span onClick={(e: any) => { handleEditComment(e); }}>
                  수정
                </span>
                <span onClick={(e: any) => { handleDeleteComment(e); }}>
                  삭제
                </span>
              </div>
            )}
        </div>
        {!isEditingComment && <p className={styles["comment__content"]}>{comment.content}</p>}
        {isEditingComment && <EditComment setIsEditing={setIsEditingComment} post={post} comment={comment} />}
        <div className={styles["comment__footer"]}>
          <p className={styles["comment__created-at"]}>{formatYMD(comment.createdAt)}</p>
          <button
            type="button"
            onClick={(e: any) => { handleCreateReply(e); }}
            className={styles["comment__create-reply-button"]}
          >
            답글 쓰기
          </button>
        </div>
      </div>
      {isCreatingReply && (
        <CreateReply post_id={post._id} comment_id={comment._id} setIsCreatingReply={setIsCreatingReply} />
      )}
      {comment.reply.map((reply: any, index: number) => (
        <Reply key={index} post={post} comment_id={comment._id} reply={reply} />
      ))}
    </>
  );
};

export default Comment;
