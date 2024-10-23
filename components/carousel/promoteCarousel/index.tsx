import { useState, useRef, useEffect} from "react";

import Thumbnail from "@/components/thumbnailList/thumbnail";

import styles from "./index.module.scss";

const PromoteCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

  }, [])
  return (<div ref={carouselRef} className={styles["promote-carousel"]}></div>)
}

export default PromoteCarousel;