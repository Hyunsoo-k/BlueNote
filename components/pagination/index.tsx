import { useRouter } from "next/router";

import { SubCategory } from "@/types/categorys";

import styles from "./index.module.scss";

interface Props {
  subCategory?: SubCategory;
  page: number;
  totalPageCount: number;
};

const Pagination = ({ subCategory, page, totalPageCount }: Props) => {
  const router = useRouter();

  const navigate = (page: string | number) => {
    subCategory
      ? router.push(`?subCategory=${subCategory}&page=${page}`)
      : router.push(`?page=${page}`)
  };

  const itemArray = Array.from({ length: totalPageCount }, (_, index) => index + 1);

  console.log(typeof page);

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__pages"]}>
        {itemArray.map((value: number, index: number) => (
            <p
              key={index}
              onClick={() => navigate(value)}
              style={
                value === Number(page)
                  ? { backgroundColor: "rgb(48, 140, 204)", color: "#fff" }
                  : { backgroundColor: "rgb(209, 209, 209)", color: "black" }
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
