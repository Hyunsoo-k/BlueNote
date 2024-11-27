import React, { createContext, useState } from "react";

const HeaderModalContext = createContext(null);

const HeaderModalProvider = ({ children }: any) => {
  const [showHeaderModal, setShowHeaderModal] = useState({
    profileModal: false,
    notificationModal: false
  });

  return (
    <HeaderModalContext.Provider value = { { showHeaderModal, setShowHeaderModal } }>
      {children}
    </HeaderModalContext.Provider>
  );
};

export { HeaderModalContext };

export default HeaderModalProvider;