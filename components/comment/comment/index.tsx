import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { CommentType } from "@/types/comment/comment";
import { PostType } from "@/types/post/post";
import { UserMeType } from "@/types/userMe/userMe";
import { ReplyType } from "@/types/comment/reply";
import { ViewportType } from "@/types/viewport/viewport";
import useModal from "@/hooks/modal/useModal";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import { formatYMD } from "@/utils/dateFormatter";
import ActionTools from "@/components/modal/actionTools";
import EditComment from "@/components/comment/editComment";
import CreateReply from "@/components/comment/reply/createReply";
import Reply from "@/components/comment/reply/reply";

import styles from "./index.module.scss";

interface Props {
  comment: CommentType;
  userMe: UserMeType;
  post: PostType;
  viewport: ViewportType;
};

const Comment = ({ comment, userMe, post, viewport }: Props) => {
  const router = useRouter();

  const [isActionToolsOpen, setIsActionToolsOpen] = useState<boolean>(false);
  const [isEditCommentOpen, setIsEditCommentOpen] = useState<boolean>(false);
  const [isCreateReplyOpen, setIsCreateReplyOpen] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.element_id === comment._id.toString()) {
      const scrollToElement = () => {
        const targetElement = document.getElementById(comment._id);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };

      window.requestAnimationFrame(scrollToElement);
    }
  }, [router.query]);

  const { openModal, closeModal } = useModal();

  const useDeleteCommentMutation = useDeleteComment(post._id, comment._id, closeModal);

  const handleClickActionTools = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    setIsActionToolsOpen((prev: boolean) => !prev);
  };

  const handleEditComment = (): void => {
    setIsEditCommentOpen((prev: boolean) => !prev);
  };

  const handleDeleteComment = (): void => {
    openModal(
      "confirm",
      "댓글을 삭제하시겠습니까?",
      () => useDeleteCommentMutation.mutate()
    );
  };

  const handleCreateReply = (): void => {
    if (!userMe) {
      return openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    };

    setIsCreateReplyOpen((prev: boolean) => !prev);
  };

  if (comment.deletedHavingReply) {
    return (
      <div className={styles["comment-deleted-having-reply"]}>
        <p className={styles["comment__deleted-comment"]}>삭제된 댓글입니다</p>
        {comment.reply.map((reply: ReplyType, index: number) => (
          <Reply
            key={index}
            reply={reply}
            post={post}
            comment_id={comment._id}
            viewport={viewport}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        id={comment._id}
        className={styles["container"]}
        style={router.query.element_id === comment._id.toString() ? { backgroundColor: "rgb(230, 230, 230)" } : {}}
      >
        <Image
          src={comment.writer.profileImageUrl || "/images/user/defaultProfileGray.png"}
          alt=""
          width={viewport === "mobile" ? 30 : 36}
          height={viewport === "mobile" ? 30 : 36}
          style={{
            position: "absolute",
            top: viewport === "mobile" ? "10px" : "15px",
            left: "10px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["header"]}>
          <div className={styles["writer-wrapper"]}>
            <span className={styles["writer"]}>{comment.writer.nickname}</span>
            {post.writer._id === comment.writer._id && <span className={styles["post-writer"]}>작성자</span>}
            {comment.writer._id === userMe?._id && <span className={styles["userMe-writer"]}>내가 쓴 글</span>}
          </div>
          {userMe?._id === comment.writer._id && !isEditCommentOpen && (
            <div
              id="comment__action-tools"
              onClick={(e) => {
                handleClickActionTools(e);
              }}
              className={styles["tool"]}
            >
              <HiOutlineDotsVertical size={15} color="rgb(138, 131, 131)" />
              {isActionToolsOpen && (
                <ActionTools
                  setOpenActionTools={setIsActionToolsOpen}
                  handleClickEdit={handleEditComment}
                  handleClickDelete={handleDeleteComment}
                />
              )}
            </div>
          )}
        </div>
        {!isEditCommentOpen && <p className={styles["content"]}>{comment.content}</p>}
        {isEditCommentOpen && (
          <EditComment
            setIsEditCommentOpen={setIsEditCommentOpen}
            post={post}
            comment={comment}
          />
        )}
        <div className={styles["footer"]}>
          <span className={styles["created-at"]}>{formatYMD(comment.createdAt)}</span>
          <button
            type="button"
            onClick={handleCreateReply}
            className={styles["create-reply-button"]}
          >
            답글 쓰기
          </button>
        </div>
      </div>
      {isCreateReplyOpen && (
        <CreateReply
          post_id={post._id}
          comment_id={comment._id}
          setIsCreateReplyOpen={setIsCreateReplyOpen}
          viewport={viewport}
        />
      )}
      {comment.reply.map((reply: any, index: number) => (
        <Reply
          key={index}
          post={post}
          comment_id={comment._id}
          reply={reply}
          viewport={viewport}
        />
      ))}
    </>
  );
};

export default Comment;
