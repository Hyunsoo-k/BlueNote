import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import CarouselElement from "./carouselElement";

import styles from "./index.module.scss";

interface Props {
  carouselList: any;
}

const Carousel = ({ carouselList }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselWrapper = carouselWrapperRef.current;
  
    if (!carouselWrapper) return;
  
    const totalElements = carouselList.length;
    const gap = 20;
    const elementWidth = carouselWrapper.firstChild?.getBoundingClientRect().width || 0;
  
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (carouselWrapper) {
          if (newIndex < totalElements - 3) {
            carouselWrapper.scrollTo({
              left: Math.round((elementWidth + gap) * newIndex),
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
  }, [carouselList]);
  

  return (
    <div className={styles["carousel"]}>
      <div ref={carouselWrapperRef} className={styles["carousel__element-wrapper"]}>
        {carouselList.map((carouselElement: any, index: number) => (
          <CarouselElement carouselElement={carouselElement} index={index} />
        ))}
      </div>
      <div className={styles["carousel-dots"]}>
        {Array.from({ length: carouselList.length - 3 }).map((_, index) =>
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
