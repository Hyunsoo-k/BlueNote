import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { MainCategoryType } from "@/types/categorys";
import { instance } from "@/axios";

const createPost = async (mainCategory: MainCategoryType, requestBody: any) => {
  const response = await instance.post(`/bbs/${mainCategory}/post`, requestBody);
  
  return response;
};

const useCreatePost = (mainCategory: MainCategoryType) => {
  const router = useRouter();

  return (
    useMutation({
      mutationFn: (requestBody: any) => createPost(mainCategory, requestBody),
      onSuccess: () => { router.push(`/bbs/${mainCategory}`); }
    })
  );
};

export { useCreatePost };
