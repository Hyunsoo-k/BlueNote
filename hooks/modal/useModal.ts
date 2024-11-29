import { useContext } from "react";
import { ModalSetterContext } from "@/contexts/modals";

function useModal() {
  const setModalState = useContext(ModalSetterContext);

  const openModal = (type: any, message: string, handleClick: any) => {
    if (setModalState) {
      setModalState({
        type: type,
        message: message,
        handleClick
      });
    }
  };

  const closeModal = () => {
    if (setModalState) {
      setModalState({
        type: null, 
        message: "",
        handleClick: () => {}
      });
    }
  };

  return { openModal, closeModal };
}

export default useModal;
