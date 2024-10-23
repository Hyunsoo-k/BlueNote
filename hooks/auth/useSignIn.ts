import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/axios";
import { setCookie } from "@/cookie";

const signInFn = async (requestBody: any) => {
  const response = await instance.post("/auth/signIn", requestBody);

  return response;
};

const useSignIn = (setAlertModal: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (requestBody: any) => signInFn(requestBody),
    onSuccess: (response: any) => {
      setCookie("accessToken", response.data.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 12,
      });
      router.push("/");
    },
    onError: (error: any) => {
      setAlertModal((prev: any) => ({
        ...prev,
        show: true,
        message: error.response.data.message,
        handleClick: () => {
          setAlertModal((prev: any) => ({ ...prev, show: false }));
        },
      }));
    },
  });
};

export { useSignIn };
