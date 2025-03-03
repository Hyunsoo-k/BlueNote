import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import { useGetUserMe } from "@/hooks/user/useGetUserMe";
import { useGetRecentSearch } from "@/hooks/user/useGetRecentSearch";
import { useCreateRecentSearch } from "@/hooks/user/useCreateRecentSearch";
import { useDeleteRecentSearch } from "@/hooks/user/useDeleteRecentSearch";
import { MainCategory } from "@/types/categorys";
import { subCategoryListMap } from "@/variable";
import { subCategoryUrlMap } from "@/variable";
import { selectQueryMap } from "@/utils/selectQueryMap";

import styles from "./index.module.scss";

interface Props {
  setShowSearchModal: any;
  mainCategory: MainCategory;
};

const SearchModal = ({ setShowSearchModal, mainCategory }: Props) => {
  const router = useRouter();

  const [select, setSelect] = useState({
    open: false,
    currentValue: "제목+내용",
  });
  const [subCategory, SetSubCategory] = useState({
    open: false,
    currentValue: "All",
  });

  const containerRef = useRef<HTMLFormElement | null>(null);
  const selectListRef = useRef<HTMLUListElement | null>(null);
  const subCategoryListRef = useRef<HTMLUListElement | null>(null);
  
  const userMe = useGetUserMe();

  const { data: queryData } = useGetRecentSearch(userMe);

  const useCraeteRecentSearchMutation = useCreateRecentSearch(userMe?._id);
  const useDeleteRecentSearchMutation = useDeleteRecentSearch(userMe?._id);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleRouteChange = () => {
      setShowSearchModal(false);
    };

    const handleClickThings = (e: any) => {
      const targetNode = e.target as Node;

      if (
        !containerRef.current?.contains(targetNode) ||
        (selectListRef.current && !selectListRef.current.contains(targetNode)) ||
        (subCategoryListRef.current && !subCategoryListRef.current.contains(targetNode))
      ) {
        setShowSearchModal(false);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("click", handleClickThings);

    return () => {
      document.body.style.overflow = "auto";
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("click", handleClickThings);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const subCatgoryList = subCategoryListMap[mainCategory as keyof typeof subCategoryListMap];

  const submitHandler = {
    onSubmit: async (e: any) => {
      const requestBody = {
        query: e.query
      };

      await useCraeteRecentSearchMutation.mutateAsync(requestBody);
      
      router.push(
        `?subCategory=${subCategoryUrlMap[subCategory.currentValue]}&select=${
          selectQueryMap[select.currentValue]
        }&query=${e.query}`
      );
    },
    onError: (e: any) => {
      console.log(e.error);
    },
  };

  const handleClickSelect = (e: any) => {
    e.stopPropagation();
    SetSubCategory((prev) => ({ ...prev, open: false }));
    setSelect((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleClickSelectValue = (e: any) => {
    e.stopPropagation();
    setSelect((prev) => ({ ...prev, open: false, currentValue: e.target.innerHTML }));
  };

  const handleClickSubCategory = (e: any) => {
    e.stopPropagation();
    setSelect((prev) => ({ ...prev, open: false }));
    SetSubCategory((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleClickSubCategoryValue = (e: any) => {
    e.stopPropagation();
    SetSubCategory((prev) => ({ ...prev, open: false, currentValue: e.target.innerHTML }));
  };

  const handleClickRecentSearchQuery = async (e: any, query: string) => {
    e.stopPropagation();

    const requestBody = {
      query: query
    };

    await useCraeteRecentSearchMutation.mutateAsync(requestBody);
      
    router.push(
      `?subCategory=${subCategoryUrlMap[subCategory.currentValue]}&select=${
        selectQueryMap[select.currentValue]
      }&query=${query}`
    );
  };

  const handleDeleteRecentSearch = (e: any, query: string) => {
    e.stopPropagation();
    
    const requestBody = { query };

    useDeleteRecentSearchMutation.mutate(requestBody);
  };

  return createPortal(
    <div className={styles["overlay"]}>
      <form
        ref={containerRef}
        onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
        className={styles["container"]}
      >
        <div className={styles["option-box"]}>
          <div className={styles["select-wrapper"]}>
            <div
              onClick={(e: any) => { handleClickSelect(e); }}
              className={styles["select__current-value-wrapper"]}
            >
              <span className={styles["select__current-value"]}>
                {select.currentValue}
              </span>
              <IoIosArrowDown
                size={18}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "0"
                }}
              />
            </div>
            {select.open && (
              <ul
                ref={selectListRef}
                className={styles["select__list"]}
              >
                <li onClick={(e) => { handleClickSelectValue(e); }}>제목+내용</li>
                <li onClick={(e) => { handleClickSelectValue(e); }}>제목</li>
                <li onClick={(e) => { handleClickSelectValue(e); }}>내용</li>
                <li onClick={(e) => { handleClickSelectValue(e); }}>작성자</li>
              </ul>
            )}
          </div>
          <div className={styles["sub-category-wrapper"]}>
            <div
              onClick={(e: any) => { handleClickSubCategory(e); }}
              className={styles["sub-category__current-value-wrapper"]}
            >
              <span className={styles["sub-category__current-value"]}>
                {subCategory.currentValue}
              </span>
              <IoIosArrowDown
                size={18}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "0"
                }}
              />
            </div>
            {subCategory.open && (
              <ul
                ref={subCategoryListRef}
                className={styles["sub-category__list"]}
              >
                {subCatgoryList.map((item: string, index: number) => (
                  <li
                    key={index}
                    onClick={(e) => { handleClickSubCategoryValue(e); }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles["input-box"]}>
          <input
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
            spellCheck="false"
            {...register("query", {
              required: "검색어를 입력해 주세요.",
              minLength: { value: 2, message: "2 글자 이상 입력해 주세요." },
            })}
            className={styles["input"]}
          />
          <button className={styles["button"]}>
            <CiSearch size={20} />
          </button>
          <p className={styles["error-message"]}>
            {typeof errors.keyword?.message === "string" ? errors.keyword?.message : ""}
          </p>
        </div>
        <div className={styles["recent-search"]}>
          <div className={styles["recent-search__text-wrapper"]}>
            <span className={styles["recent-search__text"]}>최근 검색어</span>
            <CiTrash
              size={20}
              style={{
                position: "absolute",
                right: "10px"
              }}
            />
          </div>
          <ul className={styles["recent-search__list"]}>
            {queryData?.queryList?.map(
              (query: string, index: number) =>
                <li key={index}>
                  <span onClick={(e) => { handleClickRecentSearchQuery(e, query); }}>
                    {query}
                  </span>
                  <IoCloseOutline
                    size={18}
                    onClick={(e) => { handleDeleteRecentSearch(e, query); }}
                    style={{
                      position: "relative",
                      top: "1px"
                    }}
                  />
              </li>
            )}
          </ul>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default SearchModal;
