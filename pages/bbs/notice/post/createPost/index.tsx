import CreatePostLayout from "@/components/layout/createPostPageLayout";

import styles from "./index.module.scss";

const NoticeCreatePostPage = () => {
  return (
    <div className={styles["container"]}>
      <CreatePostLayout mainCategory="notice"  />
    </div>
  );
};

export default NoticeCreatePostPage;
