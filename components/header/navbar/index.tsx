import { useRouter } from "next/router";

import { mainCategory } from "@/variable";

import styles from "./index.module.scss";

const NavBar = () => {
  const router = useRouter();

  const handleClick = (key: string) => router.push(`/bbs/${key}`);

  const isMenuMatched = (category: string) => {
    return router.pathname.includes(`/bbs/${category}`);
  };

  return (
    <div className={styles["navbar"]}>
        <div className={styles["navbar__menu"]}>
          {mainCategory.map(({ main, label }, index) => (
            <p
              key={index}
              onClick={() => handleClick(main)}
              className={styles["navbar__element"]}
              style={isMenuMatched(main) ? { fontWeight: "800", color: "rgb(48, 140, 204)" } : {} }
            >
              {label}
            </p>
          ))}
        </div>
    </div>
  );
};

export default NavBar;
