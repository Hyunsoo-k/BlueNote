import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const JobCreatePostPage = () => {
  return (
    <div className={styles["job-create-post-page"]}>
      <CreatePost mainCategory="job" />
    </div>
  );
};

export default JobCreatePostPage;
