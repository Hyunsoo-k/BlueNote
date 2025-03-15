import { useRouter } from "next/router";

import { MainPagePostType } from "@/types/mainPagePost";

import styles from "./index.module.scss";

interface Props {
  post: MainPagePostType;
};

const AlbumThumbnail = ({ post }: Props) => {
  const router = useRouter();

  const handleClickThumbnail = () => {
    router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
  };

  return (
    <div
      onClick={handleClickThumbnail}
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${post.thumbnailSrc})`,
      }}
    >
    </div>
  );
};

export default AlbumThumbnail;
