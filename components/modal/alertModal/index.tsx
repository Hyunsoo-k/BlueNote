import ReactDOM from "react-dom";

import styles from "./index.module.scss";

interface Props {
  message: string;
  handleClick: any;
}

const AlertModal = ({ message, handleClick }: Props) => {
  
  return ReactDOM.createPortal(
    <div className={styles["overlay"]}>
      <div className={styles["alert-modal"]}>
        <p className={styles["alert-modal__message"]}>{message}</p>
        <button onClick={handleClick} className={styles["alert-modal__button"]}>
          확인
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
