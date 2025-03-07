import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import useModal from "@/hooks/modal/useModal";
import { useDeleteComment } from "@/hooks/bbs/useDeleteComment";
import { formatYMD } from "@/utils/dateFormatter";
import ActionTools from "@/components/modal/actionTools";
import EditComment from "@/components/bbs/comment/editComment";
import CreateReply from "@/components/bbs/comment/reply/createReply";
import Reply from "@/components/bbs/comment/reply/reply";

import styles from "./index.module.scss";

interface Props {
  key: number;
  comment: any;
  userMe: any;
  post: any;
  viewport: string;
}

const Comment = ({ key, comment, userMe, post, viewport }: Props) => {
  const router = useRouter();

  const [openActionTools, setOpenActionTools] = useState<boolean>(false);
  const [openEditiComment, setOpenEditComment] = useState<boolean>(false);
  const [openCreateReply, setOpenCreateReply] = useState<boolean>(false);

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

  const deleteCommentMutation = useDeleteComment(post._id, comment._id, closeModal);

  const handleClickActionTools = (e: any) => {
    e.stopPropagation();
    setOpenActionTools((prev: boolean) => !prev);
  };

  const handleEditComment = () => {
    setOpenEditComment((prev: boolean) => !prev);
  };

  const handleDeleteComment = () => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteCommentMutation.mutate());
  };

  const handleCreateReply = () => {
    setOpenCreateReply((prev: boolean) => !prev);
  };

  if (comment.deletedHavingReply) {
    return (
      <div key={key} className={styles["comment-deleted-having-reply"]}>
        <p className={styles["comment__deleted-comment"]}>삭제된 댓글입니다</p>
        {comment.reply.map((reply: any, index: number) => (
          <Reply key={index} reply={reply} post={post} comment_id={comment._id} viewport={viewport} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        key={key}
        id={comment._id}
        className={styles["container"]}
        style={router.query.element_id === comment._id.toString() ? { backgroundColor: "rgb(230, 230, 230)" } : {}}
      >
        <Image
          src={comment.writer.profileImage.url || "/images/user/defaultProfileGray.png"}
          alt=""
          width={viewport === "mobile" ? 28 : 36}
          height={viewport === "mobile" ? 28 : 36}
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
          {userMe?._id === comment.writer._id && !openEditiComment && (
            <div
              id="comment__action-tools"
              onClick={(e) => {
                handleClickActionTools(e);
              }}
              className={styles["tool"]}
            >
              <HiOutlineDotsVertical size={15} color="rgb(138, 131, 131)" />
              {openActionTools && (
                <ActionTools
                  setOpenActionTools={setOpenActionTools}
                  handleClickEdit={handleEditComment}
                  handleClickDelete={handleDeleteComment}
                />
              )}
            </div>
          )}
        </div>
        {!openEditiComment && <p className={styles["content"]}>{comment.content}</p>}
        {openEditiComment && <EditComment setIsEditing={setOpenEditComment} post={post} comment={comment} />}
        <div className={styles["footer"]}>
          <span className={styles["created-at"]}>{formatYMD(comment.createdAt)}</span>
          <button type="button" onClick={handleCreateReply} className={styles["create-reply-button"]}>
            답글 쓰기
          </button>
        </div>
      </div>
      {openCreateReply && (
        <CreateReply
          post_id={post._id}
          comment_id={comment._id}
          setIsCreatingReply={setOpenCreateReply}
          viewport={viewport}
        />
      )}
      {comment.reply.map((reply: any, index: number) => (
        <Reply key={index} post={post} comment_id={comment._id} reply={reply} viewport={viewport} />
      ))}
    </>
  );
};

export default Comment;
