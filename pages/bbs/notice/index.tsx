import React, { useState, useEffect } from "react";

import BbsHeader from "@/componenets/bbs/bbs-header";
import Board from "@/componenets/bbs/board";
import styles from "./index.module.scss";

const NoticePage = () => {
  return (
    <div className={styles["notice-page"]}>
      <BbsHeader main="Notice" sub={["All"]} postCount={15} currentPage={2} />
      <Board />
    </div>
  );
};

export default NoticePage;
