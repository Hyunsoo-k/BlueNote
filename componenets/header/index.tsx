import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

import MobileSlidebar from "../mobile-slidebar";
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
      if (mobileDropdown && !dropdownRef.current?.contains(e.target) && !burgerMenuRef.current?.contains(e.target)) {
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
    <div className={styles["header"]}>
      <div className={styles["header__title-and-btn"]}>
        <Link href="/" className={styles["header__title-and-btn__title"]}>
          BLUE NOTE
        </Link>
        {viewPort === "mobile" && (
          <RxHamburgerMenu
            ref={burgerMenuRef}
            onClick={handleMobileDropdown}
            size={45}
            className={styles["burger-menu"]}
          />
        )}
        {/* {viewPort !== "mobile" && (
          <div className={styles["header__title-and-btn__audio"]}></div>
        )} */}
        {viewPort !== "mobile" && (
          <div className={styles["header__title-and-btn__btn"]}>
            <Link href="/auth?initial=signIn" className={styles["header__title-and-btn__btn__signIn"]}>
              Login
            </Link>
            <Link href="/auth?initial=signUp" className={styles["header__title-and-btn__btn__signUp"]}>
              Join
            </Link>
          </div>
        )}
      </div>
      {viewPort === "mobile" && (
        <div
          ref={dropdownRef}
          className={`${mobileDropdown ? styles["header__mobile-dropdown-on"] : styles["header__mobile-dropdown-off"]}`}
        >
          <MobileSlidebar />
        </div>
      )}
      {(viewPort === "tablet" || viewPort === "desktop") && (
        <div className={styles["header__navbar"]}>
          <NavBar viewPort={viewPort} />
        </div>
      )}
    </div>
  );
};

export default Header;
