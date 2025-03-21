import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import { MainPagePostType } from "@/types/post/mainPagePost";
import CombinedThumbnail from "@/components/thumbnail/combinedThumbnail";
import DetachedThumbnail from "@/components/thumbnail/detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  thumbnailType: "combined" | "detached";
  mainPagePostList: MainPagePostType[];
  viewport: string;
  isElementJazzBar: boolean;
};

const Carousel = ({
  thumbnailType,
  mainPagePostList,
  viewport,
  isElementJazzBar
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselWrapper = carouselWrapperRef.current;

    if (!carouselWrapper) return;

    const totalElements = mainPagePostList.length;

    const gap = viewport && typeof viewport === "string" && viewport === "mobile" ? 8 : 20;

    const elementWidth = carouselWrapper.firstChild instanceof HTMLElement
      ? carouselWrapper.firstChild.getBoundingClientRect().width
      : 0;

    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (carouselWrapper) {
          if (newIndex < totalElements - 3) {
            carouselWrapper.scrollTo({
              left: (elementWidth + gap) * newIndex,
              behavior: "smooth",
            });
          } else {
            carouselWrapper.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            return 0;
          }
        }
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(scrollInterval);
  }, [viewport]);

  return (
    <div className={styles["container"]}>
      <div ref={carouselWrapperRef} className={styles["element-wrapper"]}>
        {mainPagePostList.map((post: MainPagePostType, index: number) =>
          <div
            key={index}
            className={styles[`${isElementJazzBar ? "element--jazzbar" : "element"}`]}
          >
            {thumbnailType === "combined"
            ? <CombinedThumbnail post={post} />
            : <DetachedThumbnail post={post} />}
          </div>
        )}
      </div>
      <div className={styles["dot-box"]}>
        {Array.from({ length: mainPagePostList.length - 3 }).map((_, index) =>
          index === currentIndex ? (
            <FaCircle key={index} size={10} color="rgb(11, 66, 122)" />
          ) : (
            <FaCircle key={index} size={10} color="rgb(48, 140, 204)" />
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
