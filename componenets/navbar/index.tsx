import React, { useState } from "react";

import { DropdownState } from "@/types/navbar";
import Dropdown from "../dropdown";
import NewDropdown from "@/new-dropdown";
import { NavbarProps } from "@/types/navbar";
import styles from "./index.module.scss";

const NavBar = ({ viewPort }: NavbarProps) => {

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["menu"]}>
        <p
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={styles["menu__category"]}
        >
          Notice
        </p>
        <div className={styles[`menu__dropdown`]}>
        </div>
      </div>
      <div className={styles["menu"]}>
        <p
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={styles["menu__category"]}
        >
          News
        </p>
        <div className={styles[`menu__dropdown`]}>
        </div>
      </div>
      <div className={styles["menu"]}>
        <p
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={styles["menu__category"]}
        >
          Board
        </p>
        <div className={styles[`menu__dropdown`]}>
        </div>
      </div>
      <div className={styles["menu"]}>
        <p
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={styles["menu__category"]}
        >
          Promote
        </p>
        <div className={styles[`menu__dropdown`]}>
        </div>
      </div>
      <div className={styles["menu"]}>
        <p
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={styles["menu__category"]}
        >
          Job
        </p>
        <div className={styles[`menu__dropdown`]}>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
