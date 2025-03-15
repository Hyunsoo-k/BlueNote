import { useGetViewport } from "@/hooks/viewport";

import CreatePost from "@/components/post/createPost";
import styles from "./index.module.scss";

const CreatePostLayout = () => {
  const viewport = useGetViewport();

  return (
    <div className={styles["componenet"]}>
      <CreatePost
        mainCategory="board"
        viewport={viewport}
      />
    </div>
  );
};

export default CreatePostLayout;