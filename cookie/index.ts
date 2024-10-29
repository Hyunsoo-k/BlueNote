import { Cookies } from "react-cookie";
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from "@/queryKey";

const cookies = new Cookies();

const setCookie = (key: string, value: string, options?: any) => {
  return cookies.set(key, value, { ...options });
};

const getCookie = (key: string) => {
  return cookies.get(key);
};

const removeCookie = (key: string) => {
  const queryClient = useQueryClient();

  queryClient.removeQueries({ queryKey: queryKey.userMe });
  
  return cookies.remove(key, { path: "/" });
};

export { setCookie, getCookie,  removeCookie };