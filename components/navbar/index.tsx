import React from "react";
import { useRouter } from "next/router";

import { mainCtg } from "@/variable";
import styles from "./index.module.scss";

const NavBar = ({ viewPort }: any) => {
  const router = useRouter();

  const handleClick = (key: string) => router.push(`/bbs/${key}`);

  return (
    <div className={styles["navbar"]}>
      {(viewPort === "tablet" || viewPort === "desktop") && (
        <div className={styles["navbar__menu"]}>
          {mainCtg.map(({ main, label }, index) => (
            <p
              key={index}
              onClick={() => handleClick(main)}
              className={styles["navbar__element"]}
            >
              {label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
