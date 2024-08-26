import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { ViewportContext } from "@/contexts/viewport";
import { UserMeContext } from "@/contexts/userMe";
import { useGetUser } from "@/hooks/auth/useGetUser";
import ProfileModal from "../modal/profile";
import NavBar from "../navbar";

import styles from "./index.module.scss";

const Header = () => {
  const { viewport, setViewport } = useContext(ViewportContext);
  const { userMe, setUserMe } = useContext(UserMeContext);
  const [profileModal, setProfileModal] = useState<boolean>(false);

  setUserMe(useGetUser().data);

  return (
    <div className={styles["header"]}>
      <div className={styles["header__header"]}>
        <Link href="/" className={styles["header__title"]}>
          BLUE NOTE
        </Link>
        {userMe && (
          <div onClick={() => setProfileModal((prev: boolean) => !prev)} className={styles["header__profile"]}>
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
            {profileModal && <ProfileModal userMe={userMe} />}
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
        <NavBar viewPort={viewport} />
      </div>
    </div>
  );
};

export default Header;
