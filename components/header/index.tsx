import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useGetUser } from "@/hooks/auth/useGetUser";
import ProfileModal from "@/components/modal/profile";
import NavBar from "@/components/navbar";

import styles from "./index.module.scss";

const Header = () => {
  const router = useRouter();
  const [profileModal, setProfileModal] = useState({
    show: false,
    ref: useRef<HTMLDivElement>(null),
  });

  const { data: userMe } = useGetUser();

  useEffect(() => {
    const handleRouteChange = () => {
      setProfileModal((prev) => ({ ...prev, show: false }));
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileModal.show &&
        profileModal.ref.current !== e.target as Node &&
        !profileModal.ref.current?.contains(e.target as Node)
      ) {
        setProfileModal((prev) => ({ ...prev, show: false }));
        console.log("done")
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileModal.show]);

  return (
    <div className={styles["header"]}>
      <div className={styles["header__header"]}>
        <Link href="/" className={styles["header__title"]}>BLUE NOTE</Link>
        {!userMe && (
          <div className={styles["header__btn"]}>
            <Link href="/auth?initial=signIn" className={styles["header__signIn"]}>Login</Link>
            <Link href="/auth?initial=signUp" className={styles["header__signUp"]}>Join</Link>
          </div>
        )}
        {userMe && (
          <div
            onMouseDown={(e: any) => {
              e.stopPropagation();
              setProfileModal((prev) => ({ ...prev, show: !profileModal.show }));
            }}
            className={styles["header__profile"]}
          >
            <Image
              src={userMe.profileImage.url || "/images/user/default-profile.png"}
              width={55}
              height={55}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <div className={styles["header__user"]}>
              <p className={styles["header__nickname"]}>
                {userMe.nickname}
                <span>님</span>
              </p>
              <p className={styles["header__email"]}>{userMe.email}</p>
            </div>
          </div>
        )}
        {profileModal.show && <ProfileModal userMe={userMe} ref={profileModal.ref} />}
      </div>
      <div className={styles["header__navbar"]}>
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
