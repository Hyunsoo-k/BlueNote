import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";

import { ViewportContext } from "@/contexts/viewport";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import HeaderNotification from "@/components/header/headerNotification";
import HeaderProfile from "@/components/header/headerProfile";
import NavBar from "@/components/header/navbar";

import styles from "./index.module.scss";

const Header = () => {
  const router = useRouter();

  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

  const paths = router.pathname.split('/').filter(Boolean);

  const isEditOrCreatePostPage = paths[3] === 'editPost' || paths[3] === 'createPost';

  const { data: userMe } = useGetUserQuery();

  if (viewport === "mobile" &&  isEditOrCreatePostPage) {
    return null;
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
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
