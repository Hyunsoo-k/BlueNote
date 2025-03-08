import { useRouter } from "next/router";
import { useState } from "react";

import { subCategoryUrlMap } from "@/variable";
import { MainCategory } from "@/types/categorys";
import InheritSearchingBar from "../../control/bbsControl/inheritSearchingBar";

import styles from "./index.module.scss";

interface Props {
  mainCategory: MainCategory;
  resolvedUrl: string;
};

const TabletBbsControl = ({ mainCategory, resolvedUrl }: Props) => {
  const router = useRouter();

  const handleClickSubCategory = (value: string) => {
    router.push(`/bbs/${mainCategory}?subCategory=${subCategoryUrlMap[value]}&page=1`);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["searching"]}>
        <InheritSearchingBar />
      </div>
      <div></div>
    </div>
  );
};

export default TabletBbsControl;