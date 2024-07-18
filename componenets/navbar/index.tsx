import React, { useState } from "react";
import { useRouter } from "next/router";

import NavbarDropdown from "@/navbar-dropdown";
import styles from "./index.module.scss";

const NavBar = ({viewPort}: any) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState<null | string>(null);

  const handleMouseEnter = (menu: string) => {
    setShowDropdown(menu);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  const handleClcikMainCategory = (target: string) => {
    switch (target) {
      case "notice":
        router.push("/bbs/notice");
        break;
      case "news":
        router.push("/bbs/news");
        break;
      case "board":
        router.push("/bbs/board");
        break;
      case "promote":
        router.push("/bbs/promote");
        break;
      case "job":
        router.push("/bbs/job");
        break;
    }
  };

  return (
    <div className={styles["navbar"]}>
      {((viewPort === "tablet" || viewPort === "desktop")) && (<div className={styles["navbar__menu"]}>
        <div
          onMouseEnter={() => handleMouseEnter("notice")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClcikMainCategory("notice")}
          className={styles["navbar__menu__element"]}
        >
          <p className={styles["navbar__menu__element__category"]}>Notice</p>
          <div className={styles[`${showDropdown === "notice" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
            <div className={styles["empty-place"]}></div>
            <NavbarDropdown item={["공지사항"]} />
          </div>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter("news")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClcikMainCategory("news")}
          className={styles["navbar__menu__element"]}
        >
          <p className={styles["navbar__menu__element__category"]}>News</p>
          <div className={styles[`${showDropdown === "news" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
            <div className={styles["empty-place"]}></div>
            <NavbarDropdown item={["국내", "국외"]} />
          </div>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter("board")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClcikMainCategory("board")}
          className={styles["navbar__menu__element"]}
        >
          <p className={styles["navbar__menu__element__category"]}>Board</p>
          <div className={styles[`${showDropdown === "board" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
            <div className={styles["empty-place"]}></div>
            <NavbarDropdown item={["자유게시판", "건의사항"]} />
          </div>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter("promote")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClcikMainCategory("promote")}
          className={styles["navbar__menu__element"]}
        >
          <p className={styles["navbar__menu__element__category"]}>Promote</p>
          <div className={styles[`${showDropdown === "promote" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
            <div className={styles["empty-place"]}></div>
            <NavbarDropdown item={["밴드홍보", "공연홍보", "재즈바홍보"]} />
          </div>
        </div>
        <div
          onMouseEnter={() => handleMouseEnter("job")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClcikMainCategory("job")}
          className={styles["navbar__menu__element"]}
        >
          <p className={styles["navbar__menu__element__category"]}>Job</p>
          <div className={styles[`${showDropdown === "job" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
            <div className={styles["empty-place"]}></div>
            <NavbarDropdown item={["구인", "구직"]} />
          </div>
        </div>
      </div>)}

    
    </div>
  );
};

export default NavBar;
