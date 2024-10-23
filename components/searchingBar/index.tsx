import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

import ModalContainer from "../modal/modalContainer";
import useModal from "@/hooks/modal/useModal";
import { selectQueryMap } from "@/utils/selectQueryMap";

import styles from "./index.module.scss";

const SearchingBar = () => {
  const router = useRouter();
  
  const [selectDropdown, setSelectDropdown] = useState({
    open: false,
    value: "제목+내용",
    ref: useRef<any>(null),
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setSelectDropdown((prev) => ({ ...prev, show: false }));
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectDropdown.open &&
        selectDropdown.ref.current !== (e.target as Node) &&
        !selectDropdown.ref.current?.contains(e.target as Node)
      ) {
        setSelectDropdown((prev) => ({ ...prev, open: false }));
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectDropdown.open]);

  const { openModal, closeModal } = useModal();
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const handleSelectValue = (e: any) => {
    setSelectDropdown((prev: any) => ({ ...prev, value: e.target.innerHTML, open: false }));
  };

  const submitHandler = {
    onSubmit: (e: any) => {
      router.push(
        `?${router.query.subCategory ? `subCategory=${router.query.subCategory}&` : ""}${
          router.query.page ? `page=${router.query.page}&` : ""
        }select=${selectQueryMap[selectDropdown.value]}&query=${e.keyword}`
      );
    },
    onError: (e: any) => {
      openModal("alert", e.keyword.message, closeModal);
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)} className={styles["searching-bar"]}>
      <div className={styles["searching-bar__select"]}>
        <p
          onMouseDown={(e: any) => {
            e.stopPropagation();
            setSelectDropdown((prev: any) => ({ ...prev, open: !prev.open }));
          }}
          className={styles["searching-bar__select-value"]}
        >
          {selectDropdown.value}
          <IoIosArrowDown size={18} style={{ position: "absolute", top: "11px", right: "10px" }} />
        </p>
        {selectDropdown.open && (
          <ul ref={selectDropdown.ref} className={styles["searching-bar__select-list"]}>
            <li onMouseDown={handleSelectValue}>제목+내용</li>
            <li onMouseDown={handleSelectValue}>제목</li>
            <li onMouseDown={handleSelectValue}>내용</li>
            <li onMouseDown={handleSelectValue}>작성자</li>
          </ul>
        )}
      </div>
        <input
          {...register("keyword", {
            required: "검색어를 입력해 주세요.",
            minLength: { value: 2, message: "2 글자 이상 입력해 주세요." },
          })}
          className={styles["searching-bar__input"]}
        />
        <button className={styles["searching-bar__button"]}>
          <RiSearchLine size={20} color="rgb(48, 140, 204)" />
        </button>
      <ModalContainer />
    </form>
  );
};

export default SearchingBar;
