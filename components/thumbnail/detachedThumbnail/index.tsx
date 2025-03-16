import { useRouter } from "next/router";

import { MainPagePostType } from "@/types/post/mainPagePost";

import styles from "./index.module.scss";

interface Props {
  post: MainPagePostType;
  hideTextOverlay?: boolean;
};

const DetachedThumbnail = ({ post, hideTextOverlay }: Props) => {
  const router = useRouter();

  const handleClickThumbnail = (): void => {
    router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
  };

  return (
    <div
      onClick={handleClickThumbnail}
      className={styles["detached-thumbnail"]}
    >
      <div
        className={styles["detached-thumbnail__back-ground"]}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${post.thumbnailSrc|| "/images/no-image.png"})`,
        }}
      >
        {!hideTextOverlay && (
          <p className={styles["detached-thumbnail__info"]}>
            <span>{post.subCategory}</span> | {post.createdAt.split("T")[0]}
          </p>
        )}
      </div>
      <div className={styles["detached-thumbnail__description"]}>
        <p className={styles["detached-thumbnail__title"]}>{post.title}</p>
        <p className={styles["detached-thumbnail__content"]}>{post.content}</p>
      </div>
    </div>
  );
};

export default DetachedThumbnail;
