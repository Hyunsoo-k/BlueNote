import React, { useState, useEffect } from "react";

import Carousel from "@/componenets/carousel";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [viewPort, setViewPort] = useState<any>("");

  useEffect(() => {
    const handleResizing = () => {
      if (window.innerWidth < 768) {
        setViewPort("mobile");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1025) {
        setViewPort("tablet");
      } else if (window.innerWidth >= 1025) {
        setViewPort("desktop");
      }
    };

    window.addEventListener("resize", handleResizing);
    handleResizing();

    return () => {
      window.removeEventListener("resize", handleResizing);
    }
  });
  return (
    <div className={styles["wrapper"]}>
      <Carousel viewPort={viewPort} />
    </div>
  );
}
