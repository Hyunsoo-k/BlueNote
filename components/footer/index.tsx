import Link from "next/link";
import { PiVinylRecordFill } from "react-icons/pi";

import styles from "./index.module.scss";
import { useContext } from "react";
import { ViewportContext } from "@/contexts/viewport";

const Footer = () => {
  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";

  if (viewport === "mobile") {
    return null;
  };

  return (
    <div className={styles["footer"]}>
      <ul className={styles["footer__top-section"]}>
        <Link legacyBehavior href="/bbs/notice/post/66e65b85fa891a34cce9e597">
          <a className={styles["footer__link"]}>사이트소개</a>
        </Link>
        <Link legacyBehavior href="/bbs/notice/post/66e67196f678427838a46aa8">
          <a className={styles["footer__link"]}>이용안내</a>
        </Link>
        <Link legacyBehavior href="/bbs/notice">
          <a className={styles["footer__link"]}>공지사항</a>
        </Link>
        <Link legacyBehavior href="/bbs/notice/post/66e672b8f678427838a46ac4">
          <a className={styles["footer__link"]}>고객문의</a>
        </Link>
      </ul>
      <div className={styles["footer__bottom-section"]}>
        <p className={styles["footer__title"]}>
          BLUE NOTE
          <span>
            <PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} />
          </span>
        </p>
        <p className={styles["footer__copyright"]}>Copyright ⓒ BlueNote. All rights reservied.</p>
      </div>
    </div>
  );
};

export default Footer;
