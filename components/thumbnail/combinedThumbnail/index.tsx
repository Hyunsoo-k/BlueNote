import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
}

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
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
      }}
    >
      <div className={styles["explantion"]}>
        <p id="explantion__title" className={styles["explantion__title"]}>{element.title}</p>
        <p className={styles["explantion__content"]}>{textContent}</p>
      </div>
    </div>
  );
};

export default CombinedThumbnail;
