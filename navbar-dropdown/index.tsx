import styles from "./index.module.scss";

const NavbarDropdown = ({ item }: any) => {
  return (
    <div className={styles["navbar-dropdown"]}>
      <div className={styles["navbar-dropdown__content"]}>
        {item.map((item: any, index: number) => (
          <p key={index} className={styles["navbar-dropdown__content__element"]}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavbarDropdown;
