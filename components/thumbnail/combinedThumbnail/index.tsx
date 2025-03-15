import { useRouter } from "next/router";

import styles from "./index.module.scss";

interface Props {
  element: any;
};

const CombinedThumbnail = ({ element }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/bbs/${element.mainCategory}/post/${element._id}`)}
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${element.thumbnailSrc || "/images/no-image.png"})`,
      }}
    >
      <div className={styles["explantion"]}>
        <p id="explantion__title" className={styles["explantion__title"]}>{element.title}</p>
        <p className={styles["explantion__content"]}>{element.content}</p>
      </div>
    </div>
  );
};

export default CombinedThumbnail;
