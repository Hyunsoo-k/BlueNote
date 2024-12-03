import Link from "next/link";
import { useContext } from "react";

import { ViewportContext } from "@/contexts/viewport";
import { useGetUser } from "@/hooks/user/useGetUser";
import HeaderNotification from "@/components/header/headerNotification";
import HeaderProfile from "@/components/header/headerProfile";
import NavBar from "@/components/navbar";

import styles from "./index.module.scss";

const Header = () => {
  const viewportContext = useContext(ViewportContext);
  
  const viewport = viewportContext?.viewport || "mobile";

  const { data: userMe } = useGetUser();

  return (
    <div className={styles["header"]}>
      <div className={styles["header__top"]}>
        <Link href="/" className={styles["header__title"]}>
          BLUE NOTE
        </Link>
        {userMe && (
          <div className={styles["header__isLoggedIn"]}>
            <HeaderNotification userMe_id={userMe._id} viewport={viewport} />
            <div className={styles["header__boundary-line"]}></div>
            <HeaderProfile userMe={userMe} viewport={viewport} />
          </div>
        )} 
        {!userMe && (
          <div className={styles["header__isLoggedOut"]}>
            <Link href="/auth?initial=signIn" className={styles["header__signIn"]}>
              Login
            </Link>
            <Link href="/auth?initial=signUp" className={styles["header__signUp"]}>
              Join
            </Link>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
