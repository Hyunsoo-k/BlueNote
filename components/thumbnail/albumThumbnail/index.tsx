import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "./index.module.scss";

interface Props {
  element: any;
  index: number;
};

const AlbumThumbnail = ({ element, index }: Props) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const textHtml = parser.parseFromString(element.content, "text/html");
    const imageList = textHtml.querySelector("img");
    setImageUrl(imageList && imageList.getAttribute("src"));
  }, []);

  const handleClickThumbnail = () => {
    router.push(`/bbs/${element.mainCategory}/post/${element._id}`);
  };

  return (
    <div
      onClick={handleClickThumbnail}
      className={styles["container"]}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
      }}
    >
    </div>
  );
};

export default AlbumThumbnail;
