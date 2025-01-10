import CreatePostButton from "../createPostButton";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
  isMyPage: boolean;
  subCategory: any;
  page: number;
  totalPage: number;
};

const ActionBox = ({
  userMe,
  isMyPage,
  subCategory,
  page,
  totalPage
}: Props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["top-area"]}>
        <Pagination
          subCategory={subCategory || "All"}
          page={page || 1}
          totalPage={totalPage}
        />
        <CreatePostButton userMe={userMe} isMyPage={isMyPage} />
      </div>
      <SearchingBar />
    </div>
  );
};

export default ActionBox;