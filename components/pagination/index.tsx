import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { SubCategory } from "@/types/categorys";

import styles from "./index.module.scss";

interface Props {
  subCategory?: SubCategory;
  page: number;
  totalPage: number;
};

const Pagination = ({ subCategory, page, totalPage }: Props) => {
  const router = useRouter();

  const handleClickArrow = (direction: string) => {
    let newPage = page;
  
    if (direction === "prev" && page > 1) {
      newPage = page - 1;
    };

    if (direction === "next" && page < totalPage) {
      newPage = page + 1;
    };
  
    if (newPage !== page) {
      const updatedQuery = {
        ...router.query,
        page: newPage,
      };
  
      router.push({
        pathname: router.pathname,
        query: updatedQuery,
      });
    }
  };
  

  const navigate = (page: string | number) => {
    const updatedQuery = { 
      ...router.query, 
      page: page 
    };

    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    });
  };

  const itemArray = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__pages"]}>
        <IoIosArrowBack
          size={24}
          color="#2C2C2C"
          onClick={() => handleClickArrow("prev") }
          className={styles["pagination__left-arrow"]}
        />
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
        <IoIosArrowForward
          size={24}
          color="#2C2C2C"
          onClick={() => handleClickArrow("next") }
          className={styles["pagination__right-arrow"]}
        />
      </div>
    </div>
  );
};

export default Pagination;
