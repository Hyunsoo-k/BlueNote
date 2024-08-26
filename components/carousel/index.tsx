import React, { useState, useEffect, useRef } from "react";
import { FaCircle } from "react-icons/fa";

import { dummyCarouselData } from "@/dummyData/carousel";

import styles from "./index.module.scss";

const Carousel = ({ viewPort }: any) => {
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
      <div ref={carouselRef} className={styles["carousel__element-wrapper"]}>
        {dummyCarouselData.map((item, index) => (
          <div
            key={index}
            className={styles["carousel__element"]}
            style={{
              backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${item.imgSrc})`,
            }}
          >
            <div className={styles["carousel__explantion"]}>
              <p className={styles["carousel__category"]}>{item.category}</p>
              <p className={styles["carousel__title"]}>{item.title}</p>
              <div className={styles["carousel__content-wrapper"]}>
                <p className={styles["carousel__content"]}>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["carousel-dots"]}>
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
