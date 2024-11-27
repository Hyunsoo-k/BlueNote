import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const BoardCreatePostPage = () => {
  return (
    <div className={styles["board-create-post-page"]}>
      <CreatePost mainCategory="board" />
    </div>
  );
};

export default BoardCreatePostPage;
