import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PiArrowElbowDownRightThin } from "react-icons/pi";

import { useGetUser } from "@/hooks/user/useGetUser";
import useModal from "@/hooks/modal/useModal";
import { useDeleteReply } from "@/hooks/bbs/useDeleteReply";
import { formatYMD } from "@/utils/dateFormatter";
import EditReply from "./editReply";
import CreateReply from "./createReply";

import styles from "./index.module.scss";

interface Props {
  key: number;
  post: any;
  comment_id: string;
  reply: any;
}

const Reply = ({ key, post, comment_id, reply }: Props) => {
  const router = useRouter();

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

  const [isEditingReply, setIsEditingReply] = useState<boolean>(false);
  const [isCreatingReply, setIsCreatingReply] = useState<boolean>(false);

  const { openModal, closeModal } = useModal();

  const { data: userMe } = useGetUser();

  const deleteReplyMutation = useDeleteReply(post._id, comment_id, reply._id, closeModal);

  const handleEditReply = (e: any) => {
    e.stopPropagation();
    setIsEditingReply((prev: boolean) => !prev);
  };

  const handleCreateReply = (e: any) => {
    e.stopPropagation();
    setIsCreatingReply((prev: boolean) => !prev);
  };

  const handleDeleteReply = (e: any) => {
    e.stopPropagation();
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteReplyMutation.mutate());
  };

  return (
    <>
      <div
        key={key}
        id={reply._id}
        className={styles["reply"]}
        style={router.query.element_id === reply._id.toString() ? { backgroundColor: "rgb(225, 225, 225)" } : {}}
      >
        <PiArrowElbowDownRightThin
          size={23}
          color="rgb(138, 131, 131)"
          style={{ position: "absolute", top: "20px", left: "10px" }}
        />
        <Image
          src={reply.writer.profileImage.url || "/images/user/defaultProfileGray.png"}
          alt=""
          width={36}
          height={36}
          style={{
            position: "absolute",
            top: "15px",
            left: "50px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["reply__header"]}>
          <p className={styles["reply__writer"]}>
            {reply.writer.nickname}
            {post.writer._id === reply.writer._id && <span className={styles["reply__post_writer"]}>작성자</span>}
            {reply.writer._id === userMe?._id && <span className={styles["reply__userMe_writer"]}>내가 쓴 글</span>}
          </p>
          {!isEditingReply && userMe?._id === reply.writer._id && (
            <div className={styles["reply__action-button"]}>
              <span
                onClick={(e: any) => {
                  handleEditReply(e);
                }}
              >
                수정
              </span>
              <span
                onClick={(e: any) => {
                  handleDeleteReply(e);
                }}
              >
                삭제
              </span>
            </div>
          )}
        </div>
        {!isEditingReply && <p className={styles["reply__content"]}>{reply.content}</p>}
        {isEditingReply && (
          <EditReply setIsEditing={setIsEditingReply} post_id={post._id} comment_id={comment_id} reply={reply} />
        )}
        <div className={styles["reply__footer"]}>
          <p className={styles["reply__created-at"]}>{formatYMD(reply.createdAt)}</p>
          <button
            type="button"
            onClick={(e: any) => {
              handleCreateReply(e);
            }}
            className={styles["reply__create-reply-button"]}
          >
            답글 쓰기
          </button>
        </div>
      </div>
      {isCreatingReply && (
        <CreateReply post_id={post._id} comment_id={comment_id} setIsCreatingReply={setIsCreatingReply} />
      )}
    </>
  );
};

export default Reply;
