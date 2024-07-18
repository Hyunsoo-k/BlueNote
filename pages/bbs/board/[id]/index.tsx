import BbsHeader from "@/componenets/bbs/bbs-header";
import styles from "./index.module.scss";
import BoardPost from "@/componenets/bbs/board-post";

const BoardPostPage = () => {
  return (
    <div className={styles["board-post-page"]}>
      <BbsHeader main="Board" sub={["일반", "녹음", "팁"]} />
      <BoardPost />
    </div>
  );
};

export default BoardPostPage;
