import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
  key: number;
}

const Thumbnail = ({ element, key }: Props) => {
  console.log(element)
  const router = useRouter();
  const [textContent, setTextContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(element.content, "text/html");
    const imageTag = textHtml.querySelector("img");
    setImageUrl(imageTag && imageTag.getAttribute("src"));
    setTextContent(textHtml.body.textContent || "");
  }, []);

  return (
    <div
      key={key}
      onClick={() => {
        router.push(`/bbs/${element.mainCategory}/post/${element._id}`);
      }}
      className={styles["thumbnail"]}
    >
      {/* <div
        className={styles["thumbnail__bg"]}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${
            imageUrl || "/images/no-image.png"
          })`,
        }}
      >
        <p className={styles["thumbnail__info"]}>
          <span>{element.subCategory}</span> | {element.createdAt.split("T")[0]}
        </p>
      </div>
      <div className={styles["thumbnail__description"]}>
        <p className={styles["thumbnail__title"]}>{element.title}</p>
        <p className={styles["thumbnail__content"]}>{textContent}</p>
      </div> */}
    </div>
  );
};

export default Thumbnail;
