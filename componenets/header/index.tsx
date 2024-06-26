import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Dropdown from "../dropdown";
import NavBar from "../navbar";
import { ViewPort, MobileDropdownState } from "@/types/header";
import styles from "./index.module.scss";

const Header = () => {
  const [viewPort, setViewPort] = useState<ViewPort>("");
  const [mobileDropdown, setMobileDropdown] = useState<MobileDropdownState>(false);

  const burgerMenuRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);

  const handleMobileDropdown = (e: any) => {
    e.stopPropagation();
    setMobileDropdown(() => !mobileDropdown);
    console.log("handleMobileDropdown done");
    console.log(mobileDropdown);
  };

  useEffect(() => {
    const handleResizing = () => {
      if (window.innerWidth < 768) {
        setViewPort("mobile");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1025) {
        setViewPort("tablet");
      } else if (window.innerWidth >= 1025) {
        setViewPort("desktop");
      }
    };

    const handleClickOutside = (e: any) => {
      e.stopPropagation();
      if (mobileDropdown
          && !dropdownRef.current?.contains(e.target)
          && !burgerMenuRef.current?.contains(e.target)) {
        handleMobileDropdown(e);
      }
    };

    window.addEventListener("resize", handleResizing);
    window.addEventListener("click", handleClickOutside);
    handleResizing();

    return () => {
      window.removeEventListener("resize", handleResizing);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [mobileDropdown]);

  return (
    <>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>BLUE NOTE</h1>
        {viewPort === "mobile" && (
          <RxHamburgerMenu
            ref={burgerMenuRef}
            onClick={handleMobileDropdown}
            size={45}
            className={styles["burger-menu"]}
          />
        )}
        {viewPort !== "mobile" && (
          <div className={styles["btn-wrapper"]}>
            <small className={styles["login-btn"]}>Login</small>
            <small className={styles["signUp-btn"]}>Join</small>
          </div>
        )}
      </div>
      {viewPort === "mobile" && (
        <div
          ref={dropdownRef}
          className={`${mobileDropdown ? styles["mobile-dropdown-on"] : styles["mobile-dropdown-off"]}`}
        >
          <Dropdown viewPort={viewPort} />
        </div>
      )}
      {(viewPort === "tablet" || viewPort === "desktop") && <NavBar viewPort={viewPort} />}
    </>
  );
};

export default Header;
