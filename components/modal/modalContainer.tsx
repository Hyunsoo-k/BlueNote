import { useContext } from "react";
import ReactDOM from "react-dom";

import { ModalStateContext } from "@/contexts/modals";
import ConfirmModal from "./confirmModal";
import AlertModal from "./alertModal";

const ModalComponents = {
  confirm: ConfirmModal,
  alert: AlertModal,
};

const ModalContainer = () => {
  const { type, message, handleClick } = useContext(ModalStateContext);

  if (!type) {
    return null;
  }

  const Modal = ModalComponents[type];

  return ReactDOM.createPortal(
    <>
      <Modal message={message} handleClick={handleClick} />
    </>,
    document.body
  );
};

export default ModalContainer;