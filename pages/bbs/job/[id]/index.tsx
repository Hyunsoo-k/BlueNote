import BbsHeader from "@/componenets/bbs/bbs-header";
import styles from "./index.module.scss";
import BoardPost from "@/componenets/bbs/board-post";

const JobPostPage = () => {
  return (
    <div className={styles["job-post-page"]}>
      <BbsHeader main="Job" sub={["구인", "구직", "All"]} />
      <BoardPost />
    </div>
  );
};

export default JobPostPage;
