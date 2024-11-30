import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
  key: number;
}

const CarouselElement = ({ element, key }: Props) => {
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

  const handleClickItem = () => {
    router.push(`/bbs/${element.mainCategory}/post/${element._id}`);
  };

  return (
    <div
      key={key}
      onClick={handleClickItem}
      className={styles["carousel-element"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
      }}
    >
      <div className={styles["carousel-element__explantion"]}>
        <p className={styles["carousel-element__category"]}>{element.category}</p>
        <p className={styles["carousel-element__title"]}>{element.title}</p>
        <div className={styles["carousel-element__content-wrapper"]}>
          <p className={styles["carousel-element__content"]}>{textContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselElement;
