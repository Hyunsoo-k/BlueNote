import React from "react";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import { SubCategory } from "@/types/categorys";

interface PaginationProps {
  subCategory: SubCategory;
  page: string;
  response: any;
}

const Pagination = ({ subCategory, page, response }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__pages"]}>
        {Array.from({ length: Number(response.totalPageCount) }, (_, index) => index + 1).map(
          (value: number, index: number) => (
            <p
              key={index}
              onClick={() => {
                router.push(`?subCategory=${subCategory}&page=${value}`);
              }}
              style={
                Number(page) === Number(value)
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
