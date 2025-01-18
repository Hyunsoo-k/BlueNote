import React, { useState, useEffect, useContext, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import { ViewportContext } from "@/contexts/viewport";
import CombinedThumbnail from "../thumbnail/combinedThumbnail";
import DetachedThumbnail from "../thumbnail/detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  elementList: any;
  elementType: "combined" | "detached";
};

const Carousel = ({ elementList, elementType }: Props) => {
  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselWrapper = carouselWrapperRef.current;

    if (!carouselWrapper) return;

    const totalElements = elementList.length;

    const gap = viewport && typeof viewport === "string" && viewport === "mobile" ? 0 : 20;

    const elementWidth =
      carouselWrapper.firstChild instanceof HTMLElement ? carouselWrapper.firstChild.getBoundingClientRect().width : 0;

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
  }, [elementList, viewport]);

  return (
    <div className={styles["carousel"]}>
      <div ref={carouselWrapperRef} className={styles["carousel__element-wrapper"]}>
        {elementList.map((element: any, index: number) =>
          elementType === "combined" ? (
            <div key={index} className={styles["carousel__element"]}>
              <CombinedThumbnail element={element} />
            </div>
          ) : (
            <div key={index} className={styles["carousel__element"]}>
              <DetachedThumbnail element={element} />
            </div>
          )
        )}
      </div>
      <div className={styles["carousel-dots"]}>
        {Array.from({ length: elementList.length - 3 }).map((_, index) =>
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
