import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { instance } from "@/axios";

const signUpFn = async (data: any) => {
  const response = await instance.post("/auth/signUp", data);
  return response;
};

const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: any) => signUpFn(data),
    onSuccess: () => {
      router.push("/auth/initial=sign_in");
    },
  });
};

export { useSignUp };
