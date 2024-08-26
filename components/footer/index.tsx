import { PiVinylRecordFill } from "react-icons/pi";

import styles from "./index.module.scss";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__top-section"]}>
        <p>사이트소개</p>
        <p>이용안내</p>
        <p>공지사항</p>
        <p>고객문의</p>
      </div>
      <div className={styles["footer__bottom-section"]}>
        <p>BLUE NOTE<span><PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} /></span></p>
        <p>Copyright ⓒ BlueNote. All rights reservied.</p>
      </div>
    </div>
  );
};

export default Footer;
