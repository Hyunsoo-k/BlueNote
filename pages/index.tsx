import React, { useState, useEffect } from "react";

import { notice, news, board, promote, job } from "@/dummy-data/mainpage-section-dummydata";
import Carousel from "@/componenets/carousel";
import NoticeSection from "@/componenets/noticeSection";
import MainPageSection from "@/componenets/mainpage-section";
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
    };
  });
  return (
    <div className={styles["wrapper"]}>
      <Carousel viewPort={viewPort} />
      <div className={styles["section-wrapper"]}>
        <div className={styles["section"]}>
          <MainPageSection viewPort={viewPort} category="Notice" detail="공지" data={notice} />
          <MainPageSection viewPort={viewPort} category="News" detail="국내" data={news} />
        </div>
        <div className={styles["section"]}>
          <MainPageSection viewPort={viewPort} category="Board" detail="자유게시판" data={notice} />
          <MainPageSection viewPort={viewPort} category="Promote" detail="밴드홍보" data={news} />
        </div>
      </div>
    </div>
  );
}
