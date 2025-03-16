import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLineThin } from "react-icons/pi";

import { ViewportType } from "@/types/viewport/viewport";
import { MainCategoryType } from "@/types/category/categorys";
import { useGetUserMe } from "@/hooks/user/useGetUserMe";
import SearchModal from "@/components/modal/searchModal";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  viewport: ViewportType;
  mainCategory: MainCategoryType;
  isNoticeOrNewsPage: boolean;
};

const MobileBbsControl = ({ viewport, mainCategory, isNoticeOrNewsPage }: Props) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [itemOpen, setItemOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const userMe = useGetUserMe();

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickTool = (): void => {
    setItemOpen((prev: boolean) => !prev);
  };

  const handleClickSearch = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    setSearchModalOpen((prev: boolean) => !prev);
  };

  const handleClickCreate = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();

    if (userMe) {
      userMe && router.push(`/bbs/${mainCategory}/post/createPost`);
    } else {
      openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    };
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
            onClick={handleClickSearch}
            className={styles["tool-item-wrapper"]}
          >
            <CiSearch size={23} />
          </div>
          {(isNoticeOrNewsPage && userMe?.role === 1) ||
            (!isNoticeOrNewsPage && (
              <div
                onClick={handleClickCreate}
                className={styles["tool-item-wrapper"]}
              >
                <PiPencilSimpleLineThin size={23} />
              </div>
            ))}
        </div>
      )}
      {searchModalOpen && (
        <SearchModal
          viewport={viewport}
          setSearchModalOpen={setSearchModalOpen}
          mainCategory={mainCategory}
        />
      )}
    </div>,
    document.body
  );
};

export default MobileBbsControl;
