import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const JobCreatePostPage = () => {
  return (
    <div className={styles["job-post-wrtie-page"]}>
      <CreatePost mainCategory="job" />
    </div>
  );
};

export default JobCreatePostPage;
