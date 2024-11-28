import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
};

const CombinedThumbnail = ({ element }: Props) => {
  const router = useRouter();
  const [textContent, setTextContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(element.content, "text/html");
    const imageList = textHtml.querySelector("img");
    setImageUrl(imageList && imageList.getAttribute("src"));
    setTextContent(textHtml.body.textContent || "");
  }, []);

  return (
    <div
      onClick={() => router.push(`/bbs/${element.mainCategory}/post/${element._id}`)}
      className={styles["combined-thumbnail"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
      }}
    >
      <div className={styles["combined-thumbnail__explantion"]}>
        <p className={styles["combined-thumbnail__category"]}>{element.category}</p>
        <p className={styles["combined-thumbnail__title"]}>{element.title}</p>
        <div className={styles["combined-thumbnail__content-wrapper"]}>
          <p className={styles["combined-thumbnail__content"]}>{textContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CombinedThumbnail;
