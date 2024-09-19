import { useMutation } from "@tanstack/react-query";

import { instance } from "@/axios";

const signUpFn = async (request: any) => {
  const response = await instance.post("/auth/signUp", request);
  return response;
};

const useSignUp = (setAlertModal: any, currentFormHandler: any) => {

  return useMutation({
    mutationFn: (request: any) => signUpFn(request),
    onSuccess: () => {
      setAlertModal((prev: any) => ({
        ...prev,
        show: true,
        message: "회원가입이 완료되었습니다.",
        clickHandler: () => {
          setAlertModal((prev: any) => ({ ...prev, show: false }));
          currentFormHandler((prev: any) => ({ ...prev, initial: false, form: "signIn" }));
        },
      }));
    },
    onError: (error: any) => {
      setAlertModal((prev: any) => ({
        ...prev,
        show: true,
        message: error.response.data.message,
        clickHandler: () => { 
          setAlertModal((prev: any) => ({
            ...prev,
            show: false
          }));
        },
      }));
    },
  });
};

export { useSignUp };
