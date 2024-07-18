import Reaect, { useState } from "react";
import { TfiArrowCircleDown } from "react-icons/tfi";

import BbsHeader from "@/componenets/bbs/bbs-header";
import Thumbnail from "@/componenets/thumbnail";
import styles from "./index.module.scss";

const NewsPage = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("main");

  const handleCurrentCategory = (e: any) => {
    switch (e.target.innerHTML) {
      case "main":
        setCurrentCategory("main");
        break;
      case "국내":
        setCurrentCategory("국내");
        break;
      case "국외":
        setCurrentCategory("국외");
        break;
    }
  };

  const imgSrc = [
    "/images/carousel/julian.jpg",
    "/images/carousel/jazzPic.jpg",
    "/images/carousel/playing-trumpet.png",
    "/images/carousel/seoul-jazz-festival.png",
    "/images/carousel/julian.jpg",
    "/images/carousel/jazzPic.jpg",
    "/images/carousel/playing-trumpet.png",
    "/images/carousel/seoul-jazz-festival.png",
    "/images/carousel/julian.jpg",
  ];

  return (
    <div className={styles["news-page"]}>
      <BbsHeader main="News" sub={["국내", "국외", "All"]} postCount={16} currentPage={2} />
      <Thumbnail />
      <div className={styles["show-more-btn"]}>
        <TfiArrowCircleDown size={50} color="#308ccc" style={{ position: "relative", top: "-43px", background: "#efebe9", borderRadius: "50%"}}/>
      </div>
    </div>
  );
};

export default NewsPage;
