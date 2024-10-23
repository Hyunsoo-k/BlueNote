import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import CombinedThumbnail from "../combinedThumbnail";
import DetachedThumbnail from "../detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  elementList: any;
  elementType: "combined" | "detached";
}

const Carousel = ({ elementList, elementType }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselWrapper = carouselWrapperRef.current;

    if (!carouselWrapper) return;

    const totalElements = elementList.length;
    const gap = 20;
    const elementWidth = carouselWrapper.firstChild?.getBoundingClientRect().width || 0;

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
  }, [elementList]);

  return (
    <div className={styles["carousel"]}>
      <div ref={carouselWrapperRef} className={styles["carousel__element-wrapper"]}>
        {elementList.map((element: any, index: number) =>
          elementType === "combined" ? (
            <div className={styles["carousel__element"]}>
              <CombinedThumbnail element={element} index={index} />
            </div>
          ) : (
            <div className={styles["carousel__element"]}>
              <DetachedThumbnail element={element} index={index} />
            </div>
          )
        )}
      </div>
      <div className={styles["carousel-dots"]}>
        {Array.from({ length: elementList.length - 3 }).map((_, index) =>
          index === currentIndex ? (
            <FaCircle key={index} size={10} color="rgb(23, 23, 119)" />
          ) : (
            <FaCircle key={index} size={10} color="#308ccc" />
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
