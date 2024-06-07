import styles from "./index.module.scss";

const NavbarDropdown = ({ item }: any) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["item-wrapper"]}>
        {item.map((item: any, index: number) => (
          <p key={index} className={styles["item"]}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavbarDropdown;
