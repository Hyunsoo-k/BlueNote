import { useRouter } from "next/router";

import styles from "./index.module.scss";

interface Props {
  element: any;
  hideTextOverlay?: boolean;
};

const DetachedThumbnail = ({ element, hideTextOverlay }: Props) => {
  const router = useRouter();

  const handleClickThumbnail = () => {
    router.push(`/bbs/${element.mainCategory}/post/${element._id}`);
  };

  return (
    <div
      onClick={handleClickThumbnail}
      className={styles["detached-thumbnail"]}
    >
      <div
        className={styles["detached-thumbnail__back-ground"]}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${element.thumbnailSrc|| "/images/no-image.png"})`,
        }}
      >
        {!hideTextOverlay && (
          <p className={styles["detached-thumbnail__info"]}>
            <span>{element.subCategory}</span> | {element.createdAt.split("T")[0]}
          </p>
        )}
      </div>
      <div className={styles["detached-thumbnail__description"]}>
        <p className={styles["detached-thumbnail__title"]}>{element.title}</p>
        <p className={styles["detached-thumbnail__content"]}>{element.content}</p>
      </div>
    </div>
  );
};

export default DetachedThumbnail;
