import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

import { ViewportType } from "@/types/viewport";
import { useGetViewport } from "@/hooks/viewport";
import { subCategoryListMap, sunCategoryKoreanToEnglishMap } from "@/variable";
import BbsHeader from "@/components/bbs/bbsHeader";
import BbsList from "@/components/bbsList";
import Aside from "@/components/aside/aside";
import MobileBbsControl from "@/components/bbs/control/MobileBbsControl";
import SearchModal from "@/components/modal/searchModal";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
};

const BbsPageLayout = ({
  initialData,
  resolvedUrl
}: Props) => {
  const router = useRouter();

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  const asideRef = useRef<HTMLDivElement | null>(null);

  const viewport: ViewportType = useGetViewport();

  const subCategoryList = subCategoryListMap[initialData.mainCategory as keyof typeof subCategoryListMap];

  const handleClickSubCategory = (e: any, subCategory: string): void => {
    e.stopPropagation();

    router.push(`/bbs/${initialData.mainCategory}?subCategory=${sunCategoryKoreanToEnglishMap[subCategory]}&page=1`);
  };

  const handleClickSearch = (e: any): void => {
    e.stopPropagation();

    setSearchModalOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        {viewport === "mobile" ? (
          <BbsHeader initialData={initialData}/>
        ) : (
        <div className={styles["main__header"]}>
          <h2 className={styles["main__category"]}>
            {initialData.mainCategory.toUpperCase()}
          </h2>
          <div className={styles["main__sub-category-list"]}>
            {subCategoryList.map((subCategory: string, index: number) => (
              <span
                key={index}
                onClick={(e) => { handleClickSubCategory(e, subCategory); }}
                className={`${
                  subCategory === initialData.subCategory
                    ? styles["main__sub-category--selected"]
                    : styles["main__sub-category"]
                }`}
              >
                {subCategory}
              </span>
            ))}
          </div>
          <div
            className={styles["main__searching"]}
          >
            <RiSearchLine
              size={25}
              onClick={handleClickSearch}
              className={styles["main__searcing-icon"]}
            />
            {searchModalOpen && (
              <SearchModal
                viewport={viewport}
                setSearchModalOpen={setSearchModalOpen}
                mainCategory={initialData.mainCategory}
              />
            )}
          </div>
        </div>
        )}
        <div className={styles["main__bbs-list"]}>
          <BbsList
            viewport={viewport}
            initialData={initialData}
            resolvedUrl={resolvedUrl}
          />
        </div>
      </div>
      {viewport !== "mobile" && (
        <div
          ref={asideRef}
          className={styles["aside"]}
        >
          <Aside />
        </div>
      )}
      {viewport === "mobile" && (
        <MobileBbsControl
          viewport={viewport}
          mainCategory={initialData.mainCategory}
          isNoticeOrNewsPage={false}
        />
      )}
    <ModalContainer />
    </div>
  );
};

export default BbsPageLayout;
