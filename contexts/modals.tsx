import React, { createContext, useState } from "react";

interface ModalState {
  type: string | null;
  message: string;
  handleClick: () => void;
  handleCancel?: () => void;
};

type ModalSetter = React.Dispatch<React.SetStateAction<ModalState>>;

const ModalStateContext = createContext<ModalState | null>(null);
const ModalSetterContext = createContext<ModalSetter | null>(null);

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    message: "",
    handleClick: () => {},
  });

  return (
    <ModalSetterContext.Provider value={setModalState}>
      <ModalStateContext.Provider value={modalState}>
        {children}
      </ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
}

export default ModalProvider;
export { ModalStateContext, ModalSetterContext };
