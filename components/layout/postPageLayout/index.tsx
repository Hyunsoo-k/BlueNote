import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { PostType } from "@/types/post/post";
import { useGetViewport } from "@/hooks/viewport";
import { useGetUserMe } from "@/hooks/user/useGetUserMe";
import useModal from "@/hooks/modal/useModal";
import { useGetPostQuery } from "@/hooks/bbs/useGetPostQuery";
import { useDeletePost } from "@/hooks/bbs/useDeletePost";
import { formatYMD } from "@/utils/dateFormatter";
import ActionTools from "@/components/modal/actionTools";
import CommentSection from "@/components/post/commentSection";
import Aside from "@/components/aside/aside";

import styles from "./index.module.scss";

interface Props {
  initialData: PostType;
}

const PostPageLayout = ({ initialData }: Props) => {
  const router = useRouter();

  const [openActionTools, setOpenActionTools] = useState<boolean>(false);

  const viewport = useGetViewport();
  const userMe = useGetUserMe();
  const { openModal, closeModal } = useModal();

  const { data: queryData } = useGetPostQuery(`/bbs/${initialData.mainCategory}/post/${initialData._id}`, initialData);

  const useDeletePostMutation = useDeletePost(queryData, closeModal);

  const handleClickActionTools = (e: MouseEvent<SVGAElement>): void => {
    e.stopPropagation();

    setOpenActionTools((prev: boolean) => !prev);
  };

  const handleClickEditPost = (): void => {
    router.push(`/bbs/${queryData.mainCategory}/post/editPost/${queryData._id}`);
  };

  const handleClickDeletePost = (): void => {
    openModal("confirm", "게시글을 삭제하시겠습니까?", useDeletePostMutation.mutate);
  };

  const handleClickNeighborPost = (post_id: string): void => {
    router.push(`/bbs/${queryData.mainCategory}/post/${post_id}`);
  };

  return (
    <div className={styles["component"]}>
      <div className={styles["main"]}>
        <div className={styles["main__header"]}>
          <div className={styles["bread__crumbs"]}>
            <span>
              <IoMdHome
                size={viewport === "mobile" ? 14 : 16}
                color="#2C2C2C"
                style={{
                  position: "relative",
                  top: "2px",
                  marginRight: "3px",
                }}
              />
              홈
            </span>
            <MdKeyboardArrowRight
              size={20}
              color="rgb(138, 131, 131)"
              style={viewport === "mobile" ? { position: "relative", top: "1px" } : {}}
            />
            <span>{queryData.mainCategory.toUpperCase()}</span>
            <MdKeyboardArrowRight
              size={20}
              color="rgb(138, 131, 131)"
              style={viewport === "mobile" ? { position: "relative", top: "1px" } : {}}
            />
            <span>{queryData.subCategory}</span>
          </div>
          <p className={styles["main__title"]}>{queryData.title}</p>
          <div className={styles["main__post-information"]}>
            <span className={styles["writer"]}>{queryData.writer.nickname}</span>
            <div className={styles["boundary-line"]}></div>
            <span>{formatYMD(queryData.createdAt)}</span>
            <div className={styles["boundary-line"]}></div>
            <span>댓글 {queryData.commentList.length}</span>
            <div className={styles["boundary-line"]}></div>
            <span>추천 {queryData.recommend.length}</span>
            {userMe && userMe._id === queryData.writer._id && (
              <div className={styles["main__post-action-wrapper"]}>
                <HiOutlineDotsVertical
                  size={15}
                  color="rgb(138, 131, 131)"
                  onClick={handleClickActionTools}
                  style={{
                    position: "relative",
                    top: "-2px",
                  }}
                />
                {openActionTools && (
                  <ActionTools
                    setOpenActionTools={setOpenActionTools}
                    handleClickEdit={handleClickEditPost}
                    handleClickDelete={handleClickDeletePost}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: queryData.content }} className={styles["main__content"]}></div>
        <div className={styles["recommend"]}></div>
        <div className={styles["comment-section"]}>
          <CommentSection viewport={viewport} post={queryData} />
        </div>
        <div className={styles["neighbor"]}>
          {queryData.nextPost && (
            <div
              onClick={() => {
                handleClickNeighborPost(queryData.nextPost._id);
              }}
              className={styles["next-post-box"]}
            >
              <span className={styles["next-post"]}>다음글</span>
              <span className={styles["next-link"]}>{queryData.nextPost.title}</span>
            </div>
          )}
          {queryData.previousPost && (
            <div
              onClick={() => {
                handleClickNeighborPost(queryData.previousPost._id);
              }}
              className={styles["previous-post-box"]}
            >
              <span className={styles["previous-post"]}>이전글</span>
              <span className={styles["previous-link"]}>{queryData.previousPost.title}</span>
            </div>
          )}
        </div>
      </div>
      {viewport !== "mobile" && (
        <div className={styles["aside"]}>
          <Aside />
        </div>
      )}
    </div>
  );
};

export default PostPageLayout;
