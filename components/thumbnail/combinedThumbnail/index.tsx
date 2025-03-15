import { useRouter } from "next/router";

import { MainPagePostType } from "@/types/mainPagePost";

import styles from "./index.module.scss";

interface Props {
  post: MainPagePostType;
};

const CombinedThumbnail = ({ post }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/bbs/${post.mainCategory}/post/${post._id}`)}
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${post.thumbnailSrc || "/images/no-image.png"})`,
      }}
    >
      <div className={styles["explantion"]}>
        <p id="explantion__title" className={styles["explantion__title"]}>{post.title}</p>
        <p className={styles["explantion__content"]}>{post.content}</p>
      </div>
    </div>
  );
};

export default CombinedThumbnail;
