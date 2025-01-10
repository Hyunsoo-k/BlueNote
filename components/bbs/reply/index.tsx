import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PiArrowElbowDownRightThin } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import useModal from "@/hooks/modal/useModal";
import { useDeleteReply } from "@/hooks/bbs/useDeleteReply";
import { formatYMD } from "@/utils/dateFormatter";
import EditReply from "./editReply";
import CreateReply from "./createReply";

import styles from "./index.module.scss";
import ActionTools from "@/components/modal/actionTools";

interface Props {
  key: number;
  post: any;
  comment_id: string;
  reply: any;
  viewport: string;
};

const Reply = ({ key, post, comment_id, reply, viewport }: Props) => {
  const router = useRouter();
  
  const [openActionTools, setOpenActionTools] = useState<boolean>(false);
  const [isEditingReply, setIsEditingReply] = useState<boolean>(false);
  const [isCreatingReply, setIsCreatingReply] = useState<boolean>(false);

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

  const handleClickActionTools = (e: any) => {
    e.stopPropagation();
    setOpenActionTools((prev: boolean) => !prev);
  };

  const handleEditReply = (e: any) => {
    setIsEditingReply((prev: boolean) => !prev);
  };

  const handleDeleteReply = (e: any) => {
    openModal("confirm", "댓글을 삭제하시겠습니까?", () => deleteReplyMutation.mutate());
  };

  const handleCreateReply = (e: any) => {
    setIsCreatingReply((prev: boolean) => !prev);
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
        size={viewport === "mobile" ? 18 : 23}
          color="rgb(138, 131, 131)"
          style={{
            position: "absolute",
            top: viewport === "mobile" ? "13px" : "20px",
            left: "10px"
          }}
        />
        <Image
          src={reply.writer.profileImage.url || "/images/user/defaultProfileGray.png"}
          alt=""
          width={viewport === "mobile" ?  28 : 36}
          height={viewport === "mobile" ?  28 : 36}
          style={{
            position: "absolute",
            top: viewport === "mobile" ? "10px" : "15px",
            left: viewport === "mobile" ? "37px" : "50px",
            borderRadius: "50%",
          }}
        />
        <div className={styles["reply__header"]}>
          <div className={styles["reply__writer-info"]}>
            <span className={styles["reply__writer"]}>{reply.writer.nickname}</span>
            {post.writer._id === reply.writer._id && (
              <span className={styles["reply__post_writer"]}>작성자</span>
            )}
            {reply.writer._id === userMe?._id && (
              <span className={styles["reply__userMe_writer"]}>내가 쓴 글</span>
            )}         
          </div> 
          {!isEditingReply && userMe?._id === reply.writer._id && (
            <div
              onClick={(e) => { handleClickActionTools(e); }}
              className={styles["reply__action-tools"]}
            >
              <HiOutlineDotsVertical
                size={15}
                color="rgb(138, 131, 131)"
              />
              {openActionTools && (
                <ActionTools
                  setOpenActionTools={setOpenActionTools}
                  handleClickEdit={handleEditReply}
                  handleClickDelete={handleDeleteReply}
                />
              )}
            </div>
          )}
        </div>
        {!isEditingReply && (
          <p className={styles["reply__content"]}>{reply.content}</p>
        )}
        {isEditingReply && (
          <EditReply setIsEditing={setIsEditingReply} post_id={post._id} comment_id={comment_id} reply={reply} />
        )}
        <div className={styles["reply__footer"]}>
          <span className={styles["reply__created-at"]}>{formatYMD(reply.createdAt)}</span>
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
        <CreateReply
          post_id={post._id}
          comment_id={comment_id}
          setIsCreatingReply={setIsCreatingReply}
          viewport={viewport}
        />
      )}
    </>
  );
};

export default Reply;
