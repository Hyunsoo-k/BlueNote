import Pagination from "@/componenets/pagination";
import styles from "./index.module.scss";

interface BoardProps {
  
}

const Board = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className={styles["board"]}>
      <div className={styles["board__category"]}>
        <p className={styles["board__category__element"]}>ID</p>
        <p className={styles["board__category__element"]}>구분</p>
        <p className={styles["board__category__element"]}>제목</p>
        <p className={styles["board__category__element"]}>작성자</p>
        <p className={styles["board__category__element"]}>작성일</p>
        <p className={styles["board__category__element"]}>조회수</p>
        <p className={styles["board__category__element"]}>추천</p>
      </div>
      {items.map((item: number, index: number) => (
        <div className={styles["board__content"]} key={index}>
          <p className={styles["board__content__element"]}>{index}</p>
          <p className={styles["board__content__element"]}>공지</p>
          <p className={styles["board__content__element"]}>About "BLUE NOTE"</p>
          <p className={styles["board__content__element"]}>운영자</p>
          <p className={styles["board__content__element"]}>6 / 22</p>
          <p className={styles["board__content__element"]}>100</p>
          <p className={styles["board__content__element"]}>0</p>
        </div>
      ))}
      <Pagination category={["제목", "내용", "작성자"]}/>
    </div>
  );
};

export default Board;
