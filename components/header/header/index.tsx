import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useGetViewport } from "@/hooks/viewport";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import HeaderUserPanel from "../headerUserPanel";
import NavBar from "@/components/header/navbar";

import styles from "./index.module.scss";

const Header = () => {
  const router = useRouter();
  const firstPath = router.asPath.split("/").filter(Boolean)[0];
  const isMyPage = firstPath === "myPage";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const viewport = useGetViewport();
  
  const { data: userMe, isLoading } = useGetUserQuery();

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <Link href="/" className={styles["header__title"]}>
          BLUE NOTE
        </Link>
        {isClient && !isLoading && userMe && (
          <HeaderUserPanel userMe={userMe} viewport={viewport} />
        )}
        {isClient && !isLoading && !userMe && (
          <div className={styles["header__isLoggedOut"]}>
            <Link href="/auth?initial=signIn" className={styles["header__signIn"]}>
              LOGIN
            </Link>
            <Link href="/auth?initial=signUp" className={styles["header__signUp"]}>
              JOIN
            </Link>
          </div>
        )}
      </div>
      {(!isMyPage || (isMyPage && viewport !== "mobile")) && <NavBar />}
    </div>
  );
};

export default Header;
