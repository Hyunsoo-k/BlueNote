import { useRouter } from "next/router";
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbUpFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";

import { PostType } from "@/types/post";
import { Comment as CommentType } from "@/types/comment";
import { useGetUser } from "@/hooks/user/useGetUser";
import { useRecommendPost } from "@/hooks/bbs/useRecommend";
import Comment from "../comment";
import CreateComment from "../comment/createComment";
import useModal from "@/hooks/modal/useModal";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  post: PostType;
}

const CommentSection = ({ post }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();

  const { openModal, closeModal } = useModal();

  const recommendPostMutation = useRecommendPost(post.mainCategory, post._id);

  const handleRecommendPost = () => {
    if (!userMe) {
      return openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    }

    const requsetBody = { targetUrl: router.asPath };

    recommendPostMutation.mutate(requsetBody);
  };

  return (
    <div className={styles["comment-section"]}>
      <div className={styles["comment-section-header"]}>
        <button type="button" onClick={handleRecommendPost} className={styles["comment-section__post-recommend-count"]}>
          {post.recommend.includes(userMe?._id) ? (
            <RiThumbUpFill
              size={18}
              color="rgb(48, 140, 204)"
              style={{ position: "relative", top: "3px", marginRight: "5px" }}
            />
          ) : (
            <RiThumbUpLine size={18} style={{ position: "relative", top: "3px", marginRight: "5px" }} />
          )}
          추천 <span>{post.recommend.length}</span>
        </button>
        <p className={styles["comment-section__count"]}>
          <FaRegCommentDots size={18} color="black" style={{ position: "relative", top: "3px", marginRight: "5px" }} />
          댓글 <span>{post.commentList.length}</span>
        </p>
      </div>
      <div className={styles["comment__list"]}>
        {post.commentList.map((comment: CommentType, index: number) => (
          <Comment key={index} comment={comment} userMe={userMe} post={post} />
        ))}
      </div>
      <CreateComment post_id={post._id} />
      <ModalContainer />
    </div>
  );
};

export default CommentSection;
