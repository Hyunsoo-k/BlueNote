import { useRouter } from "next/router";

import styles from "./index.module.scss";

interface Props {
  element: any;
};

const AlbumThumbnail = ({ element }: Props) => {
  const router = useRouter();

  const handleClickThumbnail = () => {
    router.push(`/bbs/${element.mainCategory}/post/${element._id}`);
  };

  return (
    <div
      onClick={handleClickThumbnail}
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${element.thumbnailSrc})`,
      }}
    >
    </div>
  );
};

export default AlbumThumbnail;
