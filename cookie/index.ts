import { Cookies } from "react-cookie";

const cookies = new Cookies();

const setCookie = (key: string, value: string, options?: any) => {
  return cookies.set(key, value, { ...options });
};

const getCookie = (key: string) => {
  return cookies.get(key);
};

const removeCookie = (key: string) => {
  return cookies.remove(key, { path: "/" });
};

export { setCookie, getCookie,  removeCookie };