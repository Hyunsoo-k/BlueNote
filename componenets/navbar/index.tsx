import React, { useState } from "react";

import { DropdownState } from "@/types/dropdown/tablet-desktop";
import Dropdown from "../dropdown";
import { NavbarProps } from "@/types/navbar";
import styles from "./index.module.scss";

const NavBar = ({ viewPort }: NavbarProps) => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    initialState: true,
    state: "off"
  });

  const handleMouseEnter = () => {
    setDropdownState((prev: DropdownState) => ({ ...prev, initialState: false, state: "on" }));
  };

  const handleMouseLeave = () => {
    setDropdownState((prev: DropdownState) => ({ ...prev, initialStatefalse: false, state: "off" }));
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["list"]}>
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["list__item"]}>
          Notice
        </p>
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["list__item"]}>
          News
        </p>
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["list__item"]}>
          Board
        </p>
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["list__item"]}>
          Promote
        </p>
        <p
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles["list__item"]}>
          Job
        </p>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles[`dropdown-${dropdownState.state}`]}>
          <Dropdown viewPort={viewPort} />
      </div>
    </div>
  );
};

export default NavBar;
