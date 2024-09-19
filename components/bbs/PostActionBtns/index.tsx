import { useRouter } from "next/router";

import { Post } from "@/types/post";
import { useDeletePost } from "@/hooks/bbs/useDeletePost";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  post: Post;
}

const PostActionBtns = ({ post }: Props) => {
  const router = useRouter();
  const deletePostMutation = useDeletePost(post);
  console.log(post);

  const { openModal } = useModal();

  const editPost = () => {
    router.push(`/bbs/${post.mainCategory}/post/editPost/${post._id}`);
  };

  const deletePost = () => {
    openModal("confirm", "게시글을 삭제하시겠습니까?", () => deletePostMutation.mutate());
  };

  return (
    <div className={styles["post-action-btn"]}>
      <button onClick={editPost} className={styles["post-action-btn__edit"]}>수정</button>
      <button onClick={deletePost} className={styles["post-action-btn__delete"]}>삭제</button>
    </div>
  );  
};

export default PostActionBtns;
