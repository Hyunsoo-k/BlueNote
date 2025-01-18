import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLineThin } from "react-icons/pi";

import { MainCategory } from "@/types/categorys";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import SearchModal from "@/components/modal/searchModal";
import useModal from "@/hooks/modal/useModal";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
  mainCategory: MainCategory;
  isNoticeOrNewsPage: boolean;
};

const PostListActionTool = ({ userMe, mainCategory, isNoticeOrNewsPage }: Props) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [itemOpen, setItemOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickTool = () => {
    setItemOpen((prev: boolean) => !prev);
  };

  const handleClickSearch = (e: any) => {
    e.stopPropagation();
    setSearchModalOpen((prev: boolean) => !prev);
  };

  const handleClickCreate = (e: any) => {
    e.stopPropagation();
    !userMe && openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    userMe && router.push("");
  };

  if (!isClient) {
    return null;
  };

  return createPortal(
    <div className={styles["container"]}>
      <GoPlus
        size={28}
        color="#fff"
        onClick={handleClickTool}
      />
      {itemOpen && (
        <div className={styles["tool-wrapper"]}>
          <div
            onClick={(e) => {handleClickSearch(e); }}
            className={styles["tool-item-wrapper"]}
          >
            <CiSearch size={23} />
          </div>
          {(isNoticeOrNewsPage && userMe?.role === 1) || !isNoticeOrNewsPage && (
            <div
              onClick={(e) => { handleClickCreate(e); }}
              className={styles["tool-item-wrapper"]}
            >
              <PiPencilSimpleLineThin size={23} />
            </div>
          )}
        </div>
      )}
      {searchModalOpen && (
        <SearchModal
          setShowSearchModal={setSearchModalOpen}
          mainCategory={mainCategory}
        />
      )}
      <ModalContainer />
    </div>,
    document.body
  );
};

export default PostListActionTool;