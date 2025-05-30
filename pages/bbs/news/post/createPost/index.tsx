import CreatePostLayout from "@/components/layout/createPostPageLayout";

import styles from "./index.module.scss";

const NewsCreatePostPage = () => {
  return (
    <div className={styles["container"]}>
      <CreatePostLayout mainCategory="news"/>
    </div>
  );
};

export default NewsCreatePostPage;
