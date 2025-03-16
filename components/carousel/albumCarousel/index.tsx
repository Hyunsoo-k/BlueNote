import { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { MainPagePostType } from "@/types/post/mainPagePost";
import AlbumThumbnail from "@/components/thumbnail/albumThumbnail";

import styles from "./index.module.scss";

interface Props {
  mainPagePostList: MainPagePostType[];
};

interface cetnerElementTitleType {
  visible: boolean;
  title: string | any; // any 수정 필요
};

const AlbumCarousel = ({ mainPagePostList }: Props) => {
  console.log(mainPagePostList)
  const [elementIndex, setElementIndex] = useState<number[]>([2, 3, 4, 0, 1]);
  const [centerElementTitle, setCenterElementTitle] = useState<cetnerElementTitleType>({
    visible: true,
    title: mainPagePostList[0].title,
  });
  const [hoveredArrow, setHoveredArrow] = useState<"back" | "front" | null>(null);

  useEffect(() => {
    const centereElement = document.querySelector(`.${styles["element-wrapper"]} [class*="element__2"]`);
      
    setTimeout(() => {
      setCenterElementTitle((prev) => ({ ...prev, visible: false }));
    }, 300)

    setTimeout(() => {
      setCenterElementTitle((prev: cetnerElementTitleType) => ({
        ...prev,
        visible: true,
        title: centereElement?.getAttribute("data-title")
      }));
    }, 600)
  }, [elementIndex]);

  const rotateElements = (direction: "backward" | "forward"): void => {
    setElementIndex((prev) => {
      const newOrder =
        direction === "backward"
          ? [prev[1], prev[2], prev[3], prev[4], prev[0]]
          : [prev[4], prev[0], prev[1], prev[2], prev[3]];

      return newOrder;
    });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["element-wrapper"]}>
        {mainPagePostList.slice(0, 5).map((post: MainPagePostType, index: number) => (
          <div
            key={post._id}
            data-title={post.title}
            className={`${styles["element"]} ${styles[`element__${elementIndex[index]}`]}`}
          >
            <AlbumThumbnail post={post} />
          </div>
        ))}
      </div>
      <div className={styles["control-box"]}>
        <div
          onMouseEnter={() => { setHoveredArrow("back"); }}
          onMouseLeave={() => { setHoveredArrow(null); }}
          onClick={() => { rotateElements("backward"); }}
          className={styles["arrow-wrapper"]}
        >
          <SlArrowLeft
            size={23}
            color={hoveredArrow === "back" ? "#fff" : "#2C2C2C"}
          />
        </div>
        <div
          onMouseEnter={() => { setHoveredArrow("front"); }}
          onMouseLeave={() => { setHoveredArrow(null); }}
          onClick={() => { rotateElements("forward"); }}
          className={styles["arrow-wrapper"]}
        >
          <SlArrowRight
            size={23}
            color={hoveredArrow === "front" ? "#fff" : "#2C2C2C"}
          />
        </div>
      </div>
      <div className={styles["title-wrapper"]}>
        <p className={`${styles["title"]} ${ centerElementTitle.visible ? "" : styles["title--hidden"]}`}>
          {centerElementTitle.title}
        </p>
      </div>
    </div>
  );
};

export default AlbumCarousel;
