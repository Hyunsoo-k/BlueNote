import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserMe {
  email: string,
  nickname: string,
  role: number
}

interface UserMeContextType {
  userMe: UserMe | null;
  setUserMe: Dispatch<SetStateAction<UserMe | null>>;
}

const UserMeContext = createContext<UserMeContextType | null>(null);

const UserMeProvider = ({ children }: any) => {
  const [userMe, setUserMe] = useState<UserMe | null>(null);

  return (
    <UserMeContext.Provider value={{ userMe, setUserMe }}>
      {children}
    </UserMeContext.Provider>
  )
}

export default UserMeProvider;
export { UserMeContext };