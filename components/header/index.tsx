import Link from "next/link";

import { useGetUser } from "@/hooks/auth/useGetUser";
import Notification from "@/components/notification";
import HeaderProfile from "@/components/header/headerProfile";
import NavBar from "@/components/navbar";

import styles from "./index.module.scss";

const Header = () => {
  const { data: userMe } = useGetUser();

  return (
    <div className={styles["header"]}>
      <div className={styles["header__top"]}>
        <Link href="/" className={styles["header__title"]}>
          BLUE NOTE
        </Link>
        {userMe ? (
          <div className={styles["header__userMe"]}>
            <Notification user_id={userMe.user_id} />
            <div className={styles["header__boundary-line"]}></div>
            <HeaderProfile userMe={userMe} />
          </div>
        ) : (
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
      <NavBar />
    </div>
  );
};

export default Header;
