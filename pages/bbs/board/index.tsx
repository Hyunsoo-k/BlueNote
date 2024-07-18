import React, { useState } from "react";

import BbsHeader from "@/componenets/bbs/bbs-header";
import Board from "@/componenets/bbs/board";
import styles from "./index.module.scss";

const BoardPage = () => {
  return (
    <div className={styles["board-page"]}>
      <BbsHeader main="Board" sub={["일반", "녹음", "팁", "All"]} postCount={20} />
      <Board />
    </div>
  );
};

export default BoardPage;
