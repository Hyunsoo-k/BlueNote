import { useEffect } from "react";
import ReactDOM from "react-dom";
import { PiExclamationMarkBold } from "react-icons/pi";

import useModal from "@/hooks/modal/useModal";
import { useGetViewport } from "@/hooks/viewport";

import styles from "./index.module.scss";

interface Props {
  message: string;
  handleClick: () => void;
  handleCancel?: () => void;
};

const ConfirmModal = ({ message, handleClick }: Props) => {
  const { closeModal } = useModal();

  const viewport = useGetViewport();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModalWithStopPropagation = (e: any) => {
    e.stopPropagation();

    closeModal();
  };

  const handleClickWithStopPropagation = (e: any) => {
    e.stopPropagation();

    handleClick();
  };

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
          <button onClick={closeModalWithStopPropagation} className={styles["cancel-button"]}>
            취소
          </button>
          <button onClick={handleClickWithStopPropagation} className={styles["accept-button"]}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
