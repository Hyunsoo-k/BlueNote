import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";

const PromoteCreatePostPage = () => {
  return (
    <div className={styles["promote-create-post-page"]}>
      <CreatePost mainCategory="promote" />
    </div>
  );
};

export default PromoteCreatePostPage;
