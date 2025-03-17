import CreatePostLayout from "@/components/layout/createPostPageLayout";

import styles from "./index.module.scss";

const PromoteCreatePostPage = () => {
  return (
    <div className={styles["container"]}>
      <CreatePostLayout mainCategory="promote" />
    </div>
  );
};

export default PromoteCreatePostPage;
