import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { PostType } from "@/types/post";
import { formatYMD } from "@/utils/dateFormatter";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useDeletePost } from "@/hooks/bbs/useDeletePost";
import useModal from "@/hooks/modal/useModal";
import ActionTools from "@/components/modal/actionTools";
import CommentSection from "@/components/post/commentSection";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  post: PostType;
  viewport: string;
};

const Post = ({ post, viewport }: Props) => {
  const router = useRouter();

  const { openModal } = useModal();

  const [content, setContent] = useState<any>(null);
  const [openActionTools, setOpenActionTools] = useState<boolean>(false);

  const { data: userMe } = useGetUserQuery();

  const deletePostMutation = useDeletePost(post);

  useEffect(() => {
    const parser = new DOMParser();
    const contentHTML = parser.parseFromString(post.content, "text/html").body.innerHTML;

    setContent(contentHTML);
  }, [post.content, router.asPath]);

  const handleClickTools = (e: any) => {
    e.stopPropagation();
    setOpenActionTools((prev: boolean) => !prev);
  };

  const handleEditPost = () => {
    router.push(`/bbs/${post.mainCategory}/post/editPost/${post._id}`);
  };

  const handleDeletePost = () => {
    openModal("confirm", "게시글을 삭제하시겠습니까?", () => { deletePostMutation.mutate(); });
  };

  const handleClickNeighborPost = (post_id: string) => {
    router.push(`/bbs/${post.mainCategory}/post/${post_id}`);
  };
  
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <p className={styles["header__title"]}>{post.title}</p>
        <div className={styles["header__information"]}>
          <div className={styles["information__writing"]}>
            <div className={styles["writer-wrapper"]}>
              <span className={styles["writer"]}>작성자</span>
              <span className={styles["writer-value"]}>{post.writer.nickname}</span>
            </div>
            <div className={styles["creating__wrapper"]}>
              <span className={styles["created-at"]}>작성일</span>
              <span className={styles["created-at-value"]}>
                {formatYMD(post.createdAt)}
              </span>
            </div>
            {viewport !== "mobile" && (
                <div className={styles["division-wrapper"]}>
                  <span className={styles["division"]}>분류</span>
                  <span className={styles["division-value"]}>{post.subCategory}</span>
                </div>
              )}
          </div>
          <div className={styles["state-wrapper"]}>
            <div
              onClick={(e) => { handleClickTools(e); }}
              className={styles["tool-box"]}
            >
              {post.writer._id === userMe?._id && (
                <div className={styles["tool"]}>
                  <HiOutlineDotsVertical size={15} />
                  {openActionTools && (
                    <>
                      <ActionTools
                        setOpenActionTools={setOpenActionTools}
                        handleClickEdit={handleEditPost}
                        handleClickDelete={handleDeletePost}
                      />
                      <ModalContainer />
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles["state-box"]}>
              <span className={styles["views"]}>조회수</span>
              <span className={styles["views-value"]}>{post.views}</span>
              {viewport !== "mobile" && (
                <>
                  <span className={styles["recommend"]}>추천</span>
                  <span className={styles["recommend-value"]}>
                    {post.recommend.length}
                  </span>
                </>
              )}
              {post.mainCategory !== "notice" && (
                <>
                  <span className={styles["comment"]}>댓글</span>
                  <span className={styles["comment-value"]}>
                    {post.commentList.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className={styles["content"]}></div>
      <CommentSection post={post} viewport={viewport} />
      <div className={styles["neighbor"]}>
        {post.nextPost && (
          <div
            onClick={() => {handleClickNeighborPost(post.nextPost._id); }}
            className={styles["next-post-box"]}
          >
            <span className={styles["next-post"]}>다음글</span>
            <span className={styles["next-link"]}>
              {post.nextPost.title}
            </span>
          </div>
        )}
        {post.previousPost && (
          <div
            onClick={() => {handleClickNeighborPost(post.previousPost._id); }}
            className={styles["previous-post-box"]}
          >
            <span className={styles["previous-post"]}>이전글</span>
            <span className={styles["previous-link"]}>
              {post.previousPost.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
