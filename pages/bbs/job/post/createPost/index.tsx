import CreatePostLayout from "@/components/layout/createPostPageLayout";

import styles from "./index.module.scss";

const JobCreatePostPage = () => {
  return (
    <div className={styles["container"]}>
      <CreatePostLayout mainCategory="job" />
    </div>
  );
};

export default JobCreatePostPage;
