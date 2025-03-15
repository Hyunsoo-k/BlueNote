import { useGetViewport } from "@/hooks/viewport";
import EditPost from "@/components/post/editPost";

import styles from "./index.module.scss";

interface Props {
  post: any;
};

const EditPostPageLayout = ({ post }: Props) => {
  const viewport = useGetViewport();

  return (
    <div className={styles["compoenents"]}>
      <EditPost
        post={post}
        viewport={viewport}
      />
    </div>
  );
};

export default EditPostPageLayout;