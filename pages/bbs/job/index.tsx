import Board from "@/componenets/bbs/board";
import styles from "./index.module.scss";
import BbsHeader from "@/componenets/bbs/bbs-header";

const JobPage = () => {
  return (
    <div className={styles["wrapper"]}>
      <BbsHeader main="Job" sub={["구인", "구직", "All"]} postCount={20} />
      <Board />
    </div>
  );
};

export default JobPage;
