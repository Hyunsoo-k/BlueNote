import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  post: any;
  key: number;
}

const Thumbnail = ({ post, key }: Props) => {
  const router = useRouter();
  const [textContent, setTextContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string| null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(post.content, "text/html");
    const imageList = textHtml.querySelector("img");
    setImageUrl(imageList && imageList.getAttribute("src"));
    const extractedText = textHtml.body.textContent || "";
    setTextContent(extractedText);
  }, [])

  return (
    <div
          key={key}
          onClick={() => {
            router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
          }}
          className={styles["thumbnail"]}
        >
          <div
            className={styles["thumbnail__bg"]}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${imageUrl || "/images/no-image.png"})`,
            }}
          >
            <p className={styles["thumbnail__info"]}>
              <span>{post.subCategory}</span> | {post.createdAt.split("T")[0]}
            </p>
          </div>
          <div className={styles["thumbnail__description"]}>
            <p className={styles["thumbnail__title"]}>{post.title}</p>
            <p className={styles["thumbnail__content"]}>{textContent}</p>
          </div>
        </div>
  )
}

export default Thumbnail;