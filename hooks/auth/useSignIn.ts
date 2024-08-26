import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/axios";
import { setCookie } from "@/cookie";

const signInFn = async (data: any) => {
  const response = await instance.post("/auth/signIn", data);
  return response;
};

const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: any) => signInFn(data),
    onSuccess: (res) => {
      setCookie("accessToken", res.data.token, {
        path: "/",
        maxAge: 60 * 60 * 2
      });
      router.push("/");
    },
    onError: (err) => {
      console.log(err);
    }
  });
};

export { useSignIn };
