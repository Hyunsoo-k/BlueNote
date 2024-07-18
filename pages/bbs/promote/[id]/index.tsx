import BbsHeader from "@/componenets/bbs/bbs-header";
import styles from "./index.module.scss";
import BoardPost from "@/componenets/bbs/board-post";

const PromotePostPage = () => {
  return (
    <div className={styles["promote-post-page"]}>
      <BbsHeader main="Promote" sub={["밴드홍보", "앨범홍보", "재즈바홍보", "All"]} />
      <BoardPost />
    </div>
  );
};

export default PromotePostPage;
