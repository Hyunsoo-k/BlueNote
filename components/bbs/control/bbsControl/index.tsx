import CreatePostButton from "../createPostButton";
import Pagination from "@/components/bbs/control/pagination";
import SearchingBar from "@/components/bbs/control/searchingBar";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
  isMyPage: boolean;
  subCategory: any;
  page: number;
  totalPage: number;
}

const BbsControl = ({ userMe, isMyPage, subCategory, page, totalPage }: Props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["top-area"]}>
        <Pagination subCategory={subCategory || "All"} page={page || 1} totalPage={totalPage} />
        <CreatePostButton userMe={userMe} isMyPage={isMyPage} />
      </div>
      <SearchingBar />
    </div>
  );
};

export default BbsControl;
