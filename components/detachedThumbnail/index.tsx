import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
};

const DetachedThumbnail = ({ element }: Props) => {
  const router = useRouter();
  const [textContent, setTextContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(element.content, "text/html");
    const imageTag = textHtml.querySelector("img");
    setImageUrl(imageTag && imageTag.getAttribute("src"));
    setTextContent(textHtml.body.textContent || "");
  }, [element]);

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${imageUrl || "/images/no-image.png"})`,
        }}
      >
        <p className={styles["detached-thumbnail__info"]}>
          <span>{element.subCategory}</span> | {element.createdAt.split("T")[0]}
        </p>
      </div>
      <div className={styles["detached-thumbnail__description"]}>
        <p className={styles["detached-thumbnail__title"]}>{element.title}</p>
        <p className={styles["detached-thumbnail__content"]}>{textContent}</p>
      </div>
    </div>
  );
};

export default DetachedThumbnail;
