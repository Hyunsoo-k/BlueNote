import { useRouter } from "next/router";
import { useEffect, useState, useRef, Dispatch, SetStateAction, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useForm, FieldErrors } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import { ViewportType } from "@/types/viewport/viewport";
import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { subCategoryListMap } from "@/variable";
import { subCategoryKoreanToEnglishMap } from "@/variable";
import { selectQueryMap } from "@/utils/selectQueryMap";
import { useGetUserMe } from "@/hooks/user/useGetUserMe";
import { useGetRecentSearch } from "@/hooks/user/useGetRecentSearch";
import { useCreateRecentSearch } from "@/hooks/user/useCreateRecentSearch";
import { useDeleteAllRecentSearch } from "@/hooks/user/useDeleteAllRecentSearch";
import { useDeleteRecentSearch } from "@/hooks/user/useDeleteRecentSearch";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  setSearchModalOpen: Dispatch<SetStateAction<boolean>>;
  mainCategory: MainCategoryType;
}

interface SelectStateType {
  open: boolean;
  currentValue: string;
};

interface SubCategoryStateType {
  open: boolean;
  currentValue: string;
};

const SearchModal = ({ viewport, setSearchModalOpen, mainCategory }: Props) => {
  const router = useRouter();

  const [select, setSelect] = useState<SelectStateType>({
    open: false,
    currentValue: "제목+내용",
  });

  const [subCategory, SetSubCategory] = useState<SubCategoryStateType>({
    open: false,
    currentValue: "All",
  });

  const containerRef = useRef<HTMLFormElement | null>(null);
  const selectListRef = useRef<HTMLUListElement | null>(null);
  const subCategoryListRef = useRef<HTMLUListElement | null>(null);

  const userMe = useGetUserMe();

  const { openModal, closeModal } = useModal();

  const { data: queryData } = useGetRecentSearch(userMe);

  const useCraeteRecentSearchMutation = useCreateRecentSearch(userMe);
  const useDeleteAllRecentSearchMutation = useDeleteAllRecentSearch(userMe, closeModal);
  const useDeleteRecentSearchMutation = useDeleteRecentSearch(userMe);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleRouteChange = (): void => {
      setSearchModalOpen(false);
    };

    const handleClickThings = (e: globalThis.MouseEvent): void => {
      const targetNode = e.target as Node;

      !containerRef.current?.contains(targetNode) && setSearchModalOpen(false);
    };

    const handleClickSelectListOutside = (e: globalThis.MouseEvent): void => {
      const targetNode = e.target as Node;

      selectListRef.current &&
        !selectListRef.current.contains(targetNode) &&
        setSelect((prev: any) => ({ ...prev, open: false }));
    };

    const handleClickSubCategoryOutside = (e: globalThis.MouseEvent): void => {
      const targetNode = e.target as Node;

      subCategoryListRef.current &&
        !subCategoryListRef.current.contains(targetNode) &&
        SetSubCategory((prev: any) => ({ ...prev, open: false }));
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("click", handleClickThings);
    window.addEventListener("click", handleClickSelectListOutside);
    window.addEventListener("click", handleClickSubCategoryOutside);

    return () => {
      document.body.style.overflow = "auto";
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("click", handleClickThings);
      window.removeEventListener("click", handleClickSelectListOutside);
      window.removeEventListener("click", handleClickSubCategoryOutside);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const subCatgoryList = subCategoryListMap[mainCategory];

  const submitHandler = {
    onSubmit: async (watch: Record<string, string>): Promise<void> => {
      const urlDestination = `?subCategory=${subCategoryKoreanToEnglishMap[subCategory.currentValue]}&select=${
        selectQueryMap[select.currentValue]
      }&query=${watch.query}`;

      if (userMe) {
        const requestBody = { query: watch.query };

        await useCraeteRecentSearchMutation.mutateAsync(requestBody);
      };

      router.push(urlDestination);
    },
    onError: async (e: FieldErrors): Promise<void> => {
      console.log(e.error);
    },
  };

  const handleClickSelect = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();

    SetSubCategory((prev: SubCategoryStateType) => ({ ...prev, open: false }));
    setSelect((prev: SelectStateType) => ({ ...prev, open: !prev.open }));
  };

  const handleClickSelectValue = (e: MouseEvent<HTMLLIElement>): void => {
    e.stopPropagation();

    setSelect((prev: SelectStateType) => ({
      ...prev,
      open: false,
      currentValue: e.currentTarget.innerHTML,
    }));
  };

  const handleClickSubCategory = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();

    setSelect((prev: SelectStateType) => ({ ...prev, open: false }));
    SetSubCategory((prev: SubCategoryStateType) => ({ ...prev, open: !prev.open }));
  };

  const handleClickSubCategoryValue = (e: MouseEvent<HTMLLIElement>): void => {
    e.stopPropagation();

    SetSubCategory((prev) => ({ ...prev, open: false, currentValue: e.currentTarget.innerHTML }));
  };

  const handleClickRecentSearchQuery = async (
    e: MouseEvent<HTMLSpanElement>,
    query: string
  ): Promise<void> => {
    e.stopPropagation();

    const requestBody = {
      query: query,
    };

    await useCraeteRecentSearchMutation.mutateAsync(requestBody);

    router.push(
      `?subCategory=${subCategoryKoreanToEnglishMap[subCategory.currentValue]}&select=${
        selectQueryMap[select.currentValue]
      }&query=${query}`
    );
  };

  const handleDeleteRecentSearch = (e: MouseEvent<SVGElement>, query: string): void => {
    e.stopPropagation();

    const requestBody = { query };

    useDeleteRecentSearchMutation?.mutate(requestBody);
  };

  const handleClickDeleteAllRecentSearch = (): void => {
    queryData.queryList.length > 0
      ? openModal("confirm", "최근 검색어를 모두 삭제하시겠습니까?", useDeleteAllRecentSearchMutation.mutate)
      : openModal("alert", "최근 검색어가 없습니다.", closeModal);
  };

  const resultHTML = (
    <div className={styles["overlay"]}>
      <form
        ref={containerRef}
        onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
        className={styles["container"]}
      >
        <div className={styles["option-box"]}>
          <div className={styles["select-wrapper"]}>
            <div onClick={handleClickSelect} className={styles["select__current-value-wrapper"]}>
              <span className={styles["select__current-value"]}>{select.currentValue}</span>
              <IoIosArrowDown
                size={18}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "0",
                }}
              />
            </div>
            {select.open && (
              <ul ref={selectListRef} className={styles["select__list"]}>
                <li onClick={handleClickSelectValue}>제목+내용</li>
                <li onClick={handleClickSelectValue}>제목</li>
                <li onClick={handleClickSelectValue}>내용</li>
                <li onClick={handleClickSelectValue}>작성자</li>
              </ul>
            )}
          </div>
          <div className={styles["sub-category-wrapper"]}>
            <div
              onClick={handleClickSubCategory}
              className={styles["sub-category__current-value-wrapper"]}
            >
              <span className={styles["sub-category__current-value"]}>{subCategory.currentValue}</span>
              <IoIosArrowDown
                size={18}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "0",
                }}
              />
            </div>
            {subCategory.open && (
              <ul ref={subCategoryListRef} className={styles["sub-category__list"]}>
                {subCatgoryList.map((item: SubCategoryKoreanType, index: number) => (
                  <li key={index} onClick={handleClickSubCategoryValue}>
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
            <CiSearch
              size={20}
              style={{
                position: "relative",
                top: "1px",
              }}
            />
          </button>
          <p className={styles["error-message"]}>
            {typeof errors.keyword?.message === "string" ? errors.keyword?.message : ""}
          </p>
        </div>
        <div className={styles["recent-search"]}>
          <div className={styles["recent-search__text-wrapper"]}>
            <span className={styles["recent-search__text"]}>최근 검색어</span>
            {userMe && (
              <CiTrash
                size={19}
                onClick={handleClickDeleteAllRecentSearch}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "10px",
                }}
              />
            )}
          </div>
          <ul className={styles["recent-search__list"]}>
            {!queryData ? (
              <p className={styles["recent-search__no-login-message"]}>로그인이 필요한 기능입니다.</p>
            ) : undefined}
            {queryData?.queryList.length === 0 ? (
              <p className={styles["recent-search__no-history"]}>최근 검색어가 없습니다.</p>
            ) : undefined}
            {queryData?.queryList?.map((query: string, index: number) => (
              <li key={index}>
                <span
                  onClick={(e) => {
                    handleClickRecentSearchQuery(e, query);
                  }}
                >
                  {query}
                </span>
                <IoCloseOutline
                  size={18}
                  onClick={(e) => {
                    handleDeleteRecentSearch(e, query);
                  }}
                  style={{
                    position: "relative",
                    top: "1px",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );

  if (viewport === "mobile") {
    return createPortal(resultHTML, document.body);
  } else {
    return resultHTML;
  }
};

export default SearchModal;
