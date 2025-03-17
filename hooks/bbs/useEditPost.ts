import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { instance } from "@/axios";
import useModal from "../modal/useModal";

interface RequestBodyType {
  subCategory: SubCategoryKoreanType;
  title: string;
  content: string;
};

const editPostFn = async (
  mainCategory: MainCategoryType,
  post_id: string,
  requestBody: RequestBodyType
) => {
  const response = await instance.patch(`/bbs/${mainCategory}/post/${post_id}`, requestBody);

  return response;
};

const useEditPost = (mainCategory: MainCategoryType, post_id: string) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  return useMutation({
    mutationFn: (requestBody: RequestBodyType) => 
      editPostFn(mainCategory, post_id, requestBody),
    onSuccess: () => {
      router.push(`/bbs/${mainCategory}`);
    },
    onError: (error: any) => {
      openModal("alert", error.response.data.message, closeModal);
    },
  });
};

export { useEditPost };
