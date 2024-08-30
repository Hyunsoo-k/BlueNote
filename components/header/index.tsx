import React, { useState, useEffect, useContext, useRef} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { ViewportContext } from "@/contexts/viewport";
import { UserMeContext } from "@/contexts/userMe";
import { useGetUser } from "@/hooks/auth/useGetUser";
import ProfileModal from "../modal/profile";
import NavBar from "../navbar";

import styles from "./index.module.scss";

const Header = () => {
  const router = useRouter();

  const { userMe, setUserMe } = useContext(UserMeContext);
  const [profileModal, setProfileModal] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  setUserMe(useGetUser().data);

  useEffect(() => {
    const clickOustSideHandler = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setProfileModal(false);
      }
    };

    document.addEventListener("mousedown", clickOustSideHandler);

    const handleRouteChange = () => {
      setProfileModal(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    
    return () => {
      document.removeEventListener("mousedown", clickOustSideHandler);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [modalRef, router.events]);

  return (
    <div className={styles["header"]}>
      <div className={styles["header__header"]}>
        <Link href="/" className={styles["header__title"]}>
          BLUE NOTE
        </Link>
        {userMe && (
          <div 
            onClick={() => setProfileModal((prev: boolean) => !prev)} 
            className={styles["header__profile"]}
          >
            <Image
              src="/images/carousel/playing-trumpet.png"
              width={55}
              height={55}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <div className={styles["header__user"]}>
              <p className={styles["header__nickname"]}>{userMe.nickname}<span>님</span></p>
              <p className={styles["header__email"]}>{userMe.email}</p>
            </div>
          </div>
        )}
        {profileModal && (
          <div className={styles["header__profile-modal"]} ref={modalRef}>
            <ProfileModal userMe={userMe} setUserMe={setUserMe} />
          </div>
        )}
        {!userMe && (
          <div className={styles["header__btn"]}>
            <Link href="/auth?initial=signIn" className={styles["header__signIn"]}>
              Login
            </Link>
            <Link href="/auth?initial=signUp" className={styles["header__signUp"]}>
              Join
            </Link>
          </div>
        )}
      </div>
      <div className={styles["header__navbar"]}>
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
