import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

const Footer = () => {
  const router = useRouter();

  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={styles["main__content-box"]}>
          <span className={styles["main__division-title"]}>사이트 소개</span>
            <ul className={styles["main__division-wrapper"]}>
              <li>
                <Link href="/bbs/notice/post/66e65b85fa891a34cce9e597" className={styles["main__division-element"]}>사이트 소개</Link>
              </li>
            </ul>
        </div>
        <div className={styles["main__content-box"]}>
          <span className={styles["main__division-title"]}>이용안내</span>
            <ul className={styles["main__division-wrapper"]}>
              <li>
                <Link href="" className={styles["main__division-element"]}>
                  이용 약관
                </Link>
              </li>
              <li>
                <Link
                  href="/bbs/notice/post/6784a9e2aee69bf6bfe33aaf"
                  className={styles["main__division-element"]}
                >
                  개인정보 보호
                </Link>
              </li>
              <li>
                <Link
                  href="/bbs/notice/post/6784a86caee69bf6bfe33aa6"
                  className={styles["main__division-element"]}
                >
                  책임한계 및 법적고지
                </Link>
              </li>
            </ul>
        </div>
        <div className={styles["main__content-box"]}>
          <Link href="/bbs/notice" className={styles["main__division-title"]}>공지사항</Link>
          <ul className={styles["main__division-wrapper"]}>
            <Link href="" className={styles["main__division-element"]}>최근 공지사항</Link>
          </ul>
        </div>
        <div className={styles["main__content-box"]}>
          <span className={styles["main__division-title"]}>고객문의</span>
            <ul className={styles["main__division-wrapper"]}>
              <li className={styles["main__division-element"]}>bluenote_email@naver.com</li>
            </ul>
        </div>
      </div>
      <div className={styles["bottom"]}>
        <p className={styles["bottom__copyright"]}>
          Copyright ⓒ BlueNote. All rights reservied.
        </p>
      </div>
    </div>
  );
};

export default Footer;
