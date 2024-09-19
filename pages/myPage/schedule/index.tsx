import { TbMoodSadSquint } from "react-icons/tb";

import MyPageMenu from "@/components/myPageMenu";

import styles from "./index.module.scss";

const SchedulePage = () => {
  return (
    <div className={styles["schedule-page"]}>
      <MyPageMenu currentPage="내 일정" />
      <div className={styles["schedule-page__content"]}>
        <h1 className={styles["schedule-page__title"]}>내 스케줄</h1>
        <div className={styles["schedule__shcedule"]}>
          <TbMoodSadSquint size={300} color="rgb(48, 140, 204)" />
          <p>준비중 입니다</p>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
