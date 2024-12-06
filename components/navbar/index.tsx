import { useRouter } from "next/router";

import { mainCategory } from "@/variable";

import styles from "./index.module.scss";

const NavBar = () => {
  const router = useRouter();

  const handleClick = (key: string) => router.push(`/bbs/${key}`);

  return (
    <div className={styles["navbar"]}>
        <div className={styles["navbar__menu"]}>
          {mainCategory.map(({ main, label }, index) => (
            <p
              key={index}
              onClick={() => handleClick(main)}
              className={styles["navbar__element"]}
            >
              {label}
            </p>
          ))}
        </div>
    </div>
  );
};

export default NavBar;
