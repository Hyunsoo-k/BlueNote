import { LuConstruction } from "react-icons/lu";

import { useGetViewport } from "@/hooks/viewport";
import MyPageMenu from "@/components/myPage/myPageMenu";

import styles from "./index.module.scss";

const SchedulePage = () => {
  const viewport = useGetViewport();

  return (
    <div className={styles["schedule-page"]}>
      {viewport !== "mobile" && <MyPageMenu currentPage="내 일정" />}
      <div className={styles["schedule-page__content"]}>
        <h1 className={styles["schedule-page__title"]}>내 스케줄</h1>
        <div className={styles["schedule__shcedule"]}>
          <LuConstruction size={200} color="rgb(11, 66, 122)" />
          <p className={styles["explantion"]}>준비중 입니다</p>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
