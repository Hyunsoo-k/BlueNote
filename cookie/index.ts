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

const useRemoveCookie = (key: string) => {
  const queryClient = useQueryClient();

  const remove = () => {
    queryClient.removeQueries({ queryKey: queryKey.userMe });

    cookies.remove(key, { path: "/" });

    queryClient.invalidateQueries({ queryKey: queryKey.userMe });
  };

  return remove;
};

export { setCookie, getCookie, useRemoveCookie };