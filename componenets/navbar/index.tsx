import styles from "./index.module.scss";

const NavBar = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["list"]}>
        <p className={styles["list__item"]}>Notice</p>
        <p className={styles["list__item"]}>News</p>
        <p className={styles["list__item"]}>Board</p>
        <p className={styles["list__item"]}>Promote</p>
        <p className={styles["list__item"]}>Job</p>
      </div>
    </div>
  );
};

export default NavBar;
