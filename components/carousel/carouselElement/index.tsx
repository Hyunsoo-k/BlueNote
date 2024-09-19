import { useRouter } from "next/router";
import { forwardRef, useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  carouselElement: any;
  index: number;
}

const CarouselElement = forwardRef(({ carouselElement, index }: Props) => {
  const router = useRouter();
  const [textContent, setTextContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(carouselElement.content, "text/html");
    const imageList = textHtml.querySelector("img");
    setImageUrl(imageList && imageList.getAttribute("src"));
    const extractedText = textHtml.body.textContent || "";
    setTextContent(extractedText);
  }, []);

  return (
    <div
      key={index}
      onClick={() => router.push(`/bbs/${carouselElement.mainCategory}/post/${carouselElement._id}`)}
      className={styles["carousel-element"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
      }}
    >
      <div className={styles["carousel-element__explantion"]}>
        <p className={styles["carousel-element__category"]}>{carouselElement.category}</p>
        <p className={styles["carousel-element__title"]}>{carouselElement.title}</p>
        <div className={styles["carousel-element__content-wrapper"]}>
          <p className={styles["carousel-element__content"]}>{textContent}</p>
        </div>
      </div>
    </div>
  );
});

export default CarouselElement;
