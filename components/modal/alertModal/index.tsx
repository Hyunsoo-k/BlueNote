import { useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";

interface Props {
  message: string;
  handleClick: any;
};

const AlertModal = ({ message, handleClick }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  return ReactDOM.createPortal(
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>
        <p className={styles["message"]}>{message}</p>
        <button onClick={handleClick} className={styles["button"]}>
          확인
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
