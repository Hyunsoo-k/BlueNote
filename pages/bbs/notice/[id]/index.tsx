import BbsHeader from "@/componenets/bbs/bbs-header";
import styles from "./index.module.scss";
import BoardPost from "@/componenets/bbs/board-post";

const NoticePage = () => {
  return (
    <div className={styles["notice-post-page"]}>
      <BbsHeader main="Notice" sub={["All"]} />
      <BoardPost />
    </div>
  );
};

export default NoticePage;
