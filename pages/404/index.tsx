import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { FaRegSadTear } from "react-icons/fa";

import styles from "./index.module.scss";

const Custom404 = () => {
  const router = useRouter();

  const handleClickNavigateButton = (
    e: MouseEvent<HTMLButtonElement>,
    destination: string
  ) => {
    e.stopPropagation();
    if (destination === "mainPage") return router.push("/");
    if (destination === "prevPage" && window.history.length > 1) return router.back();
  };

  return (
    <div className={styles["page-component"]}>
      <FaRegSadTear size={70} color="#2C2C2C" />
      <h1>404</h1>
      <p>
        찾을 수 없는 페이지 입니다.<br/>
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
      </p>
      <div className={styles["navigate-button-box"]}>
        <button onClick={(e) => {handleClickNavigateButton(e, "mainPage")} }>
          홈으로
        </button>
        <button onClick={(e) => {handleClickNavigateButton(e, "prevPage")} }>
          이전 페이지
        </button>
      </div>
    </div>
  );
};

export default Custom404;