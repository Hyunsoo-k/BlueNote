import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { MainCategoryType, SubCategoryKoreanType } from "@/types/category/categorys";
import { instance } from "@/axios";

interface requestBodyType {
  subCategory: SubCategoryKoreanType;
  title: string;
  content: string;
};

const createPost = async (
  mainCategory: MainCategoryType,
  requestBody: requestBodyType
) => {
  const response = await instance.post(`/bbs/${mainCategory}/post`, requestBody);

  return response;
};

const useCreatePost = (mainCategory: MainCategoryType) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (requestBody: requestBodyType) => createPost(mainCategory, requestBody),
    onSuccess: () => {
      router.push(`/bbs/${mainCategory}`);
    },
    onError: (error) => {
      console.log(error);
    }
  });
};

export { useCreatePost };
