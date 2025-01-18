import { useContext } from "react";

import { UserMeContext } from "@/contexts/userMe";

const useGetUserMe = () => {
  const userMeContext = useContext(UserMeContext);
  
  const userMe = userMeContext ? userMeContext : { userMe: null, setUserMe: null };

  return userMe
};

export { useGetUserMe };