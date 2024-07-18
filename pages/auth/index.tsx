import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { PiVinylRecordFill } from "react-icons/pi";

import { CurrentSection } from "@/types/auth-page";
import styles from "./index.module.scss";

const AuthPage = () => {
  const router: any = useRouter();
  const [currentSection, setCurrentSection] = useState<CurrentSection>({
    initial: true,
    currentSection: null,
  });
  const [viewPort, setViewPort] = useState<string>("");

  const handleCurrentSection = () => {
    setCurrentSection((prev: CurrentSection) =>
      prev.currentSection === "signIn"
        ? { ...prev, initial: false, currentSection: "signUp" }
        : { ...prev, initial: false, currentSection: "signIn" }
    );
  };

  useEffect(() => {
    router.query.initial
      ? setCurrentSection((prev: CurrentSection) => ({ ...prev, currentSection: router.query.initial }))
      : setCurrentSection((prev: CurrentSection) => ({ ...prev, currentSection: "signIn" }));

    const handleResizing = () => {
      if (window.innerWidth < 768) {
        setViewPort("mobile");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1025) {
        setViewPort("tablet");
      } else if (window.innerWidth >= 1025) {
        setViewPort("desktop");
      }
    };

    handleResizing();
    window.addEventListener("resize", handleResizing);

    return () => {
      window.removeEventListener("resize", handleResizing);
    };
  }, []);

  const getClassName = (currentSection: any) => {
    if (currentSection.initial) {
      if (currentSection.currentSection === "signIn") {
        return "auth-wrapper-signIn__initial"
      } else if (currentSection.currentSection === "signUp") {
        return "auth-wrapper-signUp__initial";
      }
    } else {
      if (currentSection.currentSection === "signIn") {
        return "auth-wrapper-signIn";
      } else if (currentSection.currentSection === "signUp") {
        return "auth-wrapper-signUp";
      }
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["auth-wrapper"]}>
        <div className={styles["card"]}>
          <div className={styles["card__page"]}>
            <p className={styles["card__page__title"]}>
              Blue Note
              <span>
                <PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} />
              </span>
            </p>
            <p className={styles["card__page__sub-title"]}>community for jazz musicians</p>
            {(viewPort === "tablet" || viewPort === "desktop") && (
              <div className={styles["img"]}>
                <Image src="/images/carousel/playing-trumpet.png" fill alt="" style={{ borderRadius: "50%" }} />
              </div>
            )}
            <p className={styles["card__page__ask"]}>have an account?</p>
            <p onClick={handleCurrentSection} className={styles["change-button"]}>
              Login
            </p>
          </div>
          <div className={styles["card__page"]}>
            <p className={styles["card__page__title"]}>
              Blue Note
              <span>
                <PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} />
              </span>
            </p>
            <p className={styles["card__page__sub-title"]}>community for jazz musicians</p>
            {(viewPort === "tablet" || viewPort === "desktop") && (
              <div className={styles["img"]}>
                <Image src="/images/auth/saxophone.png" fill alt="" style={{ borderRadius: "50%" }} />
              </div>
            )}
            <p className={styles["card__page__ask"]}>don't have an account?</p>
            <p onClick={handleCurrentSection} className={styles["change-button"]}>
              Sign Up
            </p>
          </div>
        </div>
        <div className={styles[getClassName(currentSection)]}>
          <p className={styles["auth-title"]}>{currentSection.currentSection === "signIn" ? "Login" : "Sign Up"}</p>
          <form className={styles["form"]}>
            <div className={styles["input-wrapper"]}>
              <input placeholder="Email" className={styles["input"]}></input>
              {currentSection.currentSection === "signUp" && (
                <input placeholder="Nickname" className={styles["input"]}></input>
              )}
              <input placeholder="Password" className={styles["input"]}></input>
              {currentSection.currentSection === "signUp" && (
                <input placeholder="Check Password" className={styles["input"]}></input>
              )}
              <button className={styles["btn"]}>
                {currentSection.currentSection === "signIn" ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
