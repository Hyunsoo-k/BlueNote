import { useContext } from "react";

import { UserMeContext } from "@/contexts/userMe";

const useGetUserMe = () => {
  const userMeContext = useContext(UserMeContext);
  
  return userMeContext ? userMeContext.userMe : null;
};

export { useGetUserMe };