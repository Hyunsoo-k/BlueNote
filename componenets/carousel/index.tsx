import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaRegCircle, FaCircle } from "react-icons/fa";

import { dummyCarouselData } from "@/dummy-data/carousel";
import styles from "./index.module.scss";

const Carousel = ({ viewPort }: any) => {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: viewPort === "mobile" ? currentIndex * 280 : currentIndex * 300,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className={styles["wrapper"]}>
      <div ref={carouselRef} className={styles["carousel-wrapper"]}>
        {dummyCarouselData.map((item, index) => (
          <div key={index} className={styles["item"]}>
            <div className={styles["item__image"]}>
              <Image src={item.imgSrc} alt="" fill style={{ borderRadius: "5px 5px 0 0" }} />
            </div>
            <div className={styles["item__explantion"]}>
              <p className={styles["item__explantion__category"]}>{item.category}</p>
              <p className={styles["item__explantion__title"]}>{item.title}</p>
              <div className={styles["item__explantion__text-box"]}>
                <p className={styles["item__explantion__text-box__text"]}>{item.text}</p>
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
