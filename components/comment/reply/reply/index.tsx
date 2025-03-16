import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { PostType } from "@/types/post/post";
import { ReplyType } from "@/types/comment/reply";
import { ViewportType } from "@/types/viewport/viewport";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import useModal from "@/hooks/modal/useModal";
import { useDeleteReply } from "@/hooks/bbs/useDeleteReply";
import { formatYMD } from "@/utils/dateFormatter";
import ActionTools from "@/components/modal/actionTools";
import EditReply from "../editReply";
import CreateReply from "../createReply";

import styles from "./index.module.scss";

interface Props {
  key: number;
  post: PostType;
  comment_id: string;
  reply: ReplyType;
  viewport: ViewportType;
};

const Reply = ({
  key,
  post,
  comment_id,
  reply,
  viewport
}: Props) => {
  const router = useRouter();

  const [isActionToolsOpen, setIsActionToolsOpen] = useState<boolean>(false);
  const [isEditReplyOpen, setIsEditReplyOpen] = useState<boolean>(false);
  const [isCreateReplyOpen, setIsCreateReplyOpen] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.element_id === reply._id.toString()) {
      const targetElement = document.getElementById(reply._id);

      if (targetElement) {
        const scrollCallback = () => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        };

        "requestIdleCallback" in window && requestIdleCallback(scrollCallback);
      }
    }
  }, [router.query]);

  const { openModal, closeModal } = useModal();

  const { data: userMe } = useGetUserQuery();

  const deleteReplyMutation = useDeleteReply(post._id, comment_id, reply._id, closeModal);

  const handleClickActionTools = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    setIsActionToolsOpen((prev: boolean) => !prev);
  };

  const handleEditReply = (): void  => {
    setIsEditReplyOpen((prev: boolean) => !prev);
  };

  const handleDeleteReply = (): void  => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteReplyMutation.mutate());
  };

  const handleCreateReply = (): void  => {
    setIsCreateReplyOpen((prev: boolean) => !prev);
  };

  return (
    <>
      <div
        key={key}
        id={reply._id}
        className={styles["component"]}
        style={router.query.element_id === reply._id.toString() ? { backgroundColor: "rgb(230, 230, 230)" } : {}}
      >
        <Image
          src={reply.writer.profileImageUrl || "/images/user/defaultProfileGray.png"}
          alt=""
          width={viewport === "mobile" ? 30 : 36}
          height={viewport === "mobile" ? 30 : 36}
          style={{
            position: "absolute",
            top: viewport === "mobile" ? "10px" : "15px",
            left: viewport === "mobile" ? "37px" : "50px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["header"]}>
          <div className={styles["writer-info"]}>
            <span className={styles["writer"]}>{reply.writer.nickname}</span>
            {post.writer._id === reply.writer._id && (
              <span className={styles["post-writer"]}>작성자</span>
            )}
            {reply.writer._id === userMe?._id && (
              <span className={styles["userMe-writer"]}>내가 쓴 글</span>
            )}
          </div>
          {!isEditReplyOpen && userMe?._id === reply.writer._id && (
            <div
              onClick={handleClickActionTools}
              className={styles["action-tools"]}
            >
              <HiOutlineDotsVertical
                size={15}
                color="rgb(138, 131, 131)"
              />
              {isActionToolsOpen && (
                <ActionTools
                  setOpenActionTools={setIsActionToolsOpen}
                  handleClickEdit={handleEditReply}
                  handleClickDelete={handleDeleteReply}
                />
              )}
            </div>
          )}
        </div>
        {!isEditReplyOpen && (
          <p className={styles["content"]}>{reply.content}</p>
        )}
        {isEditReplyOpen && (
          <EditReply
            isEditingReply={setIsEditReplyOpen}
            post_id={post._id}
            comment_id={comment_id}
            reply={reply}
          />
        )}
        <div className={styles["bottom"]}>
          <span className={styles["created-at"]}>{formatYMD(reply.createdAt)}</span>
          <button
            type="button"
            onClick={handleCreateReply}
          >
            답글 쓰기
          </button>
        </div>
      </div>
      {isCreateReplyOpen && (
        <CreateReply
          post_id={post._id}
          comment_id={comment_id}
          setIsCreateReplyOpen={setIsCreateReplyOpen}
          viewport={viewport}
        />
      )}
    </>
  );
};

export default Reply;
