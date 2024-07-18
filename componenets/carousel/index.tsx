import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import { CarouselProps } from "@/types/carousel";
import { dummyCarouselData } from "@/dummy-data/carousel";
import styles from "./index.module.scss";

const Carousel = ({ viewPort }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: viewPort === "mobile" ? currentIndex * 280 : currentIndex * 300,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className={styles["carousel"]}>
      <div ref={carouselRef} className={styles["carousel-box"]}>
        {dummyCarouselData.map((item, index) => (
          <div
            key={index}
            className={styles["carousel-box__element"]}
            style={{
              backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${item.imgSrc})`,
            }}
          >
            <div className={styles["carousel-box__element__explantion"]}>
              <p className={styles["carousel-box__element__explantion__category"]}>{item.category}</p>
              <p className={styles["carousel-box__element__explantion__title"]}>{item.title}</p>
              <div className={styles["carousel-box__element__explantion__text-box"]}>
                <p className={styles["carousel-box__element__explantion__text-box__text"]}>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["carousel-circle"]}>
        {Array.from({ length: 4 }).map((_, index) =>
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
