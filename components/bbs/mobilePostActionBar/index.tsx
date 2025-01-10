import { useRouter } from "next/router";
import { useState } from "react";
import { PiHouseThin } from "react-icons/pi";
import { PiThumbsUpThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLineThin } from "react-icons/pi";

import SearchModal from "@/components/modal/searchModal";

import styles from "./index.module.scss";

interface Props {
  mainCategory: "notice" | "news" | "board" | "promote" | "job"
};

const MobilePostActionBar = ({ mainCategory }: Props) => {
  const router = useRouter();

  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  const handleClickHome = (e: any) => {
    e.stopPropagation();
    router.push("/");
  };

  const handleClickSearch = (e: any) => {
    e.stopPropagation();
    setShowSearchModal((prev: any) => !prev);
  };

  const handleClickCreatePost = (e: any) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/createPost`);
  };

  return (
    <div className={styles["mobile-post-action-bar"]}>
      <div
        onClick={(e) => { handleClickHome(e); }}
        className={styles["mobile-post-action-bar__section"]}
      >
        <PiHouseThin size={20} color="rgb(95, 95, 95)" />
        <p className={styles["mobile-post-action-bar__explan"]}>홈</p>
      </div>
      <div className={styles["mobile-post-action-bar__section"]}>
        <PiThumbsUpThin size={20} color="rgb(95, 95, 95)" />
        <p className={styles["mobile-post-action-bar__explan"]}>인기글</p>
      </div>
      <div className={styles["mobile-post-action-bar__section"]}>
        <RxHamburgerMenu size={20} color="rgb(95, 95, 95)" />
        <p className={styles["mobile-post-action-bar__explan"]}>전체글</p>
      </div>
      <div
        onClick={(e) => { handleClickSearch(e); }}
        id="mobile-post-action-bar__section"
        className={styles["mobile-post-action-bar__section"]}
      >
        <CiSearch size={20} color="rgb(95, 95, 95)" />
        <p className={styles["mobile-post-action-bar__explan"]}>검색</p>
      </div>
      {(mainCategory !== "notice" && mainCategory !== "news") &&
        <div
        onClick={(e) => {handleClickCreatePost(e); }}
        className={styles["mobile-post-action-bar__section"]}
      >
        <PiPencilSimpleLineThin size={20} color="rgb(95, 95, 95)" />
        <p className={styles["mobile-post-action-bar__explan"]}>글쓰기</p>
      </div>
    }
      {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} mainCategory={mainCategory} />}
    </div>
  );
};

export default MobilePostActionBar;
