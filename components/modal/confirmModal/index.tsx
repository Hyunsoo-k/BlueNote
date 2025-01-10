import { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { PiExclamationMarkBold } from "react-icons/pi";

import useModal from "@/hooks/modal/useModal";
import { ViewportContext } from "@/contexts/viewport";

import styles from "./index.module.scss";

interface Props {
  message: string;
  handleClick: () => void;
  handleCancel?: () => void;
};

const ConfirmModal = ({ message, handleClick }: Props) => {
  const { closeModal } = useModal();

  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>
        <PiExclamationMarkBold
          size={viewport === "mobile" ? 28 : 40}
          color="red"
          style={{margin: "20px auto 0"}}
        />
        <p className={styles["message"]}>{message}</p>
        <div className={styles["button-box"]}>
          <button onClick={closeModal} className={styles["cancel-button"]}>
            취소
          </button>
          <button onClick={handleClick} className={styles["accept-button"]}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
