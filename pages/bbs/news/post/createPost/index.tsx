import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const NewsCreatePostPage = () => {
  return (
    <div className={styles["news-create-post-page"]}>
      <CreatePost mainCategory="news" />
    </div>
  );
};

export default NewsCreatePostPage;
