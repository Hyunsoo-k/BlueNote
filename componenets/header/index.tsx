import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { ViewPort } from "@/types/header";
import styles from "./index.module.scss";

const Header = () => {
  const [viewPort, setViewPort] = useState<ViewPort>("");

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

    window.addEventListener("resize", handleResizing);
    handleResizing();

    return () => {
      window.removeEventListener("resize", handleResizing);
    };
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <h1 className={styles["title"]}>BLUE NOTE</h1>
      {viewPort === "mobile" ? (
        <RxHamburgerMenu size={45} className={styles["burger-menu"]} />
      ) : (
        <div className={styles["btn-wrapper"]}>
          <small className={styles["login-btn"]}>Login</small>
          <small className={styles["signUp-btn"]}>Join</small>
        </div>
      )}
    </div>
  );
};

export default Header;
