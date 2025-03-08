import { useRouter } from "next/router";

import { PostType } from "@/types/post";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useDeletePost } from "@/hooks/bbs/useDeletePost";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  post: PostType;
};

const PostActionButton = ({ post }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUserQuery();

  const deletePostMutation = useDeletePost(post);

  const { openModal } = useModal();

  const editPost = () => {
    router.push(`/bbs/${post.mainCategory}/post/editPost/${post._id}`);
  };

  const deletePost = () => {
    openModal("confirm", "게시글을 삭제하시겠습니까?", () => deletePostMutation.mutate());
  };

  if (!userMe || userMe?._id !== post.writer._id) {
    return null;
  }

  return (
    <div className={styles["post-action-button"]}>
      <button onClick={editPost} className={styles["post-action-button__edit"]}>
        수정
      </button>
      <button onClick={deletePost} className={styles["post-action-button__delete"]}>
        삭제
      </button>
    </div>
  );
};

export default PostActionButton;
