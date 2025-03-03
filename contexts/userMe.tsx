import React, { createContext } from "react";

import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";

interface UserMe {
  _id: string;
  email: string;
  nickname: string;
  profileImageUrl: null | string;
  createdAt: string;
  part: string;
  role: 0 | 1;
};

interface UserMeContextType {
  userMe: UserMe | null;
};

const UserMeContext = createContext<UserMeContextType | null>(null);

const UserMeProvider = ({ children }: any) => {
  const { data: userMe } = useGetUserQuery();

  return (
    <UserMeContext.Provider value={{ userMe }}>
      {children}
    </UserMeContext.Provider>
  )
}

export default UserMeProvider;
export { UserMeContext };