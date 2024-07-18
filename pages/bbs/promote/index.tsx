import BbsHeader from "@/componenets/bbs/bbs-header";
import Thumbnail from "@/componenets/thumbnail";
import Pagination from "@/componenets/pagination";
import styles from "./index.module.scss";

const PromotePage = () => {
  return (
    <div className={styles["wrapper"]}>
      <BbsHeader main="Promote" sub={["밴드홍보", "앨범홍보", "재즈바홍보", "All"]} postCount={20} />
      <Thumbnail />
      <Pagination category={["밴드홍보", "앨범홍보", "재즈바홍보"]} />
    </div>
  );
};

export default PromotePage;
