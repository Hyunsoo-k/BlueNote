import { useRouter } from "next/router";
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbUpFill } from "react-icons/ri";

import { Post } from "@/types/post";
import { useRecommendPost } from "@/hooks/bbs/useRecommend";
import { useDeletePost } from "@/hooks/bbs/useDeletePost";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  post: Post;
  userMe_id: string;
}

const PostActionButton = ({ post, userMe_id }: Props) => {
  const router = useRouter();

  const recommendPostMutation = useRecommendPost(post.mainCategory, post._id);
  const deletePostMutation = useDeletePost(post);

  const recommendPost = () => {
    recommendPostMutation.mutate();
  };

  const { openModal } = useModal();

  const editPost = () => {
    router.push(`/bbs/${post.mainCategory}/post/editPost/${post._id}`);
  };

  const deletePost = () => {
    openModal("confirm", "게시글을 삭제하시겠습니까?", () => deletePostMutation.mutate());
  };

  return (
    <div className={styles["post-action-button"]}>
      <button type="button" onClick={() => recommendPost()} className={styles["bbs-post__recommend-button"]}>
        추천
        <span
          className={styles["post-action-button__recomment-count"]}
          style={post.recommend.length === 0 ? { color: "rgb(138, 131, 131)" } : {}}
        >
          {post.recommend.length}
        </span>
        {post.recommend.includes(userMe_id) ? (
          <RiThumbUpFill size={25} color="rgb(48, 140, 204)" />
        ) : (
          <RiThumbUpLine size={25} />
        )}
      </button>
      {userMe_id === post.writer._id && (
        <div className={styles["post-action-button__management"]}>
          <button onClick={editPost} className={styles["post-action-button__edit"]}>
            수정
          </button>
          <button onClick={deletePost} className={styles["post-action-button__delete"]}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActionButton;
