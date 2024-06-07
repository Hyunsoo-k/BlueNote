import React, { useState } from "react";

import { DropdownState } from "@/types/navbar";
import NavbarDropdown from "@/navbar-dropdown";
import styles from "./index.module.scss";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState<null | string>(null);

  const handleMouseEnter = (menu: string) => {
    setShowDropdown(menu);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  return (
    <div className={styles["wrapper"]}>
      <div
        onMouseEnter={() => handleMouseEnter("notice")}
        onMouseLeave={handleMouseLeave}
        className={styles["menu"]}
      >
        <p className={styles["menu__category"]}>Notice</p>
        <div className={styles[`${showDropdown === "notice" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
          <div className={styles["empty-place"]}></div>
          <NavbarDropdown item={["공지사항"]} />
        </div>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("news")}
        onMouseLeave={handleMouseLeave}
        className={styles["menu"]}
      >
        <p className={styles["menu__category"]}>News</p>
        <div className={styles[`${showDropdown === "news" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
        <div className={styles["empty-place"]}></div>
        <NavbarDropdown item={["국내", "국외"]} />
        </div>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("board")}
        onMouseLeave={handleMouseLeave}
        className={styles["menu"]}
      >
        <p className={styles["menu__category"]}>Board</p>
        <div className={styles[`${showDropdown === "board" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
        <div className={styles["empty-place"]}></div>
        <NavbarDropdown item={["자유게시판", "건의사항"]} />
        </div>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("promote")}
        onMouseLeave={handleMouseLeave}
        className={styles["menu"]}
      >
        <p className={styles["menu__category"]}>Promote</p>
        <div className={styles[`${showDropdown === "promote" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
        <div className={styles["empty-place"]}></div>
        <NavbarDropdown item={["밴드홍보", "공연홍보", "재즈바홍보"]} />
        </div>
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("job")}
        onMouseLeave={handleMouseLeave}
        className={styles["menu"]}
      >
        <p className={styles["menu__category"]}>Job</p>
        <div className={styles[`${showDropdown === "job" ? "menu__dropdown-on" : "menu__dropdown-off"}`]}>
        <div className={styles["empty-place"]}></div>
        <NavbarDropdown item={["구인", "구직"]} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
