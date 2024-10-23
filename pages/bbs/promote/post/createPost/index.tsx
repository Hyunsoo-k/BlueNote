import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const PromoteCreatePostPage = () => {
  return (
    <div className={styles["promote-post-wrtie-page"]}>
      <CreatePost mainCategory="promote" />
    </div>
  );
};

export default PromoteCreatePostPage;
