import { PiVinylRecordFill } from "react-icons/pi";

import styles from "./index.module.scss";

const Footer = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["top-section"]}>
        <p className={styles["top-section__category"]}>사이트소개</p>
        <p className={styles["top-section__category"]}>이용안내</p>
        <p className={styles["top-section__category"]}>공지사항</p>
        <p className={styles["top-section__category"]}>고객문의</p>
      </div>
      <div className={styles["bottom-section"]}>
        <p className={styles["title"]}>
          BLUE NOTE
          <span>
            <PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} />
          </span>
        </p>
        <p className={styles["copyright"]}>Copyright ⓒ BlueNote. All rights reservied.</p>
      </div>
    </div>
  );
};

export default Footer;
