import { useRouter } from "next/router";
import React from "react";

import styles from "./index.module.scss";
import { SubCategory } from "@/types/categorys";

interface Props {
  subCategory?: SubCategory;
  page: number;
  totalPageCount: number;
}

const Pagination = ({ subCategory, page, totalPageCount }: Props) => {
  const router = useRouter();

  const navigate = (page: string | number) => {
    subCategory
      ? router.push(`?subCategory=${subCategory}&page=${page}`)
      : router.push(`?page=${page}`)
  }

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__pages"]}>
        {Array.from({ length: totalPageCount }, (_, index) => index + 1).map(
          (value: number, index: number) => (
            <p
              key={index}
              onClick={() => navigate(value)}
              style={
                value === page
                  ? { backgroundColor: "rgb(28, 28, 119)", color: "#fff" }
                  : { backgroundColor: "rgb(209, 209, 209)", color: "rgb(28, 28, 119)" }
              }
            >
              {value}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
