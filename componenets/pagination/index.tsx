import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";

import styles from "./index.module.scss";

interface PaginationProps {
  category: string[];
}

const Pagination = ({ category }: PaginationProps) => {
  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__pages"]}>
        <p className={styles["pagination__pages__element"]}>1</p>
        <p className={styles["pagination__pages__element"]}>2</p>
        <p className={styles["pagination__pages__element"]}>3</p>
        <p className={styles["pagination__pages__element"]}>4</p>
        <p className={styles["pagination__pages__element"]}>5</p>
        <p className={styles["pagination__pages__element"]}>6</p>
        <p className={styles["pagination__pages__element"]}>7</p>
        <p className={styles["pagination__pages__element"]}>8</p>
        <p className={styles["pagination__pages__element"]}>9</p>
        <p className={styles["pagination__pages__element"]}>10</p>
      </div>
      <RiArrowLeftWideFill
        size={25}
        color="black"
        style={{ position: "absolute", left: "-50px", top: "0", cursor: "pointer" }}
      />
      <RiArrowRightWideFill
        size={25}
        color="black"
        style={{ position: "absolute", right: "-50px", top: "0", cursor: "pointer" }}
      />
      <div className={styles["pagination__search"]}>
        <select className={styles["pagination__search__select"]}>
          {category.map((item: string, index: number) => (
            <option key={index} style={{borderRadius: "0px"}}>{item}</option>
          ))}
        </select>
        <input className={styles["pagination__search__input"]}></input>
        <button className={styles["pagination__search__btn"]}>검색</button>
      </div>
    </div>
  );
};

export default Pagination;
