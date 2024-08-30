import { Post as PostType} from "@/types/post";
import { MainCategory } from "@/types/categorys";
import { formatYMD } from "@/utils/dateFormatter";
import Comment from "../comment";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  post_id: string;
  post: PostType;
}

const Post = ({ mainCategory, post_id, post }: Props) => {
  const createdAt = formatYMD(post.createdAt);

  return (
    <div className={styles["board-post"]}>
      <div className={styles["board-post__header"]}>
        <p className={styles["board-post__title"]}>{post?.title}</p>
          <div className={styles["board-post__details"]}>
            <div className={styles["board-post__writing-info"]}>
              <p className={styles["board-post__writer"]}>작성자<span>{post.writer.nickname}</span></p>
              <p className={styles["board-post__created-at"]}>작성일<span>{createdAt}</span></p>
              <p className={styles["board-post__division"]}>분류<span>{post.subCategory}</span></p>
            </div>
            <div className={styles["board-post__state-info"]}>
              <p className={styles["board-post__views"]}>조회수 <span>{post.views}</span></p>
              <p className={styles["board-post__recommend"]}>추천<span>{post.recommend}</span></p>
              {mainCategory !== "notice" && (
                <p className={styles["board-post__comment"]}>댓글<span>{post.comment.length}</span></p>
              )}
            </div>
          </div>
        </div>
        <div className={styles["board-post__content"]}>
          {post.content}
        </div>
      <Comment mainCategory={mainCategory} post_id={post_id} post={post} />
    </div>
  );
};

export default Post;
