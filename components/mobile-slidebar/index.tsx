import styles from "./index.module.scss";

const MobileSlidebar = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["btn-wrapper"]}>
        <small className={styles["login-btn"]}>Login</small>
        <small className={styles["signUp-btn"]}>Join</small>
      </div>
      <div className={styles["list"]}>
        <ul className={styles["category"]}>
          <li className={styles["category__title"]}>Notice</li>
          <li className={styles["category__item"]}>공지사항</li>
        </ul>
        <ul className={styles["category"]}>
          <li className={styles["category__title"]}>News</li>
          <li className={styles["category__item"]}>국내</li>
          <li className={styles["category__item"]}>국외</li>
        </ul>
        <ul className={styles["category"]}>
          <li className={styles["category__title"]}>Board</li>
          <li className={styles["category__item"]}>자유게시판</li>
          <li className={styles["category__item"]}>건의사항</li>
        </ul>
        <ul className={styles["category"]}>
          <li className={styles["category__title"]}>Promote</li>
          <li className={styles["category__item"]}>밴드 홍보</li>
          <li className={styles["category__item"]}>공연 홍보</li>
          <li className={styles["category__item"]}>재즈바 홍보</li>
        </ul>
        <ul className={styles["category"]}>
          <li className={styles["category__title"]}>Job</li>
          <li className={styles["category__item"]}>구인</li>
          <li className={styles["category__item"]}>구직</li>
        </ul>
      </div>
    </div>
  )
};

export default MobileSlidebar;
