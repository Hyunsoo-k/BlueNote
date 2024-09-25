import React, { createContext, useState, Dispatch, SetStateAction } from "react";

interface UserMe {
  _id: string;
  email: string;
  nickname: string;
  profileImageUrl: null | string;
  createdAt: string;
  part: string;
  role: 0 | 1;
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