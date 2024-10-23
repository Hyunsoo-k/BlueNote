import { useContext } from "react";
import { ModalSetterContext } from "@/contexts/modals";

function useModal() {
  const setModalState = useContext(ModalSetterContext);

  const openModal = (type: any, message: string, handleClick: any) => {
    setModalState({
      type: type,
      message: message,
      handleClick
    });
  };

  const closeModal = () => {
    setModalState({
      type: null, 
      message: null,
      handleClick: () => {}
    });
  };

  return { openModal, closeModal };
}

export default useModal;  