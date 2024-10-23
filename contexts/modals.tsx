import React, { createContext, useState } from "react";

export const ModalStateContext = createContext(null);
export const ModalSetterContext = createContext(null);

function ModalProvider({ children }: any) {
  const [modalState, setModalState] = useState({
    type: null,
    message: "",
    handleClick: () => {}
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
