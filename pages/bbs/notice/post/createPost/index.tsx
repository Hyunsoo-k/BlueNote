import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const NoticeCreatePostPage = () => {
  return (
    <div className={styles["board-post-wrtie-page"]}>
      <CreatePost mainCategory="notice" />
    </div>
  );
};

export default NoticeCreatePostPage;
