import React, { useContext } from "react";

import { ViewportContext } from "@/contexts/viewport";
import { notice, news } from "@/dummyData/mainPageSection";
import Carousel from "@/components/carousel";
import MainPageSection from "@/components/mainPageSection";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  const { viewPort, setViewPort } = useContext(ViewportContext);

  return (
    <div className={styles["wrapper"]}>
      <Carousel viewPort={viewPort} />
      <div className={styles["section-wrapper"]}>
        <MainPageSection viewPort={viewPort} category="Notice" detail="공지" data={notice} />
        <MainPageSection viewPort={viewPort} category="News" detail="국내" data={news} />
        <MainPageSection viewPort={viewPort} category="Board" detail="자유게시판" data={notice} />
        <MainPageSection viewPort={viewPort} category="Promote" detail="밴드홍보" data={news} />
        <MainPageSection viewPort={viewPort} category="Job" detail="구인" data={notice} />
      </div>
    </div>
  );
}
