import ReactDOM from "react-dom";
import { PiExclamationMarkBold } from "react-icons/pi";
import useModal from "@/hooks/modal/useModal";

import styles from "./index.module.scss";

interface Props {
  message: string;
  handleClick: () => void;
  handleCancel?: () => void;
};

const ConfirmModal = ({ message, handleClick }: Props) => {
  const { closeModal } = useModal();

  return ReactDOM.createPortal(
    <div className={styles["overlay"]}>
      <div className={styles["confirm-modal"]}>
        <PiExclamationMarkBold size={40} color="red" style={{margin: "20px auto 0"}} />
        <p className={styles["confirm-modal__message"]}>{message}</p>
        <div className={styles["confirm-modal__button"]}>
          <button onClick={closeModal} className={styles["confirm-modal__cancel-button"]}>
            취소
          </button>
          <button onClick={handleClick} className={styles["confirm-modal__accept-button"]}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
