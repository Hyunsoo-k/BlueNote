import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

import { subCategoryListMap } from "@/variable";
import { selectQueryMap } from "@/utils/selectQueryMap";

import styles from "./index.module.scss";

interface Props {
  setShowSearchModal: any;
  mainCategory: "notice" | "news" | "board" | "promote" | "job";
}

const SearchModal = ({ setShowSearchModal, mainCategory }: Props) => {
  const router = useRouter();

  const [currentFilterList, setCurrentFilterList] = useState({
    open: false,
    currentValue: "제목+내용",
  });
  const [currentSubCategoryList, setCurrentSubCategoryList] = useState({
    open: false,
    currentValue: "All",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleRouteChange = () => {
      setShowSearchModal(false);
    };

    const handleClickModalOutSide = (e: any) => {
      const targetNode = e.target as Node;
      const modal = document.getElementById("search-modal");
      const actionBar = document.getElementById("mobile-post-action-bar__section");

      if (!modal?.contains(targetNode) && !actionBar?.contains(targetNode)) {
        setShowSearchModal(false);
      }
    };

    const handleClickFilterListOutSide = (e: any) => {
      const targetNode = e.target as Node;
      const filterList = document.getElementById("searching-bar__filter-list");

      if (!filterList?.contains(targetNode)) {
        setCurrentFilterList((prev: any) => ({ ...prev, open: false }));
      }
    };

    const handleClickSubCategoryListOutSide = (e: any) => {
      const targetNode = e.target as Node;
      const subCategoryList = document.getElementById("searching-bar__sub-category-list");

      if (!subCategoryList?.contains(targetNode)) {
        setCurrentSubCategoryList((prev: any) => ({ ...prev, open: false }));
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("click", handleClickModalOutSide);
    window.addEventListener("click", handleClickFilterListOutSide);
    window.addEventListener("click", handleClickSubCategoryListOutSide);

    return () => {
      document.body.style.overflow = "auto";
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("click", handleClickModalOutSide);
      window.removeEventListener("click", handleClickFilterListOutSide);
      window.removeEventListener("click", handleClickSubCategoryListOutSide);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const subCatgoryList = subCategoryListMap[mainCategory as keyof typeof subCategoryListMap];

  const submitHandler = {
    onSubmit: (e: any) => {
      router.push(
        `?subCategory=${currentSubCategoryList.currentValue}&select=${
          selectQueryMap[currentFilterList.currentValue]
        }&query=${e.keyword}`
      );
    },
    onError: (e: any) => {
      console.log(e.error);
    },
  };

  const handleClickFilter = (e: any) => {
    e.stopPropagation();
    setCurrentSubCategoryList((prev) => ({ ...prev, open: false }));
    setCurrentFilterList((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleClickFilterContent = (e: any) => {
    e.stopPropagation();
    setCurrentFilterList((prev) => ({ ...prev, open: false, currentValue: e.target.innerHTML }));
  };

  const handleClickSubCategory = (e: any) => {
    e.stopPropagation();
    setCurrentFilterList((prev) => ({ ...prev, open: false }));
    setCurrentSubCategoryList((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleClickSubCategoryContent = (e: any) => {
    e.stopPropagation();
    setCurrentSubCategoryList((prev) => ({ ...prev, open: false, currentValue: e.target.innerHTML }));
  };

  return createPortal(
    <div className={styles["overlay"]}>
      <form
        onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
        className={styles["container"]}
      >
        <div id="search-modal" className={styles["search-modal"]}>
          <div className={styles["search-modal__top"]}>
            <div className={styles["search-modal__filter"]}>
              <p
                onClick={(e: any) => {
                  handleClickFilter(e);
                }}
                className={styles["searching-bar__filter-value"]}
              >
                {currentFilterList.currentValue}
                <IoIosArrowDown size={18} style={{ position: "absolute", top: "2px", right: "0" }} />
              </p>
              {currentFilterList.open && (
                <ul id="searching-bar__filter-list" className={styles["searching-bar__filter-list"]}>
                  <li onClick={(e) => { handleClickFilterContent(e); }}>
                    제목+내용
                  </li>
                  <li onClick={(e) => { handleClickFilterContent(e); }}>
                    제목
                  </li>
                  <li onClick={(e) => { handleClickFilterContent(e); }}>
                    내용
                  </li>
                  <li onClick={(e) => { handleClickFilterContent(e); }}>
                    작성자
                  </li>
                </ul>
              )}
            </div>
            <div className={styles["search-modal__sub-category"]}>
              <p
                onClick={(e: any) => {
                  handleClickSubCategory(e);
                }}
                className={styles["searching-bar__sub-category-value"]}
              >
                {currentSubCategoryList.currentValue}
                <IoIosArrowDown size={18} style={{ position: "absolute", top: "2px", right: "0" }} />
              </p>
              {currentSubCategoryList.open && (
                <ul id="searching-bar__sub-category-list" className={styles["searching-bar__sub-category-list"]}>
                  {subCatgoryList.map((item: string, index: number) => (
                    <li
                      key={index}
                      onClick={(e) => {
                        handleClickSubCategoryContent(e);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles["search-modal__input-box"]}>
            <input
              placeholder="검색어를 입력해주세요."
              autoComplete="off"
              spellCheck="false"
              {...register("keyword", {
                required: "검색어를 입력해 주세요.",
                minLength: { value: 2, message: "2 글자 이상 입력해 주세요." },
              })}
              className={styles["search-modal__input"]}
            />
            <button className={styles["search-modal__button"]}>
              <CiSearch size={20} />
            </button>
            <p className={styles["search-modal__error-message"]}>
              {typeof errors.keyword?.message === "string" ? errors.keyword?.message : ""}
            </p>
          </div>
          <div className={styles["search-modal__recent-searches"]}>
            <p className={styles["search-modal__recent-searches-title"]}>
              최근 검색어
              <CiTrash size={20} style={{ position: "absolute", right: "10px" }} />
            </p>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default SearchModal;
