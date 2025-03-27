import { useMutation } from "@tanstack/react-query";

import useModal from "../modal/useModal";
import { instance } from "@/axios";

interface RequestBodyType {
  nickname: string;
  profileImageUrl?: string | null;
  newPassword?: string;
};

const editUserFn = async (requestBody: RequestBodyType) => {
  const response = instance.patch("/user", requestBody);

  return response;
};

const useEditUser = () => {
  const { openModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (requestBody: RequestBodyType) => editUserFn(requestBody),
    onSuccess: () => {
      openModal("alert", "수정되었습니다.", () => {
        closeModal();
        window.location.reload()
      });
    },
    onError: (error: any) => {
      openModal("alert", error.response.data.message, closeModal);
    },
  });
};

export { useEditUser };
