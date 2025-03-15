import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useGetViewport } from "@/hooks/viewport";
import { useGetUserMe } from "@/hooks/user/useGetUserMe";
import { formatYMD } from "@/utils/dateFormatter";
import ActionTools from "@/components/modal/actionTools";
import CommentSection from "@/components/post/commentSection";
import Aside from "@/components/aside/aside";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
};

const PostPageLayout = ({ initialData }:Props) => {
  const router = useRouter();

  const viewport = useGetViewport();
  const userMe = useGetUserMe();

  const [openActionTools, setOpenActionTools] = useState<boolean>(false);

  const handleClickActionTools = (e: any) => {
    e.stopPropagation();
    setOpenActionTools((prev: boolean) => !prev);
  };

  const handleClickEditPost = (): void => {
    router.push(`/bbs/${initialData.mainCategory}/post/editPost/${initialData._id}`);
  };

  const handleClickDeletePost = (): void => {

  };

  const handleClickNeighborPost = (post_id: string): void => {
    router.push(`/bbs/${initialData.mainCategory}/post/${post_id}`);
  };

  return (
    <div className={styles["component"]}>
    <div className={styles["main"]}>
      <div className={styles["main__header"]}>
        <div className={styles["bread__crumbs"]}>
          <span>
            <IoMdHome
              size={viewport ==="mobile" ? 14 : 16}
              color="#2C2C2C"
              style={{
                position: "relative",
                top: "2px",
                marginRight: "3px"
              }}
            />
            홈
          </span>
          <MdKeyboardArrowRight
            size={20}
            color="rgb(138, 131, 131)"
            style={
              viewport === "mobile"
                ? { position: "relative", top: "1px" }
                : {}
            }
          />
          <span>{initialData.mainCategory.toUpperCase()}</span>
          <MdKeyboardArrowRight
            size={20}
            color="rgb(138, 131, 131)"
            style={
              viewport === "mobile"
                ? { position: "relative", top: "1px" }
                : {}
            }
          />
          <span>
            {initialData.subCategory}
          </span>
        </div>
        <p className={styles["main__title"]}>
          {initialData.title}
        </p>
        <div className={styles["main__post-information"]}>
          <span className={styles["writer"]}>
            {initialData.writer.nickname}
          </span>
          <div className={styles["boundary-line"]}></div>
          <span>
            {formatYMD(initialData.createdAt)}
          </span>
          <div className={styles["boundary-line"]}></div>
          <span>
            댓글 {initialData.commentList.length}
          </span>
          <div className={styles["boundary-line"]}></div>
          <span>
            추천 {initialData.recommend.length}
          </span>
          {userMe && userMe._id === initialData.writer._id && (
            <div className={styles["main__post-action-wrapper"]}>
              <HiOutlineDotsVertical
                size={15}
                color="rgb(138, 131, 131)"
                onClick={handleClickActionTools}
                style={{
                  position: "relative",
                  top: "-2px"
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
      <div
        dangerouslySetInnerHTML={{ __html: initialData.content }}
        className={styles["main__content"]}
      >
      </div>
      <div className={styles["recommend"]}>

      </div>
      <div className={styles["comment-section"]}>
        <CommentSection
          post={initialData}
          viewport={viewport}
        />
      </div>
      <div className={styles["neighbor"]}>
        {initialData.nextPost && (
          <div
            onClick={() => {handleClickNeighborPost(initialData.nextPost._id); }}
            className={styles["next-post-box"]}
          >
            <span className={styles["next-post"]}>다음글</span>
            <span className={styles["next-link"]}>
              {initialData.nextPost.title}
            </span>
          </div>
        )}
        {initialData.previousPost && (
          <div
            onClick={() => {handleClickNeighborPost(initialData.previousPost._id); }}
            className={styles["previous-post-box"]}
          >
            <span className={styles["previous-post"]}>이전글</span>
            <span className={styles["previous-link"]}>
              {initialData.previousPost.title}
            </span>
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