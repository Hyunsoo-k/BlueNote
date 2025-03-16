import { useRouter } from "next/router";
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbUpFill } from "react-icons/ri";
import { BiCommentDetail } from "react-icons/bi";

import { ViewportType } from "@/types/viewport/viewport";
import { PostType } from "@/types/post/post";
import { CommentType } from "@/types/comment/comment";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useRecommendPost } from "@/hooks/bbs/useRecommend";
import useModal from "@/hooks/modal/useModal";
import Comment from "@/components/comment/comment";
import CreateComment from "@/components/comment/createComment";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  post: PostType;
};

const CommentSection = ({ viewport, post }: Props) => {
  const router = useRouter();

  const { data: userMe }= useGetUserQuery();

  const { openModal, closeModal } = useModal();

  const useRecommendPostMutation = useRecommendPost(post.mainCategory, post._id);

  const handleRecommendPost = () => {
    if (!userMe) {
      return openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    };

    const requsetBody = { targetUrl: router.asPath };

    useRecommendPostMutation.mutate(requsetBody);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div onClick={handleRecommendPost} className={styles["recommend-count-box"]}>
          {post.recommend.includes(userMe?._id) ? (
            <RiThumbUpFill
              size={viewport === "mobile" ? 16 : 16}
              color="rgb(11, 66, 122)"
              style={{ position: "relative", top: "3px", marginRight: "4px" }}
            />
          ) : (
            <RiThumbUpLine
              size={viewport === "mobile" ? 16 : 16}
              color="#2C2C2C"
              style={{ position: "relative", top: "3px", marginRight: "4px" }}
            />
          )}
          <span className={styles["recommend-count"]}>추천</span>
          <span className={styles["recommend-count-value"]}>
            {post.recommend.length}
          </span>
        </div>
        <div className={styles["comment-count-box"]}>
          <BiCommentDetail
            size={viewport === "mobile" ? 16 : 16}
            color="#2C2C2C"
            style={{ position: "relative", top: "3px", marginRight: "4px" }}
          />
          <span className={styles["comment-count"]}>댓글</span>
          <span className={styles["comment-count-value"]}>
            {post.commentList.length}
          </span>
        </div>
      </div>
      <CreateComment
        post_id={post._id}
        userMe={userMe}
        viewport={viewport}
      />
      <div className={styles["comment-wrapper"]}>
        {post.commentList.map((comment: CommentType, index: number) => (
          <Comment
            key={index}
            comment={comment}
            userMe={userMe}
            post={post}
            viewport={viewport}
          />
        ))}
      </div>
      <ModalContainer />
    </div>
  );
};

export default CommentSection;
